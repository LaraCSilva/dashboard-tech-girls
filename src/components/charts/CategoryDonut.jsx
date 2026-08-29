import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./CategoryDonut.css";

export default function CategoryDonut({ data }) {
  const total = data.reduce((sum, item) => sum + item.valor, 0);

  return (
    <div className="donut-wrap">
      <div className="donut-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="valor"
              nameKey="nome"
              innerRadius={46}
              outerRadius={66}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((c) => (
                <Cell key={c.nome} fill={c.cor} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="donut-legend">
        {data.map((c) => (
          <div className="legend-item" key={c.nome}>
            <span className="legend-swatch" style={{ background: c.cor }} />
            <span className="legend-name">{c.nome}</span>
            <span className="legend-pct">{((c.valor / total) * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
