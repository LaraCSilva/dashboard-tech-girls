from flask import Flask, request, jsonify
from processa_dados import ler_e_processar_planilha
import os
from werkzeug.utils import secure_filename

# ✅ CRIAR O SERVIDOR
app = Flask(__name__)

# ✅ CONFIGURAÇÕES
PASTA_UPLOADS = "uploads"
os.makedirs(PASTA_UPLOADS, exist_ok=True)
ARQUIVOS_PERMITIDOS = {"csv", "xlsx", "xls"}

def arquivo_permitido(nome_arquivo):
    return "." in nome_arquivo and nome_arquivo.rsplit(".", 1)[1].lower() in ARQUIVOS_PERMITIDOS

# ✅ ENDPOINT PRINCIPAL — O SITE CHAMA ESSE ENDEREÇO
@app.route("/processar-planilha", methods=["POST"])
def receber_planilha():
    """
    É aqui que o site vai enviar a planilha!
    Ele envia o arquivo → essa função recebe → manda processar → devolve os resultados
    """
    try:
        # 1. Verificar se veio algum arquivo
        if "arquivo" not in request.files:
            return jsonify({
                "sucesso": False,
                "erro": "Nenhum arquivo foi enviado"
            }), 400

        arquivo = request.files["arquivo"]

        # 2. Verificar se o arquivo tem nome
        if arquivo.filename == "":
            return jsonify({
                "sucesso": False,
                "erro": "Nenhum arquivo selecionado"
            }), 400

        # 3. Verificar formato e salvar temporariamente
        if arquivo and arquivo_permitido(arquivo.filename):
            nome_seguro = secure_filename(arquivo.filename)
            caminho_completo = os.path.join(PASTA_UPLOADS, nome_seguro)
            arquivo.save(caminho_completo)

            # 4. PROCESSAR A PLANILHA (chama o outro arquivo!)
            resultado = ler_e_processar_planilha(caminho_completo)

            # 5. Apagar o arquivo temporário (não precisa mais)
            try:
                os.remove(caminho_completo)
            except:
                pass

            # 6. Devolver o resultado pro site
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


# ✅ PÁGINA DE TESTE — pra ver se o backend está rodando
@app.route("/")
def teste():
    return jsonify({
        "mensagem": "✅ Backend funcionando perfeitamente!",
        "endpoint_principal": "/processar-planilha",
        "status": "aguardando planilha..."
    })


# ✅ LIGAR O SERVIDOR
if __name__ == "__main__":
    print("🚀 Iniciando o Backend...")
    print("📍 Acesse: http://localhost:5000")
    print("📤 Endereço para enviar planilha: http://localhost:5000/processar-planilha")
    app.run(debug=True, port=5000)