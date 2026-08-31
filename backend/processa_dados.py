import pandas as pd
import os

def ler_e_processar_planilha(caminho_arquivo):
    """
    Recebe o caminho de uma planilha (Excel ou CSV)
    Lê os dados, calcula tudo que precisa
    Devolve os resultados prontos em formato de dicionário
    """
    try:
        # ✅ PASSO 1: LER O ARQUIVO
        extensao = os.path.splitext(caminho_arquivo)[1].lower()
        
        if extensao == '.csv':
            df = pd.read_csv(caminho_arquivo)
        elif extensao in ['.xlsx', '.xls']:
            df = pd.read_excel(caminho_arquivo)
        else:
            return {"erro": "Formato de arquivo não suportado. Use .csv ou .xlsx"}

        # ✅ PASSO 2: VERIFICAR COLUNAS OBRIGATÓRIAS
        colunas_necessarias = ["Data", "Produto", "Quantidade", "Valor", "Vendedor", "Regiao"]
        colunas_faltando = [col for col in colunas_necessarias if col not in df.columns]
        
        if colunas_faltando:
            return {
                "erro": f"Faltam estas colunas na planilha: {', '.join(colunas_faltando)}",
                "sucesso": False
            }

        # ✅ PASSO 3: CALCULAR TOTAIS GERAIS
        total_vendas = df["Valor"].sum()
        quantidade_total = df["Quantidade"].sum()
        media_venda = df["Valor"].mean()

        # ✅ PASSO 4: VENDAS POR PRODUTO
        por_produto = df.groupby("Produto").agg({
            "Valor": "sum",
            "Quantidade": "sum"
        }).sort_values("Valor", ascending=False).reset_index()
        
        lista_produtos = []
        for _, linha in por_produto.iterrows():
            lista_produtos.append({
                "nome": linha["Produto"],
                "valor_total": round(linha["Valor"], 2),
                "quantidade": int(linha["Quantidade"])
            })

        # ✅ PASSO 5: VENDAS POR VENDEDOR
        por_vendedor = df.groupby("Vendedor").agg({
            "Valor": "sum"
        }).sort_values("Valor", ascending=False).reset_index()
        
        ranking_vendedores = []
        for _, linha in por_vendedor.iterrows():
            ranking_vendedores.append({
                "nome": linha["Vendedor"],
                "valor_total": round(linha["Valor"], 2)
            })

        # ✅ PASSO 6: VENDAS POR REGIÃO
        por_regiao = df.groupby("Regiao").agg({
            "Valor": "sum"
        }).reset_index()
        
        lista_regioes = []
        for _, linha in por_regiao.iterrows():
            lista_regioes.append({
                "regiao": linha["Regiao"],
                "valor_total": round(linha["Valor"], 2)
            })

        # ✅ PASSO 7: VENDAS POR MÊS
        df["Data"] = pd.to_datetime(df["Data"], errors="coerce")
        df["Mes"] = df["Data"].dt.strftime("%Y-%m")
        por_mes = df.groupby("Mes")["Valor"].sum().reset_index()
        
        lista_meses = []
        for _, linha in por_mes.iterrows():
            lista_meses.append({
                "mes": linha["Mes"],
                "valor_total": round(linha["Valor"], 2)
            })

        # ✅ PASSO 8: MONTAR RESULTADO FINAL
        resultado = {
            "sucesso": True,
            "resumo_geral": {
                "total_vendas": round(total_vendas, 2),
                "quantidade_total_produtos": int(quantidade_total),
                "ticket_medio": round(media_venda, 2)
            },
            "por_produto": lista_produtos,
            "ranking_vendedores": ranking_vendedores,
            "por_regiao": lista_regioes,
            "por_mes": lista_meses
        }

        return resultado

    except Exception as erro:
        return {
            "sucesso": False,
            "erro": f"Erro ao processar: {str(erro)}"
        }


# ✅ TESTE RÁPIDO (só executa se rodar esse arquivo direto)
if __name__ == "__main__":
    print("✅ Módulo de processamento carregado com sucesso!")
    print("👉 Esse arquivo é usado pelo app.py — não rode ele diretamente")