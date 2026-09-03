import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowRight, FileSpreadsheet } from "lucide-react";
import StepIndicator from "./StepIndicator";
import "./UploadPage.css";
import { adaptarDadosBackend } from "../utils/adaptarDados";

export default function UploadPage() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState(null);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const [erro, setErro] = useState(null);
  const [dadosProcessados, setDadosProcessados] = useState(null);

  const enviarArquivo = useCallback(async (file) => {
    setFileName(file.name);
    setProgress(30);
    setErro(null);

    const dadosForm = new FormData();
    dadosForm.append("arquivo", file);

    try {
      const resposta = await fetch("http://localhost:5000/processar-planilha", {
        method: "POST",
        body: dadosForm,
      });

      const dados = await resposta.json();

      if (!resposta.ok || !dados.sucesso) {
        setErro(dados.erro || "Não foi possível processar a planilha.");
        setProgress(0);
        return;
      }

      setProgress(100);
      const dadosAdaptados = adaptarDadosBackend(dados);
      setDadosProcessados(dadosAdaptados);
    } catch (e) {
      setErro("Não foi possível conectar ao servidor. O backend está rodando?");
      setProgress(0);
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) enviarArquivo(file);
  };

  return (
    <div className="upload-page">
      <StepIndicator current={fileName ? (progress === 100 ? 3 : 2) : 1} />

      <p className="upload-eyebrow">Novo relatório</p>
      <h1 className="upload-title">
        Envie sua planilha de vendas e deixe a automação trabalhar
      </h1>
      <p className="upload-subtitle">
        Arraste o arquivo com os dados de vendas — vendedor, região, produto e
        valores — e o sistema lê, calcula e monta o dashboard sozinho.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`dropzone ${dragOver ? "dropzone-active" : ""}`}
      >
        <div className="drop-ring">
          <Upload className="drop-icon" strokeWidth={1.8} />
        </div>
        <strong className="drop-title">Arraste sua planilha aqui</strong>
        <span className="drop-hint">ou clique para selecionar um arquivo do computador</span>
        <button className="browse-btn" onClick={() => inputRef.current.click()}>
          Selecionar arquivo
        </button>
        <input
          type="file"
          ref={inputRef}
          accept=".csv,.xlsx,.xls"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) enviarArquivo(file);
          }}
        />

        <div className="filetypes">
          {["XLSX", "CSV", "PDF"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {erro && (
        <div className="file-card" style={{ borderColor: "#e11d48" }}>
          <span style={{ color: "#e11d48" }}>⚠ {erro}</span>
        </div>
      )}

      {fileName && (
        <div className="file-card">
          <div className="file-icon">
            <FileSpreadsheet size={16} />
          </div>
          <div className="file-meta">
            <div className="file-name">{fileName}</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="file-status">
            {progress < 100 ? `Lendo linhas · ${progress}%` : "Concluído"}
          </div>
        </div>
      )}

      {fileName && progress === 100 && (
        <button className="continue-link" onClick={() => navigate("/dashboard", { state: { dadosDashboard: dadosProcessados } })}>
          Ver dashboard gerado
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
