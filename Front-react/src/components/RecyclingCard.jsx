import React from 'react';
import './RecyclingCard.css';
import { Calculator } from 'lucide-react';



export default function RecyclingCard({ material, quantidade, localizacao, status }) {

  let classStatus = "status"
  if (status === "PENDING") {
    classStatus = "status pending"
  } else if (status === "accepted") {
    classStatus = "status accepted"
  } else if (status === "rejected") {
    classStatus = "status rejected"
  }

  return (
    <div className="recycling-card">
      <h3>{material}</h3>
      <p><strong>Quantidade:</strong> {quantidade} </p>
      <p><strong>Localização:</strong> {localizacao}</p>
      <p className={classStatus}>{status}</p>
    </div>
  );
}
