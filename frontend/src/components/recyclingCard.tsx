import { ArrowBigRight, MapPin, Search, Trash } from "lucide-react";
import React from "react";


// Tipagem das props
interface RecyclingCardProps {
  material: string;
  Peso: number | string;
  localizacao: string;
}

export default function RecyclingCard({
  material,
  Peso,
  localizacao
}: RecyclingCardProps) {
  return (
    <div className="recycling-card">
      <h3 className="text-blue-500 font-bold flex items-center gap-2 ">
        <Trash size={16}/>
        {material}</h3>
      <p className="flex items-center gap-2">
        <strong className="text-amber-400 flex items-center gap-2">
          <ArrowBigRight size={16}/>
          Peso:</strong> {Peso}
      </p>
      <p className="flex items-center gap-2">
        <strong className="flex items-center gap-2 text-[#91B338]">
          <MapPin size={16} />
          Localização:
        </strong>
        {localizacao}
      </p>

    </div>
  );
}
