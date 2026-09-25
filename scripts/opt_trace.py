"""
Record a real geometry optimization, step by step, for the Week 2 figure.

Run:  python3 scripts/opt_trace.py
Out:  scripts/out/opt_trace.json

Starts acetone from its force-field (MMFF) structure — the same kind of cleaned-
up starting point students export from WebMO in Week 1 — and optimizes it at
HF/6-31G* and B3LYP/6-31G*, the two methods students compare in Week 2. The
energy at every optimizer step is recorded relative to the starting energy.
"""

import json
import os

from pyscf import dft, gto, scf
from pyscf.geomopt.berny_solver import optimize

HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, "out")
HARTREE_KCAL = 627.5095

rec = json.load(open(os.path.join(OUT, "geometries.json")))["acetone"]
atom = [[a["el"], a["xyz"]] for a in rec["atoms"]]

traces = {}
for label, make in [
    ("HF", lambda m: scf.RHF(m)),
    ("B3LYP", lambda m: dft.RKS(m, xc="b3lyp")),
]:
    mol = gto.M(atom=atom, basis="6-31g*", verbose=0)
    mf = make(mol)
    energies = []

    def cb(envs):
        energies.append(float(envs["energy"]))

    optimize(mf, callback=cb, maxsteps=60)
    e0 = energies[0]
    traces[label] = [round((e - e0) * HARTREE_KCAL, 4) for e in energies]
    print(label, "steps", len(energies), "total drop", round(traces[label][-1], 3), "kcal/mol")

json.dump({"molecule": "acetone", "basis": "6-31G*", "traces_kcal": traces},
          open(os.path.join(OUT, "opt_trace.json"), "w"))
