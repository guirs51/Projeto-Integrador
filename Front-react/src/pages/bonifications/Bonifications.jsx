import React from "react";
import { Gift, Zap, Droplet, Flame, Building2 } from "lucide-react";
import "./Bonifications.css";

export default function Bonifications() {
  const points = 65;
  const goal = 100;
  const progress = (points / goal) * 100;

  const benefits = [
    {
      icon: <Zap size={20} />,
      title: "Conta de Luz",
      discount: "5% - 25%",
      description: "Ganhe descontos ao completar metas mensais."
    },
    {
      icon: <Droplet size={20} />,
      title: "Conta de Água",
      discount: "5% - 20%",
      description: "Economize acumulando pontos recicláveis."
    },
    {
      icon: <Building2 size={20} />,
      title: "IPTU",
      discount: "3% - 15%",
      description: "Descontos progressivos com base em sustentabilidade."
    },
    {
      icon: <Flame size={20} />,
      title: "Gás",
      discount: "5% - 10%",
      description: "Ganhe bônus ao manter alta pontuação mensal."
    }
  ];

  return (
    <div className="bonus-container">
      <h1 className="bonus-title">
        <Gift size={28} /> Bonificações
      </h1>

      <div className="bonus-card">
        <h2 className="bonus-subtitle">Seu Progresso</h2>

        <div className="bonus-progress-info">
          <span>{points} pontos</span>
          <span>Meta: {goal}</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {progress >= 100 && (
          <p className="bonus-unlocked">🎉 Parabéns! Você desbloqueou descontos!</p>
        )}
      </div>

      <div className="bonus-grid">
        {benefits.map((item, index) => (
          <div key={index} className="benefit-card">
            <div className="benefit-header">
              {item.icon}
              <h3>{item.title}</h3>
            </div>

            <p><strong>Desconto disponível:</strong> {item.discount}</p>
            <p className="benefit-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
