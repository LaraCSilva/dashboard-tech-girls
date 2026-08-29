import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatBRL } from "../../utils/formatCurrency";
import "./RegionBarChart.css";

export default function RegionBarChart({ data }) {
  const max = Math.max(...data.map((r) => r.valor));

  return (
    <div className="region-chart">
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
          <XAxis dataKey="nome" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9992ad" }} />
          <YAxis hide domain={[0, max * 1.1]} />
          <Tooltip
            formatter={(v) => formatBRL(v)}
            contentStyle={{ borderRadius: 10, border: "1px solid #E1D4FB", fontSize: 12 }}
          />
          <Bar dataKey="valor" radius={[8, 8, 3, 3]} fill="#7C3AED" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
