"""
Build 3D geometries for every molecule drawn on the site.

Run:  python3 scripts/geometries.py
Out:  scripts/out/geometries.json

Shared molecules and single-fragment systems are embedded with RDKit (ETKDG)
and relaxed with MMFF. Multi-fragment scenes (a pollutant meeting a surface, a
radical approaching a ring) are assembled from relaxed fragments placed by hand
at chemically sensible distances, because a force field is not meant to model
radicals or weak complexes. These are illustrations of the systems each project
studied, not reproductions of any figure from the source papers.
"""

import json
import os

import numpy as np
from rdkit import Chem
from rdkit.Chem import AllChem

OUT = os.path.join(os.path.dirname(__file__), "out")
os.makedirs(OUT, exist_ok=True)


def embed(smiles, seed=7):
    mol = Chem.AddHs(Chem.MolFromSmiles(smiles))
    AllChem.EmbedMolecule(mol, randomSeed=seed)
    AllChem.MMFFOptimizeMolecule(mol, maxIters=2000)
    return mol


def best_of(smiles, n=30, seed=11):
    """Embed several conformers and keep the lowest MMFF energy one."""
    mol = Chem.AddHs(Chem.MolFromSmiles(smiles))
    ids = AllChem.EmbedMultipleConfs(mol, numConfs=n, randomSeed=seed)
    res = AllChem.MMFFOptimizeMoleculeConfs(mol, maxIters=4000)
    energies = [e for (_, e) in res]
    best = int(np.argmin(energies))
    conf = mol.GetConformer(ids[best])
    keep = Chem.Mol(mol)
    keep.RemoveAllConformers()
    keep.AddConformer(Chem.Conformer(conf), assignId=True)
    return keep


def to_record(mol, extra_atoms=None, extra_bonds=None):
    Chem.Kekulize(mol, clearAromaticFlags=True)
    conf = mol.GetConformer()
    atoms = [
        {"el": a.GetSymbol(), "xyz": list(conf.GetAtomPosition(a.GetIdx()))}
        for a in mol.GetAtoms()
    ]
    bonds = [
        {
            "a": b.GetBeginAtomIdx(),
            "b": b.GetEndAtomIdx(),
            "order": int(round(b.GetBondTypeAsDouble())),
        }
        for b in mol.GetBonds()
    ]
    return {"atoms": atoms, "bonds": bonds}


def merge(*records):
    atoms, bonds = [], []
    for r in records:
        off = len(atoms)
        atoms += r["atoms"]
        bonds += [
            {"a": b["a"] + off, "b": b["b"] + off, "order": b["order"], **({"weak": True} if b.get("weak") else {})}
            for b in r["bonds"]
        ]
    return {"atoms": atoms, "bonds": bonds}


def shift(record, vec):
    v = np.asarray(vec, dtype=float)
    return {
        "atoms": [{"el": a["el"], "xyz": list(np.asarray(a["xyz"]) + v)} for a in record["atoms"]],
        "bonds": record["bonds"],
    }


def rotate_to(record, src_dir, dst_dir):
    """Rotate a fragment so that src_dir aligns with dst_dir (Rodrigues)."""
    a = np.asarray(src_dir, float); a /= np.linalg.norm(a)
    b = np.asarray(dst_dir, float); b /= np.linalg.norm(b)
    v = np.cross(a, b); c = float(np.dot(a, b))
    if np.linalg.norm(v) < 1e-8:
        R = np.eye(3) if c > 0 else -np.eye(3)
    else:
        vx = np.array([[0, -v[2], v[1]], [v[2], 0, -v[0]], [-v[1], v[0], 0]])
        R = np.eye(3) + vx + vx @ vx * (1 / (1 + c))
    return {
        "atoms": [{"el": x["el"], "xyz": list(R @ np.asarray(x["xyz"]))} for x in record["atoms"]],
        "bonds": record["bonds"],
    }


def xyz(record, i):
    return np.asarray(record["atoms"][i]["xyz"], float)


def centre(record):
    return np.mean([a["xyz"] for a in record["atoms"]], axis=0)


geoms = {}

# ---------------------------------------------------------------- shared set
SHARED = {
    "water": "O",
    "ethanol": "CCO",
    "acetone": "CC(=O)C",
    "benzene": "c1ccccc1",
    "trifluoroethanol": "OCC(F)(F)F",
}
for name, smi in SHARED.items():
    geoms[name] = {"smiles": smi, **to_record(best_of(smi))}

# ---------------------------------------------------------------- PFAS: PFOA
pfoa = "OC(=O)C(F)(F)C(F)(F)C(F)(F)C(F)(F)C(F)(F)C(F)(F)C(F)(F)F"
geoms["pfas"] = {"smiles": pfoa, **to_record(best_of(pfoa, n=20))}

