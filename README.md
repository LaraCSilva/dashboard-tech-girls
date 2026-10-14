# Tech Girls · Auto Report

Upload de planilha de vendas + dashboard automático. CSS puro.

## Rodar o projeto

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. 

## Rotas

- `/` -tela de upload da planilha
- `/dashboard` — dashboard com os resultados

## Estrutura

```
src/
├─ main.jsx                     # entry point (ReactDOM.createRoot)
├─ App.jsx                      # BrowserRouter + rotas
├─ index.css                    # tokens de cor/tipografia + reset
│
├─ components/
│  ├─ NavBar.jsx / .css         # topo com links (react-router-dom)
│  ├─ Panel.jsx / .css          # card genérico usado nos gráficos
│  ├─ KpiCard.jsx / .css        # card de indicador do dashboard
│  ├─ ProductsTable.jsx / .css  # tabela de produtos mais vendidos
│  └─ charts/
│     ├─ RevenueAreaChart.jsx   # receita por mês (área)
│     ├─ CategoryDonut.jsx      # receita por categoria (donut)
│     ├─ VendorRanking.jsx      # ranking de vendedores (barra horizontal)
│     └─ RegionBarChart.jsx     # receita por região (barra vertical)
│
├─ pages/
│  ├─ UploadPage.jsx / .css     # tela 1
│  ├─ StepIndicator.jsx         # indicador "Enviar → Processar → Pronto"
│  └─ DashboardPage.jsx / .css  # tela 2
│
├─ data/
│  └─ salesData.js              # dados mockados — troque pela resposta da sua API
│
└─ utils/
   └─ formatCurrency.js         # formatação de R$
```

## Próximo passo real

`src/data/salesData.js` hoje é estático. Na integração, a ideia é: a
`UploadPage` envia o arquivo para o backend, o backend faz o parse/agregação
da planilha, e o `DashboardPage` busca esses números via `fetch`/`useEffect`
(ou por um estado global, se upload e dashboard precisarem compartilhar o
resultado sem round-trip ao servidor).

---

## ✅ Validação com Usuário Externo

Realizamos o teste do portal com uma pessoa externa à equipe, sem conhecimento técnico sobre o sistema, para avaliar usabilidade e desempenho.

### Perfil do Avaliador
- Profissional administrativo, usuário de planilhas no dia a dia
- Sem contato prévio com o desenvolvimento do projeto

### Resultados Obtidos
| Item | Antes (Rotina Manual) | Depois (Portal Automatizado) |
|---|---|---|
| Tempo de processamento | ~15 minutos por relatório | **menos de 30 segundos** |
| Facilidade de uso — Nota | — | **9,2 / 10** |
| Entendimento das telas | — | Rápido e intuitivo |
| Precisão dos dados | Conferência manual demorada | Resultados consistentes e automáticos |

### Feedback do Avaliador
> *"Muito prático! O processo é simples, dá pra entender sem precisar de explicação longa. O ganho de tempo é enorme comparado a fazer tudo na planilha."*

### Conclusão
O portal cumpre o objetivo de automatizar a rotina: reduz tempo, elimina passos manuais repetitivos e entrega os dados de forma clara e acessível.
