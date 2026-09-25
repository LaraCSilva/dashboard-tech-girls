import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import Panel from "../components/Panel";
import { formatBRL } from "../utils/formatCurrency";
import { API_BASE } from "../utils/api";
import "./HistoryPage.css";

export default function HistoryPage() {
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let cancelado = false;

    fetch(`${API_BASE}/api/historico`)
      .then((res) => res.json())
      .then((dados) => {
        if (cancelado) return;
        setHistorico(Array.isArray(dados) ? dados : []);
      })
      .catch(() => {
        if (!cancelado) setErro("Não foi possível carregar o histórico. O backend está rodando?");
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <div>
      <div className="history-header">
        <div>
          <div className="history-crumbs">Relatórios · histórico de envios</div>
          <h2 className="history-title">Histórico</h2>
        </div>
      </div>

      <div className="history-body">
        <Panel title="Planilhas processadas" subtitle="Mais recentes primeiro">
          {carregando && <p className="history-state">Carregando histórico…</p>}

          {!carregando && erro && <p className="history-state history-state-error">{erro}</p>}

          {!carregando && !erro && historico.length === 0 && (
            <p className="history-state">Nenhuma planilha processada ainda.</p>
          )}

          {!carregando && !erro && historico.length > 0 && (
            <div className="history-table-wrap">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Arquivo</th>
                    <th>Data</th>
                    <th className="num">Total de vendas</th>
                    <th className="num">Receita líquida</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map((item, i) => (
                    <tr key={`${item.nome_arquivo}-${item.data}-${i}`}>
                      <td>
                        <span className="history-file">
                          <Clock size={14} className="history-file-icon" />
                          {item.nome_arquivo}
                        </span>
                      </td>
                      <td className="muted">{item.data}</td>
                      <td className="num">{item.total_vendas}</td>
                      <td className="num">{formatBRL(item.receita_liquida)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
