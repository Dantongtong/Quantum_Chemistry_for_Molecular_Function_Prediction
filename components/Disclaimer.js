"use client";

import { useEffect, useRef, useState } from "react";
import { program } from "@/data/site";

/**
 * Program status bar at the foot of every page.
 *
 * Always a single line. Where the full disclaimer fits (desktop), it is shown
 * whole and nothing is clickable. Where it doesn't (tablet, phone), the line is
 * cut with an ellipsis and a Show / Hide toggle expands it to the full text.
 * The toggle only appears when the text is actually truncated — measured, not
 * guessed from a breakpoint — so it never offers to expand something complete.
 */
export default function Disclaimer() {
  const textRef = useRef(null);
  const [truncated, setTruncated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const measure = () => {
      if (open) return; // while expanded the text wraps, so don't re-measure
      setTruncated(el.scrollWidth > el.clientWidth + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  const expandable = truncated || open;

  return (
    <aside className={`status${open ? " is-open" : ""}`} aria-label="Program status">
      <div className="shell status-inner">
        <span className="status-label">Program status</span>
        <span className="status-text" ref={textRef} id="program-status-text">
          {program.disclaimer}
        </span>
        {expandable && (
          <button
            type="button"
            className="status-toggle"
            aria-expanded={open}
            aria-controls="program-status-text"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide" : "Show"}
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
              <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </aside>
  );
}
