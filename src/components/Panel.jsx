import "./Panel.css";

export default function Panel({ title, subtitle, children, className = "" }) {
  return (
    <div className={`panel ${className}`}>
      <div className="panel-head">
        <h3>{title}</h3>
        {subtitle && <span className="panel-subtitle">{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}
