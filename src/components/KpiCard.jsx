import "./KpiCard.css";

export default function KpiCard({ label, value, delta, primary = false }) {
  return (
    <div className={`kpi-card ${primary ? "kpi-card-primary" : ""}`}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {delta && <div className="kpi-delta">{delta}</div>}
    </div>
  );
}
