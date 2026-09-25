"""
Render the site's molecule figures as SVG files.

Run:  python3 scripts/render.py
Out:  public/figures/*.svg  and  data/computed.json

Every figure is drawn from real 3D coordinates (scripts/out/geometries.json) or
from the B3LYP/6-31G* results (scripts/out/qm_*.json). Nothing is hand-drawn to
look like chemistry: bond lengths, angles, and the electrostatic potential
colours are the computed values.

Two figure types:
  ball-and-stick   shaded spheres and cylinders, back-to-front
  ESP surface      van der Waals surface points coloured by electrostatic
                   potential (red = electron-rich, blue = electron-poor),
                   Lambert-shaded, lightly blurred into a continuous surface
"""

import json
import os

import numpy as np

HERE = os.path.dirname(__file__)
ROOT = os.path.dirname(HERE)
OUT = os.path.join(HERE, "out")
FIG = os.path.join(ROOT, "public", "figures")
os.makedirs(FIG, exist_ok=True)

# Element palette: CPK conventions, tuned to sit on the site's green paper.
BASE = {
    "H": "#f2f2ee",
    "C": "#4b5b52",
    "N": "#3b68c9",
    "O": "#d8473d",
    "F": "#95be3f",
}
RADIUS = {"H": 0.27, "C": 0.40, "N": 0.40, "O": 0.40, "F": 0.37}
GOLD = "#c98a06"
BOND_W = 0.19  # angstrom


def hex_rgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float)


def rgb_hex(c):
    c = np.clip(np.round(c), 0, 255).astype(int)
    return "#%02x%02x%02x" % tuple(c)


def shade(h, f):
    """f < 0 darkens toward black, f > 0 lightens toward white."""
    c = hex_rgb(h)
    return rgb_hex(c * (1 + f) if f < 0 else c + (255 - c) * f)


# ----------------------------------------------------------------- orientation
def rot(axis, deg):
    t = np.radians(deg)
    c, s = np.cos(t), np.sin(t)
    if axis == "x":
        return np.array([[1, 0, 0], [0, c, -s], [0, s, c]])
    if axis == "y":
        return np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]])
    return np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]])


def orient(xyz, tilt=(18, -22, 0)):
    """Principal axes: longest extent horizontal, flattest direction toward the
    viewer, then a gentle tilt so planar molecules still read as 3D."""
    c = xyz - xyz.mean(axis=0)
    _, _, vt = np.linalg.svd(c)
    R = vt  # rows: principal axes
    if np.linalg.det(R) < 0:
        R[2] *= -1
    p = c @ R.T
    T = rot("x", tilt[0]) @ rot("y", tilt[1]) @ rot("z", tilt[2])
    return p @ T.T, T @ R


