import React from 'react';
import './RecyclingCard.css';

interface RecyclingCardProps {
  material: string;
  quantidade: string;
  localizacao: string;
}

export default function RecyclingCard({ material, quantidade, localizacao }: RecyclingCardProps) {
  return (
    <div className="recycling-card">
      <h3>{material}</h3>
      <p><strong>Quantidade:</strong> {quantidade} </p>
      <p><strong>Localização:</strong> {localizacao}</p>
    </div>
  );
}
