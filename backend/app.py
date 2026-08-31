from flask import Flask, request, jsonify
from processa_dados import ler_e_processar_planilha
import os
from werkzeug.utils import secure_filename

aplicativo = Flask(__name__)

PASTA_UPLOADS = "uploads"
os.makedirs(PASTA_UPLOADS, exist_ok=True)
ARQUIVOS_PERMITIDOS = {"csv", "xlsx", "xls"}

def arquivo_permitido(nome_arquivo):
    return "." in nome_arquivo and nome_arquivo.rsplit(".", 1)[1].lower() in ARQUIVOS_PERMITIDOS

@aplicativo.route("/processar-planilha", methods=["POST"])
def receber_planilha():
    try:
        if "arquivo" not in request.files:
            return jsonify({
                "sucesso": False,
                "erro": "Nenhum arquivo foi enviado"
            }), 400

        arquivo = request.files["arquivo"]

        if arquivo.filename == "":
            return jsonify({
                "sucesso": False,
                "erro": "Nenhum arquivo selecionado"
            }), 400

        if arquivo and arquivo_permitido(arquivo.filename):
            nome_seguro = secure_filename(arquivo.filename)
            caminho_completo = os.path.join(PASTA_UPLOADS, nome_seguro)
            arquivo.save(caminho_completo)

            resultado = ler_e_processar_planilha(caminho_completo)

            try:
                os.remove(caminho_completo)
            except:
                pass

            return jsonify(resultado)

        else:
            return jsonify({
                "sucesso": False,
                "erro": "Formato não suportado. Envie .csv ou .xlsx"
            }), 400

    except Exception as erro:
        return jsonify({
            "sucesso": False,
            "erro": f"Erro no servidor: {str(erro)}"
        }), 500

@aplicativo.route("/")
def teste():
    return jsonify({
        "mensagem": "Backend funcionando",
        "endpoint_principal": "/processar-planilha",
        "status": "aguardando planilha..."
    })

if __name__ == "__main__":
    print("Iniciando o Backend...")
    print("Acesse: http://localhost:5000")
    print("Endereço para enviar planilha: http://localhost:5000/processar-planilha")
    aplicativo.run(debug=True, port=5000)