/**
 * Dados de exemplo (Jun–Ago 2026, 300 vendas).
 * Em produção, isso deve vir do backend após o parse da
 * planilha enviada na tela de Upload.
 */

export const KPIS = {
  receitaTotal: 1361374,
  totalVendas: 300,
  ticketMedio: 4538,
  totalDescontos: 24806,
  itensVendidos: 1727,
};

export const RECEITA_MENSAL = [
  { mes: "Jun", valor: 393102.5 },
  { mes: "Jul", valor: 466720.5 },
  { mes: "Ago", valor: 501551.0 },
];

export const CATEGORIAS = [
  { nome: "Eletrônicos", valor: 984200.0, cor: "var(--purple-800)" },
  { nome: "Móveis", valor: 175822.5, cor: "var(--purple-500)" },
  { nome: "Periféricos", valor: 112941.5, cor: "var(--purple-300)" },
  { nome: "Acessórios", valor: 88410.0, cor: "var(--purple-200)" },
];

export const VENDEDORES = [
  { nome: "Ana", iniciais: "AN", valor: 390563.0 },
  { nome: "Bruno", iniciais: "BR", valor: 289676.0 },
  { nome: "Diego", iniciais: "DI", valor: 259335.5 },
  { nome: "Camila", iniciais: "CA", valor: 241702.0 },
  { nome: "Fernanda", iniciais: "FE", valor: 180097.5 },
];

export const REGIOES = [
  { nome: "Sudeste", valor: 452903.0 },
  { nome: "Nordeste", valor: 335583.5 },
  { nome: "Sul", valor: 315032.0 },
  { nome: "C-Oeste", valor: 257855.5 },
];

export const PRODUTOS = [
  { produto: "Notebook", categoria: "Eletrônicos", unidades: 258, receita: 816800.0 },
  { produto: "Cadeira", categoria: "Móveis", unidades: 212, receita: 175822.5 },
  { produto: "Monitor", categoria: "Eletrônicos", unidades: 144, receita: 167400.0 },
  { produto: "Headset", categoria: "Periféricos", unidades: 221, receita: 53375.0 },
  { produto: "Webcam", categoria: "Acessórios", unidades: 242, receita: 51744.0 },
];
