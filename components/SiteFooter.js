import Link from "next/link";
import Tbd from "./Tbd";
import { program, nav } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="colophon">
      <div className="shell">
        <div className="colophon-grid">
          <div>
            <h3>Program</h3>
            <p>{program.name}</p>
            <p>{program.subtitle}</p>
            <p>
              Organized by {program.host}. Guided by Vanderbilt University,
              Department of Chemistry.
            </p>
          </div>
          <div>
            <h3>Pages</h3>
            {nav.map((item) => (
              <p key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </p>
            ))}
          </div>
          <div>
            <h3>Contact</h3>
            <p>{program.contact.name}</p>
            <p>
              <a href={`mailto:${program.contact.email}`}>
                {program.contact.email}
              </a>
            </p>
          </div>
        </div>
        <p className="colophon-note">
          Sessions are recorded. A signed recording and permission form is
          required before a student attends their first session; a parent or
          legal guardian signs for students under 18. Program materials are for
          enrolled participants&rsquo; personal study only.
        </p>
      </div>
    </footer>
  );
}
