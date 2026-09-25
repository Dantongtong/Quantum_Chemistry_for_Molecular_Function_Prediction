"use client";

import { useState } from "react";
import EspLegend from "./EspLegend";

/**
 * The five Stage 1 molecules, switchable between the structure students build
 * in Week 1 and the electrostatic potential they compute in Week 3. The toggle
 * is the program's whole argument in one control: structure gives clues,
 * computation gives evidence.
 */
const MOLECULES = [
  { key: "water", name: "Water" },
  { key: "ethanol", name: "Ethanol" },
  { key: "acetone", name: "Acetone" },
  { key: "benzene", name: "Benzene" },
  { key: "trifluoroethanol", name: "Trifluoroethanol" },
];

export default function MoleculeGallery() {
  const [view, setView] = useState("structure");
  const esp = view === "esp";

  return (
    <div className="gallery">
      <div className="segmented" role="tablist" aria-label="Molecule view">
        <button
          role="tab"
          aria-selected={!esp}
          className={!esp ? "is-on" : ""}
          onClick={() => setView("structure")}
        >
          Structure
        </button>
        <button
          role="tab"
          aria-selected={esp}
          className={esp ? "is-on" : ""}
          onClick={() => setView("esp")}
        >
          Computed charge
        </button>
      </div>

      <ul className="gallery-row">
        {MOLECULES.map((m) => (
          <li key={m.key} className="gallery-item">
            <div className="gallery-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/figures/${m.key}${esp ? "-esp" : ""}.svg`}
                alt={`${m.name}, ${esp ? "electrostatic potential" : "ball-and-stick structure"}`}
              />
            </div>
            <span className="gallery-name">{m.name}</span>
          </li>
        ))}
      </ul>

      <div className="gallery-foot">
        {esp ? <EspLegend /> : <span>3D structures, as built in Week 1</span>}
      </div>
    </div>
  );
}
