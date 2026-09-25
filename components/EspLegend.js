/** Colour key for every electrostatic potential figure on the site. */
export default function EspLegend() {
  return (
    <span className="esp-legend">
      <span>Electron-rich</span>
      <span className="esp-bar" aria-hidden="true" />
      <span>Electron-poor</span>
      <span className="esp-note">B3LYP/6-31G*</span>
    </span>
  );
}
