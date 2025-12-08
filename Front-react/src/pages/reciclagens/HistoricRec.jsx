import React from "react";
import HistoricCard from "../../components/HistoricCard";
import "./HistoricRec.css";

export default function HistoricRec() {
  // No futuro você pode substituir isso por dados vindos da API
  const history = [
    { Titulo: "Reciclagem de Plástico", Data: "2025-01-03" },
    { Titulo: "Reciclagem de Papel", Data: "2025-01-05" },
    { Titulo: "Entrega no Ponto Verde", Data: "2025-01-09" },
    { Titulo: "Reciclagem de Vidro", Data: "2025-01-12" },
  ];

  return (
    <section className="history-page-container">
      {/* ==== HEADER ==== */}
      <div className="history-page-header">
        <h2>Histórico de Reciclagens</h2>
      
      </div>

      <hr className="divider" />

      {/* ==== LIST ==== */}
      <div className="history-page-list">
        {history.length === 0 ? (
          <p className="empty">Nenhum histórico encontrado.</p>
        ) : (
          history.map((item, index) => (
            <HistoricCard
              key={index}
              historicTitle={item.Titulo}
              historicDate={item.Data}
            />
          ))
        )}
      </div>
    </section>
  );
}