# ---------------------------------------------------------------- CO2 capture
# Melamine with a CO2 molecule sitting over one amino nitrogen, C...N ~2.9 A,
# the Lewis acid-base contact the study describes.
mel = to_record(best_of("Nc1nc(N)nc(N)n1"))
co2 = to_record(embed("O=C=O"))
# find an exocyclic amino N (bonded to 2 H)
amino = next(
    i for i, a in enumerate(mel["atoms"])
    if a["el"] == "N" and sum(
        1 for b in mel["bonds"]
        if i in (b["a"], b["b"]) and mel["atoms"][b["b"] if b["a"] == i else b["a"]]["el"] == "H"
    ) == 2
)
ring_c = np.mean([a["xyz"] for a in mel["atoms"] if a["el"] != "H"], axis=0)
out_dir = xyz(mel, amino) - ring_c
out_dir /= np.linalg.norm(out_dir)
normal = np.cross(out_dir, [0, 0, 1.0]); normal /= np.linalg.norm(normal)
c_idx = next(i for i, a in enumerate(co2["atoms"]) if a["el"] == "C")
co2 = shift(co2, -xyz(co2, c_idx))
# lay CO2 perpendicular to the N...C contact
o_idx = next(i for i, a in enumerate(co2["atoms"]) if a["el"] == "O")
co2 = rotate_to(co2, xyz(co2, o_idx), np.cross(out_dir, [0, 0, 1.0]))
target = xyz(mel, amino) + out_dir * 1.6 + np.array([0, 0, 2.4])
co2 = shift(co2, target)
scene = merge(mel, co2)
scene["bonds"].append({"a": amino, "b": len(mel["atoms"]) + c_idx, "order": 1, "weak": True})
geoms["co2_capture"] = scene

# ---------------------------------------------------------------- CH2F + NO2
# Built from the H2FC-NO2 adduct, with the fragments pulled apart along the C-N
# axis to show the radical approaching NO2 before the barrierless first step.
adduct = embed("FC[N+](=O)[O-]")
rec = to_record(adduct)
c = next(i for i, a in enumerate(rec["atoms"]) if a["el"] == "C")
n = next(i for i, a in enumerate(rec["atoms"]) if a["el"] == "N")
axis = xyz(rec, c) - xyz(rec, n)
axis /= np.linalg.norm(axis)
# split: atoms on the C side move away by 1.3 A
c_side = {c}
for b in rec["bonds"]:
    if c in (b["a"], b["b"]):
        other = b["b"] if b["a"] == c else b["a"]
        if other != n:
            c_side.add(other)
atoms = []
for i, a in enumerate(rec["atoms"]):
    p = np.asarray(a["xyz"])
    if i in c_side:
        p = p + axis * 1.3
    atoms.append({"el": a["el"], "xyz": list(p)})
bonds = []
for b in rec["bonds"]:
    if {b["a"], b["b"]} == {c, n}:
        bonds.append({"a": b["a"], "b": b["b"], "order": 1, "weak": True})
    else:
        # NO2: draw as one double + one single-ish; keep orders from nitro
        bonds.append({"a": b["a"], "b": b["b"], "order": max(1, b["order"])})
geoms["radical"] = {"atoms": atoms, "bonds": bonds}

# ---------------------------------------------------------------- OH + aromatic
# Phenol with an OH radical approaching a ring carbon from above (~2.0 A),
# the addition step whose barriers the benchmark study compares.
ph = to_record(best_of("Oc1ccccc1"))
ring = [i for i, a in enumerate(ph["atoms"]) if a["el"] == "C"]
ring_xyz = np.array([xyz(ph, i) for i in ring])
cen = ring_xyz.mean(axis=0)
u, s, vt = np.linalg.svd(ring_xyz - cen)
nrm = vt[2]
# the ortho carbon: bonded to the ipso carbon that carries O
o_ph = next(i for i, a in enumerate(ph["atoms"]) if a["el"] == "O")
ipso = next(b["b"] if b["a"] == o_ph else b["a"] for b in ph["bonds"] if o_ph in (b["a"], b["b"]) and ph["atoms"][b["b"] if b["a"] == o_ph else b["a"]]["el"] == "C")
ortho = next(
    (b["b"] if b["a"] == ipso else b["a"])
    for b in ph["bonds"]
    if ipso in (b["a"], b["b"]) and (b["b"] if b["a"] == ipso else b["a"]) in ring
)
o_pos = xyz(ph, ortho) + nrm * 2.0
h_pos = o_pos + nrm * 0.62 + (xyz(ph, ortho) - cen) / np.linalg.norm(xyz(ph, ortho) - cen) * 0.72
oh = {"atoms": [{"el": "O", "xyz": list(o_pos)}, {"el": "H", "xyz": list(h_pos)}],
      "bonds": [{"a": 0, "b": 1, "order": 1}]}
scene = merge(ph, oh)
scene["bonds"].append({"a": ortho, "b": len(ph["atoms"]), "order": 1, "weak": True})
geoms["oh_addition"] = scene

