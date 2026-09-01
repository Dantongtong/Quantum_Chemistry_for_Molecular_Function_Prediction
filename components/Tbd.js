import { TBD_PREFIX } from "@/data/site";

/**
 * Renders a value from data/site.js.
 * If the value was wrapped in TBD("..."), it shows as a dashed placeholder,
 * so unfinished content is visible on the page instead of silently missing.
 */
export default function Tbd({ value }) {
  if (Array.isArray(value)) {
    return value.map((v, i) => (
      <span key={i}>
        {i > 0 ? ", " : ""}
        <Tbd value={v} />
      </span>
    ));
  }
  if (typeof value === "string" && value.startsWith(TBD_PREFIX)) {
    return <span className="tbd">{value.slice(TBD_PREFIX.length)}</span>;
  }
  return value ?? null;
}

/** True when a value is still a placeholder — useful for hiding dead links. */
export function isTbd(value) {
  return typeof value === "string" && value.startsWith(TBD_PREFIX);
}