# ------------------------------------------------------------------- ball-stick
def ball_and_stick(atoms, bonds, tilt=(18, -22, 0), width=520, pad=0.9,
                   title="", flip_y=False, flip_x=False):
    els = [a["el"] for a in atoms]
    xyz = np.array([a["xyz"] for a in atoms], float)
    p, _ = orient(xyz, tilt)
    if flip_y:
        p[:, 1] *= -1
    if flip_x:
        p[:, 0] *= -1
    rad = np.array([RADIUS[e] for e in els])
    lo = (p[:, :2] - rad[:, None]).min(axis=0) - pad
    hi = (p[:, :2] + rad[:, None]).max(axis=0) + pad
    span = hi - lo
    s = width / span[0]
    height = span[1] * s
    zmin, zmax = p[:, 2].min(), p[:, 2].max()

    def X(v):
        return (v[0] - lo[0]) * s

    def Y(v):
        return (hi[1] - v[1]) * s  # screen y grows down

    def fog(col, z):
        # far atoms drift toward the paper colour
        t = 0 if zmax == zmin else (zmax - z) / (zmax - zmin)
        return rgb_hex(hex_rgb(col) * (1 - 0.28 * t) + hex_rgb("#eef1ec") * 0.28 * t)

    items = []  # (depth, svg)
    for b in bonds:
        i, j = b["a"], b["b"]
        a, c = p[i], p[j]
        d = c - a
        L2 = np.linalg.norm(d[:2])
        if L2 < 1e-6:
            continue
        if b.get("weak"):
            # interaction line: dashed gold, from sphere edge to sphere edge
            u = d[:2] / L2
            a2 = a[:2] + u * rad[i] * 0.9
            c2 = c[:2] - u * rad[j] * 0.9
            items.append((min(a[2], c[2]) - 0.01,
                          f'<line x1="{X(a2):.1f}" y1="{Y(a2):.1f}" x2="{X(c2):.1f}" y2="{Y(c2):.1f}" '
                          f'stroke="{GOLD}" stroke-width="{0.075*s:.1f}" stroke-dasharray="{0.16*s:.1f} {0.14*s:.1f}" '
                          f'stroke-linecap="round"/>'))
            continue
        mid = (a + c) / 2
        perp = np.array([-d[1], d[0]]) / L2
        order = b.get("order", 1)
        offs = [0.0] if order == 1 else ([-0.1, 0.1] if order == 2 else [-0.15, 0, 0.15])
        w = BOND_W * (0.72 if order > 1 else 1)
        for (start, end, idx) in ((a, mid, i), (mid, c, j)):
            col = fog(BASE[els[idx]], (start[2] + end[2]) / 2)
            z = (start[2] + end[2]) / 2 - 0.35
            for o in offs:
                sx, sy = start[:2] + perp * o
                ex, ey = end[:2] + perp * o
                pts = f'x1="{X((sx,sy)):.1f}" y1="{Y((sx,sy)):.1f}" x2="{X((ex,ey)):.1f}" y2="{Y((ex,ey)):.1f}"'
                items.append((z,
                    f'<line {pts} stroke="{shade(col, -0.45)}" stroke-width="{(w+0.05)*s:.1f}" stroke-linecap="round"/>'
                    f'<line {pts} stroke="{shade(col, 0.08) if els[idx] != "H" else "#e4e4de"}" stroke-width="{w*s:.1f}" stroke-linecap="round"/>'))

    used = sorted(set(els))
    defs = []
    for e in used:
        base = BASE[e]
        defs.append(
            f'<radialGradient id="g{e}" cx="0.36" cy="0.32" r="0.72">'
            f'<stop offset="0" stop-color="{shade(base, 0.7)}"/>'
            f'<stop offset="0.45" stop-color="{base}"/>'
            f'<stop offset="1" stop-color="{shade(base, -0.45)}"/></radialGradient>')
    for k, e in enumerate(els):
        cx, cy = X(p[k]), Y(p[k])
        r = rad[k] * s
        t = 0 if zmax == zmin else (zmax - p[k][2]) / (zmax - zmin)
        op = 1 - 0.22 * t
        items.append((p[k][2],
            f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="url(#g{e})" '
            f'stroke="{shade(BASE[e], -0.55)}" stroke-width="{0.012*s:.2f}" opacity="{op:.2f}"/>'))

    items.sort(key=lambda t: t[0])
    body = "\n".join(svg for _, svg in items)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} {height:.0f}" '
            f'role="img" aria-label="{title}"><title>{title}</title>'
            f'<defs>{"".join(defs)}</defs>{body}</svg>')


# -------------------------------------------------------------------- ESP map
ESP_RANGE = 0.045  # atomic units, symmetric; same scale for every molecule
NEG = hex_rgb("#c9342b")  # electron-rich
MID = hex_rgb("#f4efe4")
POS = hex_rgb("#2e5cbf")  # electron-poor


def esp_colour(v):
    t = float(np.clip(v / ESP_RANGE, -1, 1))
    if t < 0:
        return MID + (NEG - MID) * (-t) ** 0.85
    return MID + (POS - MID) * t ** 0.85


def esp_surface(qm, tilt=(18, -22, 0), width=520, pad=0.5, title="", flip_y=False, flip_x=False):
    atoms = np.array([a["xyz"] for a in qm["atoms"]], float)
    pts = np.array(qm["surface"]["points"], float)
    esp = np.array(qm["surface"]["esp_au"], float)
    owner = np.array(qm["surface"]["owner"], int)
    centre = atoms.mean(axis=0)
    _, R = orient(atoms, tilt)
    P = (pts - centre) @ R.T
    A = (atoms - centre) @ R.T
    if flip_y:
        P[:, 1] *= -1; A[:, 1] *= -1
    if flip_x:
        P[:, 0] *= -1; A[:, 0] *= -1
    normals = P - A[owner]
    normals /= np.linalg.norm(normals, axis=1)[:, None]
    front = normals[:, 2] > -0.25
    P, esp, normals = P[front], esp[front], normals[front]

    lo = P[:, :2].min(axis=0) - pad
    hi = P[:, :2].max(axis=0) + pad
    span = hi - lo
    s = width / span[0]
    height = span[1] * s
    light = np.array([-0.45, 0.55, 0.70]); light /= np.linalg.norm(light)
    order = np.argsort(P[:, 2])
    dots = []
    r = 0.27 * s
    for k in order:
        lam = max(0.0, float(normals[k] @ light))
        f = 0.55 + 0.5 * lam
        spec = max(0.0, lam) ** 18 * 0.35
        col = esp_colour(esp[k]) * f + 255 * spec
        x = (P[k, 0] - lo[0]) * s
        y = (hi[1] - P[k, 1]) * s
        dots.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="{rgb_hex(col)}"/>')
    blur = 0.045 * s
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} {height:.0f}" '
            f'role="img" aria-label="{title}"><title>{title}</title>'
            f'<defs><filter id="soft" x="-5%" y="-5%" width="110%" height="110%">'
            f'<feGaussianBlur stdDeviation="{blur:.1f}"/></filter></defs>'
            f'<g filter="url(#soft)">{"".join(dots)}</g></svg>')


