import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowRight, FileSpreadsheet } from "lucide-react";
import StepIndicator from "./StepIndicator";
import "./UploadPage.css";

export default function UploadPage() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState(null);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const startFakeUpload = useCallback((name) => {
    setFileName(name);
    setProgress(0);
    let p = 0;
    const timer = setInterval(() => {
      p += 14 + Math.random() * 10;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 220);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    startFakeUpload(file ? file.name : "planilha-de-vendas.xlsx");
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
        <button className="browse-btn" onClick={() => startFakeUpload("planilha-de-vendas.xlsx")}>
          Selecionar arquivo
        </button>
        <div className="filetypes">
          {["XLSX", "CSV", "PDF"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

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
        <button className="continue-link" onClick={() => navigate("/dashboard")}>
          Ver dashboard gerado
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
