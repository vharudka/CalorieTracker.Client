import type { SummaryCardItem } from "../models/stats/SummaryCardItem";

interface Props {
  title: string;
  items: SummaryCardItem[];
}

export default function SummaryCards({ title, items }: Props) {
  return (
    <div className="card">
      <h2>{title}</h2>

      <div className="summary-grid">
        {items.map((item, i) => (
          <div className="summary-card" key={i}>
            <h3>{item.title}</h3>
            <p className={`summary-value ${item.highlight ? "highlight" : ""}`}>
              {item.value}
            </p>
            <p className="summary-sub">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}