def write(name, svg):
    with open(os.path.join(FIG, name), "w") as f:
        f.write(svg)
    print(f"  {name:32s} {len(svg)/1024:6.1f} KB")


# ------------------------------------------------------------------------ run
geoms = json.load(open(os.path.join(OUT, "geometries.json")))
SHARED = ["water", "ethanol", "acetone", "benzene", "trifluoroethanol"]
NICE = {
    "water": "Water", "ethanol": "Ethanol", "acetone": "Acetone",
    "benzene": "Benzene", "trifluoroethanol": "2,2,2-Trifluoroethanol",
}
# per-molecule view tweaks so each one reads well
VIEW = {
    "water": dict(tilt=(0, 0, 0), flip_y=True),
    "ethanol": dict(tilt=(15, -10, 0)),
    "acetone": dict(tilt=(10, -20, 0), flip_y=True),
    "benzene": dict(tilt=(52, -8, 0)),
    "trifluoroethanol": dict(tilt=(20, -28, 0)),
}

qm = {n: json.load(open(os.path.join(OUT, f"qm_{n}.json"))) for n in SHARED}

print("ball-and-stick, shared set")
for n in SHARED:
    q = qm[n]
    write(f"{n}.svg", ball_and_stick(q["atoms"], q["bonds"], title=f"{NICE[n]}, ball-and-stick model", **VIEW[n]))

print("ESP surfaces, shared set")
for n in SHARED:
    write(f"{n}-esp.svg", esp_surface(qm[n], title=f"{NICE[n]}, electrostatic potential on the molecular surface", **VIEW[n]))

print("research-topic scenes")
SCENES = {
    "pfas": ("Perfluorooctanoic acid (PFOA), a PFAS molecule", dict(tilt=(75, 0, 0))),
    "co2_capture": ("Melamine with a CO2 molecule over an amino group", dict(tilt=(-38, 0, 0))),
    "radical": ("A fluoromethyl radical approaching nitrogen dioxide", dict(tilt=(20, -30, 0))),
    "oh_addition": ("An OH radical approaching a phenol ring", dict(tilt=(-30, 12, 0))),
    "pka": ("Phenol with three hydrogen-bonded water molecules", dict(tilt=(-35, 10, 0))),
    "microplastics": ("A PET fragment with phenol bound at its carboxylic acid site", dict(tilt=(30, 0, 0))),
}
for n, (title, view) in SCENES.items():
    g = geoms[n]
    write(f"{n}.svg", ball_and_stick(g["atoms"], g["bonds"], title=title, **view))

# ---------------------------------------------------------- numbers for React
computed = {
    "method": "B3LYP/6-31G*",
    "engine": "PySCF",
    "molecules": [
        {
            "key": n,
            "name": NICE[n],
            "homo_ev": round(qm[n]["homo_ev"], 2),
            "lumo_ev": round(qm[n]["lumo_ev"], 2),
            "gap_ev": round(qm[n]["gap_ev"], 2),
            "dipole_debye": round(qm[n]["dipole_debye"], 2),
        }
        for n in SHARED
    ],
    "esp_range_au": ESP_RANGE,
}
trace_path = os.path.join(OUT, "opt_trace.json")
if os.path.exists(trace_path):
    computed["optimization"] = json.load(open(trace_path))
with open(os.path.join(ROOT, "data", "computed.json"), "w") as f:
    json.dump(computed, f, indent=2)
print("wrote data/computed.json")
