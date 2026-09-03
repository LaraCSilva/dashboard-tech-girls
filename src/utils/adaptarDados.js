// Converte o JSON que vem do backend (Flask) para o formato
// que os componentes de gráfico do Dashboard já sabem usar.

const NOMES_MESES = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

function pegarIniciais(nome) {
  const partes = nome.trim().split(" ");
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
}

export function adaptarDadosBackend(resposta) {
  const { resumo_geral, por_produto, ranking_vendedores, por_regiao, por_mes } = resposta;

  const KPIS = {
    receitaTotal: resumo_geral.total_vendas,
    totalVendas: resumo_geral.quantidade_total_produtos,
    ticketMedio: resumo_geral.ticket_medio,
    totalDescontos: 0,
    itensVendidos: resumo_geral.quantidade_total_produtos,
  };

  const RECEITA_MENSAL = por_mes.map((item) => {
    const [ano, mes] = item.mes.split("-");
    return {
      mes: NOMES_MESES[parseInt(mes, 10) - 1],
      valor: item.valor_total,
    };
  });

  const CORES = ["var(--purple-800)", "var(--purple-500)", "var(--purple-300)", "var(--purple-200)"];
  const CATEGORIAS = por_produto.slice(0, 4).map((item, i) => ({
    nome: item.nome,
    valor: item.valor_total,
    cor: CORES[i] || "var(--purple-200)",
  }));

  const VENDEDORES = ranking_vendedores.map((item) => ({
    nome: item.nome,
    iniciais: pegarIniciais(item.nome),
    valor: item.valor_total,
  }));

  const REGIOES = por_regiao.map((item) => ({
    nome: item.regiao,
    valor: item.valor_total,
  }));

  const PRODUTOS = por_produto.map((item) => ({
    produto: item.nome,
    categoria: "-",
    unidades: item.quantidade,
    receita: item.valor_total,
  }));

  return { KPIS, RECEITA_MENSAL, CATEGORIAS, VENDEDORES, REGIOES, PRODUTOS };
}