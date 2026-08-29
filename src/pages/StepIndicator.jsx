const STEPS = ["Enviar planilha", "Processamento", "Dashboard pronto"];

export default function StepIndicator({ current }) {
  return (
    <div className="steps">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const state = n < current ? "done" : n === current ? "current" : "todo";
        return (
          <div className="step-group" key={label}>
            <div className="step">
              <div className={`step-dot step-dot-${state}`}>{n}</div>
              <span className={`step-label step-label-${state}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
}
