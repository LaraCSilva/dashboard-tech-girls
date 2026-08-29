import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatBRL } from "../../utils/formatCurrency";
import "./RevenueAreaChart.css";

export default function RevenueAreaChart({ data }) {
  return (
    <div className="revenue-chart">
      <ResponsiveContainer width="100%" height={170}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="mes"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9992ad" }}
          />
          <Tooltip
            formatter={(v) => formatBRL(v)}
            labelStyle={{ fontWeight: 600 }}
            contentStyle={{ borderRadius: 10, border: "1px solid #E1D4FB", fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey="valor"
            stroke="#6D28D9"
            strokeWidth={3}
            fill="url(#areaFill)"
            dot={{ r: 4, fill: "#fff", stroke: "#6D28D9", strokeWidth: 2.5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
