// Converte o JSON que vem do backend (Flask, rota /processar-planilha)
// para o formato que os componentes de gráfico do Dashboard já sabem usar.

const ORDEM_MESES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const NOMES_MESES_PT = {
  Jan: "Jan", Feb: "Fev", Mar: "Mar", Apr: "Abr", May: "Mai", Jun: "Jun",
  Jul: "Jul", Aug: "Ago", Sep: "Set", Oct: "Out", Nov: "Nov", Dec: "Dez",
};

const CORES = ["var(--purple-800)", "var(--purple-500)", "var(--purple-300)", "var(--purple-200)"];

function pegarIniciais(nome) {
  const partes = nome.trim().split(" ");
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
}

export function adaptarDadosBackend(resposta) {
  const {
    total_vendas,
    receita_liquida,
    ticket_medio,
    total_descontos,
    receita_por_mes = {},
    receita_por_categoria = {},
    ranking_vendedoras = {},
    receita_por_regiao = {},
  } = resposta;

  const vendedoresAtivos = Object.keys(ranking_vendedoras).length;

  const KPIS = {
    receitaTotal: receita_liquida,
    totalVendas: total_vendas,
    ticketMedio: ticket_medio,
    totalDescontos: total_descontos,
    itensVendidos: total_vendas,
    vendedoresAtivos,
  };

  const RECEITA_MENSAL = Object.entries(receita_por_mes)
    .sort(([a], [b]) => ORDEM_MESES.indexOf(a) - ORDEM_MESES.indexOf(b))
    .map(([mes, valor]) => ({
      mes: NOMES_MESES_PT[mes] || mes,
      valor,
    }));

  const CATEGORIAS = Object.entries(receita_por_categoria)
    .sort(([, a], [, b]) => b - a)
    .map(([nome, valor], i) => ({
      nome,
      valor,
      cor: CORES[i] || "var(--purple-200)",
    }));

  const VENDEDORES = Object.entries(ranking_vendedoras)
    .sort(([, a], [, b]) => b - a)
    .map(([nome, valor]) => ({
      nome,
      iniciais: pegarIniciais(nome),
      valor,
    }));

  const REGIOES = Object.entries(receita_por_regiao)
    .sort(([, a], [, b]) => b - a)
    .map(([nome, valor]) => ({ nome, valor }));

  // O backend não envia dados por produto (a planilha só tem
  // Vendedora/Categoria/Região) — a tabela de produtos fica com o mock.
  return { KPIS, RECEITA_MENSAL, CATEGORIAS, VENDEDORES, REGIOES };
}
