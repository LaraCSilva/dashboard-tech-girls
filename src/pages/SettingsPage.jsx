import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import Panel from "../components/Panel";
import { API_BASE } from "../utils/api";
import "./SettingsPage.css";

const OPCOES = {
  formato_relatorio: ["PDF", "Excel", "CSV"],
  moeda: ["BRL", "USD", "EUR"],
};

const ROTULOS = {
  formato_relatorio: "Formato do relatório",
  moeda: "Moeda",
};

export default function SettingsPage() {
  const [config, setConfig] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    let cancelado = false;

    fetch(`${API_BASE}/api/configuracoes`)
      .then((res) => res.json())
      .then((dados) => {
        if (!cancelado) setConfig(dados);
      })
      .catch(() => {
        if (!cancelado) setErro("Não foi possível carregar as configurações. O backend está rodando?");
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const handleChange = (campo, valor) => {
    setConfig((atual) => ({ ...atual, [campo]: valor }));
    setSalvo(false);
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setSalvo(false);
    try {
      await fetch(`${API_BASE}/api/configuracoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      setSalvo(true);
    } catch {
      setErro("Não foi possível salvar as configurações.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div>
      <div className="settings-header">
        <div>
          <div className="settings-crumbs">Conta · preferências do app</div>
          <h2 className="settings-title">Configurações</h2>
        </div>
      </div>

      <div className="settings-body">
        <Panel title="Preferências" subtitle="Como os relatórios são gerados">
          {carregando && <p className="settings-state">Carregando configurações…</p>}

          {!carregando && erro && <p className="settings-state settings-state-error">{erro}</p>}

          {!carregando && config && (
            <form className="settings-form" onSubmit={handleSalvar}>
              {Object.keys(ROTULOS).map((campo) => (
                <label className="settings-field" key={campo}>
                  <span className="settings-label">{ROTULOS[campo]}</span>
                  <select
                    className="settings-select"
                    value={config[campo] ?? ""}
                    onChange={(e) => handleChange(campo, e.target.value)}
                  >
                    {OPCOES[campo].map((opcao) => (
                      <option key={opcao} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </select>
                </label>
              ))}

              <div className="settings-actions">
                <button className="settings-save" type="submit" disabled={salvando}>
                  {salvando ? "Salvando…" : "Salvar alterações"}
                </button>
                {salvo && (
                  <span className="settings-saved">
                    <Check size={14} /> Salvo com sucesso
                  </span>
                )}
              </div>
            </form>
          )}
        </Panel>
      </div>
    </div>
  );
}
