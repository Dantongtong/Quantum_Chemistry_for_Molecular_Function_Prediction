"""
Real quantum chemistry for the five Stage 1 shared molecules.

Run:  python3 scripts/qm.py water ethanol ...   (default: all five)
Out:  scripts/out/qm_<name>.json

Level of theory: B3LYP/6-31G*, charge 0, singlet — the fixed setup students use
in the Week 3 notebook. Geometries are optimized from the MMFF structures made
by geometries.py. Computed with PySCF; students use Psi4, which gives the same
numbers to within rounding at the same level of theory.

For each molecule we record the optimized geometry, HOMO and LUMO energies,
Mulliken charges, the dipole moment, and the electrostatic potential sampled on
the van der Waals surface (for the ESP pictures).
"""

import json
import os
import sys

import numpy as np
from pyscf import dft, gto
from pyscf.df import incore
from pyscf.geomopt.berny_solver import optimize

HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, "out")
HARTREE_EV = 27.211386
BOHR = 0.52917721

VDW = {"H": 1.20, "C": 1.70, "N": 1.55, "O": 1.52, "F": 1.47}

geoms = json.load(open(os.path.join(OUT, "geometries.json")))


def build(rec):
    atom = [[a["el"], a["xyz"]] for a in rec["atoms"]]
    mol = gto.M(atom=atom, basis="6-31g*", charge=0, spin=0, verbose=0)
    return mol


def fib_sphere(n):
    i = np.arange(n) + 0.5
    phi = np.arccos(1 - 2 * i / n)
    theta = np.pi * (1 + 5 ** 0.5) * i
    return np.stack([np.cos(theta) * np.sin(phi), np.sin(theta) * np.sin(phi), np.cos(phi)], 1)


def vdw_surface(els, xyz_ang, density=14.0):
    pts, owner = [], []
    for i, (el, c) in enumerate(zip(els, xyz_ang)):
        r = VDW[el]
        n = max(60, int(4 * np.pi * r * r * density))
        p = c + r * fib_sphere(n)
        keep = np.ones(len(p), bool)
        for j, (el2, c2) in enumerate(zip(els, xyz_ang)):
            if j == i:
                continue
            keep &= np.linalg.norm(p - c2, axis=1) > VDW[el2] - 1e-6
        pts.append(p[keep])
        owner += [i] * int(keep.sum())
    return np.vstack(pts), np.array(owner)


def esp_at(mol, dm, pts_ang):
    pts = pts_ang / BOHR
    # nuclear contribution
    coords = mol.atom_coords()
    charges = mol.atom_charges()
    d = np.linalg.norm(pts[:, None, :] - coords[None, :, :], axis=2)
    v_nuc = (charges[None, :] / d).sum(1)
    # electronic contribution, in chunks
    v_el = np.empty(len(pts))
    for s in range(0, len(pts), 600):
        fake = gto.fakemol_for_charges(pts[s:s + 600])
        ints = incore.aux_e2(mol, fake)  # (nao, nao, npts)
        v_el[s:s + 600] = np.einsum("ijp,ij->p", ints, dm)
    return v_nuc - v_el  # atomic units


def run(name):
    rec = geoms[name]
    mol = build(rec)
    mf = dft.RKS(mol)
    mf.xc = "b3lyp"
    mol_opt = optimize(mf, maxsteps=60)
    mf = dft.RKS(mol_opt); mf.xc = "b3lyp"
    mf.kernel()
    assert mf.converged, name

    mo_e = mf.mo_energy
    nocc = int((mf.mo_occ > 0).sum())
    homo = mo_e[nocc - 1] * HARTREE_EV
    lumo = mo_e[nocc] * HARTREE_EV
    # a few levels either side for the level diagram
    occ_levels = (mo_e[max(0, nocc - 4):nocc] * HARTREE_EV).tolist()
    virt_levels = (mo_e[nocc:nocc + 3] * HARTREE_EV).tolist()

    pop, chg = mf.mulliken_pop(verbose=0)
    dip = mf.dip_moment(verbose=0)  # Debye

    els = [a["el"] for a in rec["atoms"]]
    xyz_ang = mol_opt.atom_coords() * BOHR
    pts, owner = vdw_surface(els, xyz_ang)
    esp = esp_at(mol_opt, mf.make_rdm1(), pts)

    out = {
        "name": name,
        "method": "B3LYP/6-31G*",
        "energy_hartree": float(mf.e_tot),
        "homo_ev": float(homo),
        "lumo_ev": float(lumo),
        "gap_ev": float(lumo - homo),
        "occ_levels_ev": occ_levels,
        "virt_levels_ev": virt_levels,
        "mulliken": [float(x) for x in chg],
        "dipole_debye": float(np.linalg.norm(dip)),
        "atoms": [{"el": e, "xyz": list(map(float, p))} for e, p in zip(els, xyz_ang)],
        "bonds": rec["bonds"],
        "surface": {
            "points": np.round(pts, 3).tolist(),
            "esp_au": np.round(esp, 5).tolist(),
            "owner": owner.tolist(),
        },
    }
    with open(os.path.join(OUT, f"qm_{name}.json"), "w") as f:
        json.dump(out, f)
    print(f"{name:18s} HOMO {homo:7.2f}  LUMO {lumo:6.2f}  gap {lumo-homo:5.2f} eV  "
          f"dipole {np.linalg.norm(dip):.2f} D  ESP pts {len(pts)}")


if __name__ == "__main__":
    names = sys.argv[1:] or ["water", "ethanol", "acetone", "benzene", "trifluoroethanol"]
    for n in names:
        run(n)
