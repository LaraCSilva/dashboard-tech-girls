# Roteiro do Pitch — Portal de Automação de Relatórios
⏱ Tempo total: 5 minutos

---

## 0:00 – 0:40 | Apresentação e Problema
> "Boa tarde! Nós somos a Equipe 2 do Tech Girls Challenge. Hoje apresentamos o Portal de Automação de Relatórios e Tarefas.

Antes, a rotina era assim: alguém recebia a planilha, calculava tudo manualmente, montava os gráficos e enviava. Levava cerca de 15 minutos por relatório, era repetitivo e sujeito a erros.

Identificamos que esse processo poderia ser automatizado — e foi assim que nasceu o nosso portal."

## 0:40 – 1:30 | Solução — Como Funciona
> "Desenvolvemos um sistema completo que funciona em 3 etapas:

1. **Upload** — O usuário seleciona o arquivo Excel na interface
2. **Processamento** — O backend em Python + Flask calcula todos os dados automaticamente
3. **Visualização** — Os resultados aparecem em gráficos e tabelas interativas prontos para consulta"

## 1:30 – 2:30 | Demonstração Técnica
> "O projeto é dividido em camadas independentes:
- **Frontend** em React + Vite → interface rápida e moderna
- **Backend** em Python (Flask) → API que processa e calcula
- **Conteinerização** com Docker → sobe com um comando, sem complicações de instalação

A comunicação acontece via API REST — cada parte pode ser atualizada separadamente."

## 2:30 – 3:30 | Resultados e Impacto
> "Os resultados são claros:
- ⏱ Tempo de processamento: de 15 minutos para **menos de 30 segundos**
- ✅ Precisão: cálculos automáticos sem erro humano
- 📊 Visualização: gráficos de pizza, barras e área que atualizam sozinhos
- 🧑‍💻 Usabilidade: testado com usuário externo, avaliado com nota 9,2/10

Ganhamos tempo, reduzimos trabalho repetitivo e entregamos informação com qualidade."

## 3:30 – 4:20 | Diferencial Técnico — Docker
> "Um destaque especial é o **Docker**. Com os arquivos `Dockerfile` e `docker-compose.yml`, qualquer pessoa consegue subir o projeto inteiro com um único comando — não precisa instalar Python, bibliotecas ou configurar ambiente manualmente. Funciona igual em qualquer computador."

## 4:20 – 5:00 | Conclusão
> "Em resumo: transformamos uma rotina lenta e manual em um fluxo rápido, confiável e acessível. O portal está pronto, testado e documentado. Agradecemos a atenção e ficamos à disposição para perguntas!"