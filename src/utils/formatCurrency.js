export function formatBRL(value, compact = false) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: compact ? 0 : 2,
    notation: compact ? "compact" : "standard",
  }).format(value);
}
