import { formatBRL } from "../../utils/formatCurrency";
import "./VendorRanking.css";

export default function VendorRanking({ data }) {
  const max = Math.max(...data.map((v) => v.valor));

  return (
    <div className="vendor-ranking">
      {data.map((v) => (
        <div className="vendor-row" key={v.nome}>
          <div className="vendor-row-top">
            <div className="vendor-avatar">{v.iniciais}</div>
            <div className="vendor-name">{v.nome}</div>
            <div className="vendor-value">{formatBRL(v.valor)}</div>
          </div>
          <div className="vendor-track">
            <div className="vendor-fill" style={{ width: `${(v.valor / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
