from flask import Flask, request, jsonify
import pandas as pd
import os
import json
from datetime import datetime

aplicativo = Flask(__name__)


@aplicativo.route("/processar-planilha", methods=["POST"])
def processar_planilha():
    try:
        if "arquivo" not in request.files:
            return jsonify({"erro": "Nenhum arquivo enviado"}), 400

        arquivo = request.files["arquivo"]

        if arquivo.filename == "":
            return jsonify({"erro": "Nome do arquivo vazio"}), 400

        if not arquivo.filename.endswith((".xlsx", ".xls")):
            return jsonify({"erro": "Formato inválido. Use .xlsx ou .xls"}), 400

        caminho_salvo = os.path.join("uploads", arquivo.filename)
        os.makedirs("uploads", exist_ok=True)
        arquivo.save(caminho_salvo)

        df = pd.read_excel(caminho_salvo)

        colunas_necessarias = ["Data", "Vendedora", "Categoria", "Valor", "Desconto", "Região"]
        for col in colunas_necessarias:
            if col not in df.columns:
                return jsonify({"erro": f"Coluna obrigatória faltando: {col}"}), 400

        df["Valor"] = pd.to_numeric(df["Valor"], errors="coerce")
        df["Desconto"] = pd.to_numeric(df["Desconto"], errors="coerce").fillna(0)
        df["Valor_Liquido"] = df["Valor"] * (1 - df["Desconto"] / 100)
        df["Data"] = pd.to_datetime(df["Data"], errors="coerce")
        df = df.dropna(subset=["Data", "Valor"])

        total_vendas = int(len(df))
        receita_bruta = float(df["Valor"].sum())
        receita_liquida = float(df["Valor_Liquido"].sum())
        total_descontos = float((df["Valor"] - df["Valor_Liquido"]).sum())
        ticket_medio = float(receita_liquida / total_vendas) if total_vendas > 0 else 0

        df["Mes"] = df["Data"].dt.strftime("%b")
        receita_por_mes = df.groupby("Mes")["Valor_Liquido"].sum().round(2).to_dict()

        receita_por_categoria = df.groupby("Categoria")["Valor_Liquido"].sum().round(2).to_dict()
        participacao_categoria = {
            cat: round((valor / receita_liquida) * 100, 2) if receita_liquida > 0 else 0
            for cat, valor in receita_por_categoria.items()
        }

        ranking_vendedoras = df.groupby("Vendedora")["Valor_Liquido"].sum().round(2).sort_values(ascending=False).head(10).to_dict()
        receita_por_regiao = df.groupby("Região")["Valor_Liquido"].sum().round(2).to_dict()

        resultado = {
            "total_vendas": total_vendas,
            "receita_bruta": round(receita_bruta, 2),
            "receita_liquida": round(receita_liquida, 2),
            "total_descontos": round(total_descontos, 2),
            "ticket_medio": round(ticket_medio, 2),
            "receita_por_mes": receita_por_mes,
            "receita_por_categoria": receita_por_categoria,
            "participacao_categoria": participacao_categoria,
            "ranking_vendedoras": ranking_vendedoras,
            "receita_por_regiao": receita_por_regiao
        }

        return jsonify(resultado)

    except Exception as e:
        return jsonify({"erro": str(e)}), 500


@aplicativo.route("/api/historico", methods=["GET"])
def get_historico():
    try:
        historico = []
        if os.path.exists("historico.json"):
            with open("historico.json", "r", encoding="utf-8") as f:
                historico = json.load(f)
        return jsonify(historico)
    except Exception as e:
        return jsonify({"erro": str(e)}), 500


@aplicativo.route("/api/historico", methods=["POST"])
def salvar_no_historico():
    try:
        dados = request.json
        registro = {
            "data": datetime.now().strftime("%d/%m/%Y %H:%M"),
            "nome_arquivo": dados.get("nome_arquivo", "Sem nome"),
            "total_vendas": dados.get("total_vendas", 0),
            "receita_liquida": dados.get("receita_liquida", 0)
        }
        
        historico = []
        if os.path.exists("historico.json"):
            with open("historico.json", "r", encoding="utf-8") as f:
                historico = json.load(f)
        
        historico.insert(0, registro)
        
        with open("historico.json", "w", encoding="utf-8") as f:
            json.dump(historico, f, ensure_ascii=False, indent=2)
        
        return jsonify({"mensagem": "Salvo com sucesso!"})
    except Exception as e:
        return jsonify({"erro": str(e)}), 500


@aplicativo.route("/api/configuracoes", methods=["GET"])
def get_configuracoes():
    return jsonify({
        "formato_relatorio": "PDF",
        "idioma": "pt-BR",
        "moeda": "BRL",
        "tema": "escuro"
    })


@aplicativo.route("/api/configuracoes", methods=["POST"])
def set_configuracoes():
    return jsonify({"mensagem": "Configurações salvas!"})


if __name__ == "__main__":
    print("Iniciando o Backend...")
    print("Acesse: http://localhost:5000")
    print("Endereço para enviar planilha: http://localhost:5000/processar-planilha")
    aplicativo.run(debug=True, port=5000)