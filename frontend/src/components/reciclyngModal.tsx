import { useLocation } from "@/context/locationContext";
import React, { useEffect, useState } from "react";

 export interface RecyclingFormData {
  material: string;
  quantidade: number;
  localizacao: string;
}

interface Material {
  id: number;
  name: string;
  importance: number;
  points: number;
}

interface NewRecyclingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RecyclingFormData) => void;
}

export default function ReciclyngModal({
  isOpen,
  onClose,
  onSubmit
}: NewRecyclingModalProps) {

  const [formData, setFormData] = useState<RecyclingFormData>({
    material: "",
    quantidade: 0,
    localizacao: ""
  });

  const [materials, setMaterials] = useState<Material[]>([]);


  useEffect(() => {
    const getMaterial = async () => {
      try {
        const response = await fetch("http://localhost:3000/material/", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
          alert("Houve um erro ao buscar materiais");
          return;
        }

        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error(error);
      }
    };

    getMaterial();
  }, []);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "quantidade" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      material: "",
      quantidade: 0,
      localizacao: ""
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/55 flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[500px] p-8 rounded-xl shadow-xl
        bg-white dark:bg-[#1b1b1b]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center mb-5 dark:text-white">
          Registrar Nova Reciclagem
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">

          <label className="flex flex-col mb-6 text-[#ddd]">
            Tipo de Material:
            <select
              value={formData.material}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  material: e.target.value
                }))
              }
              required
              className="
                border-0 border-b border-[#444]
                bg-transparent outline-none py-2
                text-[15px] text-[#e5e5e5]
                focus:border-[#2b8842]
                appearance-none
              "
            >
              <option value="" disabled hidden>
                Selecione o material
              </option>

              {materials.map((item) => (
                <option
                  key={item.id}
                  value={item.name}
                  className="bg-black text-white"
                >
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col mb-4 dark:text-[#ddd]">
            Peso:
            <input
              type="text"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleInputChange}
              required
              className="bg-transparent border-b outline-none py-2"
            />
          </label>

          <label className="flex flex-col mb-4 dark:text-[#ddd]">
            Localização:
            <input
              type="text"
              name="localizacao"

              value={formData.localizacao}
              onChange={handleInputChange}
              required
              className="bg-transparent border-b outline-none py-2"
            />
          </label>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-white
              bg-green-500 hover:bg-green-700"
            >
              Salvar
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-white
              bg-red-500 hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}