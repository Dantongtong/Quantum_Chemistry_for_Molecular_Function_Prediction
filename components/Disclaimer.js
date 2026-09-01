import { program } from "@/data/site";

export default function Disclaimer() {
  return (
    <aside className="disclaimer">
      <div className="shell">
        <p>
          <strong>Program status</strong>
          {program.disclaimer}
        </p>
      </div>
    </aside>
  );
}
