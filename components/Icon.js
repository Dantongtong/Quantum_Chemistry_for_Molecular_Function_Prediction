/**
 * Small line icons for list items and cards. One stroke weight, 24px grid,
 * currentColor so they follow the surrounding text colour.
 */
const PATHS = {
  medal: (
    <>
      <path d="M8 3l2.5 6M16 3l-2.5 6" />
      <circle cx="12" cy="15" r="5.5" />
      <path d="M12 12.2l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" />
    </>
  ),
  poster: (
    <>
      <rect x="4" y="3" width="16" height="15" rx="1" />
      <path d="M4 7h16M7 10h5M7 13h4M14 10h3v4h-3zM9 21l3-3 3 3" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6l-5 9.5A1.5 1.5 0 0 0 6.3 21h11.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  notebook: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 3v18M12 8h4M12 12h4" />
    </>
  ),
  paper: (
    <>
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M15 3v3h3M9 10h6M9 13h6M9 16h4" />
    </>
  ),
  abstract: (
    <>
      <path d="M5 4h14v16H5z" />
      <path d="M8 8h8M8 11h8M8 14h5" />
      <circle cx="16.5" cy="17" r="2.5" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c1.2-4 4.2-6 7.5-6s6.3 2 7.5 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  laptop: (
    <>
      <rect x="4.5" y="5" width="15" height="10" rx="1" />
      <path d="M2.5 19h19" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5C6.5 4 9.5 4 12 5.5 14.5 4 17.5 4 20 5.5V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0z" />
      <path d="M12 5.5V19" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5" />
      <circle cx="16.5" cy="9.5" r="2.6" />
      <path d="M15.5 14.6c2.3-.4 4.5 1.1 5.2 4.2" />
    </>
  ),
};

export default function Icon({ name, size = 24, className = "" }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
