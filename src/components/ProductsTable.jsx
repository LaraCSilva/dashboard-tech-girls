import { formatBRL } from "../utils/formatCurrency";
import "./ProductsTable.css";

export default function ProductsTable({ data }) {
  return (
    <div className="products-table-wrap">
      <table className="products-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th className="num">Unidades</th>
            <th className="num">Receita líquida</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.produto}>
              <td>
                <span className="product-tag">
                  <span className="product-dot" />
                  {p.produto}
                </span>
              </td>
              <td className="muted">{p.categoria}</td>
              <td className="num">{p.unidades}</td>
              <td className="num">{formatBRL(p.receita)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
