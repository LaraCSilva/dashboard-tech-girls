import { ChevronDown, Download } from "lucide-react";
import KpiCard from "../components/KpiCard";
import Panel from "../components/Panel";
import ProductsTable from "../components/ProductsTable";
import RevenueAreaChart from "../components/charts/RevenueAreaChart";
import CategoryDonut from "../components/charts/CategoryDonut";
import VendorRanking from "../components/charts/VendorRanking";
import RegionBarChart from "../components/charts/RegionBarChart";
import { formatBRL } from "../utils/formatCurrency";
import {
  KPIS,
  RECEITA_MENSAL,
  CATEGORIAS,
  VENDEDORES,
  REGIOES,
  PRODUTOS,
} from "../data/salesData";
import "./DashboardPage.css";

export default function DashboardPage() {
  return (
    <div>
      <div className="dashboard-header">
        <div>
          <div className="dashboard-crumbs">
            Relatório · <b>Jun–Ago 2026</b> · gerado automaticamente
          </div>
          <h2 className="dashboard-title">Dashboard de vendas</h2>
        </div>

        <div className="dashboard-actions">
          <button className="chip chip-select">
            Jun – Ago 2026 <ChevronDown size={14} />
          </button>
          <button className="chip chip-export">
            <Download size={14} /> Exportar PDF
          </button>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="kpi-row">
          <KpiCard
            primary
            label="Receita líquida total"
            value={formatBRL(KPIS.receitaTotal, true)}
            delta="+27,6% vs. mês anterior"
          />
          <KpiCard
            label="Total de vendas"
            value={KPIS.totalVendas}
            delta="5 vendedores(as) ativos"
          />
          <KpiCard
            label="Ticket médio"
            value={formatBRL(KPIS.ticketMedio, true)}
            delta={`${KPIS.itensVendidos} itens vendidos`}
          />
          <KpiCard
            label="Descontos concedidos"
            value={formatBRL(KPIS.totalDescontos, true)}
            delta="1,8% da receita bruta"
          />
        </div>

        <div className="dashboard-grid-2">
          <Panel title="Receita por mês" subtitle="Valor líquido, R$">
            <RevenueAreaChart data={RECEITA_MENSAL} />
            <div className="month-labels">
              {RECEITA_MENSAL.map((m) => (
                <span key={m.mes}>
                  {m.mes.toUpperCase()} · {formatBRL(m.valor, true)}
                </span>
              ))}
            </div>
          </Panel>

          <Panel title="Receita por categoria" subtitle="Participação">
            <CategoryDonut data={CATEGORIAS} />
          </Panel>
        </div>

        <div className="dashboard-grid-2">
          <Panel title="Ranking de vendedoras(es)" subtitle="Receita líquida">
            <VendorRanking data={VENDEDORES} />
          </Panel>

          <Panel title="Receita por região" subtitle="Valor líquido">
            <RegionBarChart data={REGIOES} />
          </Panel>
        </div>

        <Panel title="Produtos mais vendidos" subtitle="Ordenado por receita líquida">
          <ProductsTable data={PRODUTOS} />
        </Panel>
      </div>
    </div>
  );
}
