import { useLocation } from "react-router-dom";
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
  KPIS as KPIS_MOCK,
  RECEITA_MENSAL as RECEITA_MENSAL_MOCK,
  CATEGORIAS as CATEGORIAS_MOCK,
  VENDEDORES as VENDEDORES_MOCK,
  REGIOES as REGIOES_MOCK,
  PRODUTOS as PRODUTOS_MOCK,
} from "../data/salesData";
import "./DashboardPage.css";

export default function DashboardPage() {
  const location = useLocation();
  const dados = location.state?.dadosDashboard;

  const KPIS = dados?.KPIS || KPIS_MOCK;
  const RECEITA_MENSAL = dados?.RECEITA_MENSAL || RECEITA_MENSAL_MOCK;
  const CATEGORIAS = dados?.CATEGORIAS || CATEGORIAS_MOCK;
  const VENDEDORES = dados?.VENDEDORES || VENDEDORES_MOCK;
  const REGIOES = dados?.REGIOES || REGIOES_MOCK;
  const PRODUTOS = dados?.PRODUTOS || PRODUTOS_MOCK;
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