# ---------------------------------------------------------------- pKa + 3 waters
# Phenol with three explicit water molecules hydrogen-bonded around the OH
# group, the solvation model that brought predictions within ~0.5 pKa units.
ph = to_record(best_of("Oc1ccccc1"))
o_ph = next(i for i, a in enumerate(ph["atoms"]) if a["el"] == "O")
h_ph = next((b["b"] if b["a"] == o_ph else b["a"]) for b in ph["bonds"]
            if o_ph in (b["a"], b["b"]) and ph["atoms"][b["b"] if b["a"] == o_ph else b["a"]]["el"] == "H")
ipso = next((b["b"] if b["a"] == o_ph else b["a"]) for b in ph["bonds"]
            if o_ph in (b["a"], b["b"]) and ph["atoms"][b["b"] if b["a"] == o_ph else b["a"]]["el"] == "C")
O = xyz(ph, o_ph); H = xyz(ph, h_ph); C = xyz(ph, ipso)
oh_dir = (H - O) / np.linalg.norm(H - O)
co_dir = (O - C) / np.linalg.norm(O - C)
ring_c = [i for i, a in enumerate(ph["atoms"]) if a["el"] == "C"]
rxyz = np.array([xyz(ph, i) for i in ring_c]); rc = rxyz.mean(axis=0)
_, _, vt = np.linalg.svd(rxyz - rc); up = vt[2]

water = to_record(embed("O"))
wo = next(i for i, a in enumerate(water["atoms"]) if a["el"] == "O")
water = shift(water, -xyz(water, wo))
wh = [i for i, a in enumerate(water["atoms"]) if a["el"] == "H"]

def place_water(pos, point_h_toward=None):
    w = water
    if point_h_toward is not None:
        w = rotate_to(w, xyz(w, wh[0]), point_h_toward - pos)
    else:
        bis = (xyz(w, wh[0]) + xyz(w, wh[1])) / 2
        w = rotate_to(w, bis, -oh_dir)
    return shift(w, pos)

# water 1 accepts the phenol O-H hydrogen bond
w1_pos = H + oh_dir * 1.85
w1 = place_water(w1_pos)
w1 = rotate_to(shift(w1, -w1_pos), np.array([0, 0, 1.0]), np.array([0, 0, 1.0]))
w1 = shift(w1, w1_pos)
# water 2 donates to the phenol oxygen lone pair (above the ring plane)
lp1 = O + (co_dir * 0.35 + up * 0.94) * 2.85
w2 = place_water(lp1, point_h_toward=O)
# water 3 bridges between water 1 and water 2
w3_pos = (w1_pos + lp1) / 2 + co_dir * 1.9
w3 = place_water(w3_pos, point_h_toward=w1_pos)
scene = merge(ph, w1, w2, w3)
na = len(ph["atoms"])
nw = len(water["atoms"])
scene["bonds"] += [
    {"a": h_ph, "b": na + wo, "order": 1, "weak": True},
    {"a": na + nw + wh[0], "b": o_ph, "order": 1, "weak": True},
    {"a": na + 2 * nw + wh[0], "b": na + wo, "order": 1, "weak": True},
]
geoms["pka"] = scene

# ---------------------------------------------------------------- PET + pollutant
# A PET repeat unit (as mono(2-hydroxyethyl) terephthalate) ending in a carboxylic acid group, with a small pollutant
# (phenol) hydrogen-bonded to that carboxylic site — the strongest binding site
# the microplastics study identified.
pet = to_record(best_of("OC(=O)c1ccc(cc1)C(=O)OCCO", n=30))
cooh_o = None
for i, a in enumerate(pet["atoms"]):
    if a["el"] != "O":
        continue
    nbrs = [(b["b"] if b["a"] == i else b["a"]) for b in pet["bonds"] if i in (b["a"], b["b"])]
    if any(pet["atoms"][j]["el"] == "H" for j in nbrs):
        cooh_o = i
        cooh_h = next(j for j in nbrs if pet["atoms"][j]["el"] == "H")
        break
pol = to_record(best_of("Oc1ccccc1"))
p_o = next(i for i, a in enumerate(pol["atoms"]) if a["el"] == "O")
p_c = next((b["b"] if b["a"] == p_o else b["a"]) for b in pol["bonds"]
           if p_o in (b["a"], b["b"]) and pol["atoms"][b["b"] if b["a"] == p_o else b["a"]]["el"] == "C")
d = xyz(pet, cooh_h) - xyz(pet, cooh_o); d /= np.linalg.norm(d)
pol = shift(pol, -xyz(pol, p_o))
pol = rotate_to(pol, xyz(pol, p_c), d)
pol = shift(pol, xyz(pet, cooh_h) + d * 1.8)
scene = merge(pet, pol)
scene["bonds"].append({"a": cooh_h, "b": len(pet["atoms"]) + p_o, "order": 1, "weak": True})
geoms["microplastics"] = scene

with open(os.path.join(OUT, "geometries.json"), "w") as f:
    json.dump(geoms, f)
print("wrote", len(geoms), "systems:", ", ".join(geoms))
