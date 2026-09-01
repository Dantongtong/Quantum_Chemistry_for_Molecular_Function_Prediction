import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { program } from "@/data/site";
import "./globals.css";

export const metadata = {
  title: {
    default: `${program.shortName} — ${program.host}`,
    template: `%s — ${program.shortName}`,
  },
  description: program.lede,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Typefaces are declared as CSS variables in globals.css.
            Loaded here rather than through next/font so the project builds
            without network access; switch to next/font/google if you prefer. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500&display=swap"
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
