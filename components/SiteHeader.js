"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="masthead">
      <div className="shell masthead-inner">
        <Link href="/" className="wordmark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="wordmark-logo" src="/brand/catalyst-mark.png" alt="Catalyst Society" />
          <span>Quantum Chemistry Program</span>
        </Link>
        <nav className="navlinks" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="navlink"
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
