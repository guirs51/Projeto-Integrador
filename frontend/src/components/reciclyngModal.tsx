import React, { useState } from "react";


// Tipagem dos dados enviados pelo formulário
export interface RecyclingFormData {
    deliveryLocal(deliveryLocal: any, material: string, arg2: number): unknown;
    material: string;
    quantidade: number;
    localizacao: string;
}

// Tipagem das props recebidas pelo componente
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

    const [formData, setFormData] = useState({
        material: "",
        quantidade: "",
        localizacao: ""
    });

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Converter quantidade para número corretamente
        onSubmit({
            material: formData.material,
            quantidade: Number(formData.quantidade),
            localizacao: formData.localizacao
        });

        // Limpar campos
        setFormData({ material: "", quantidade: "", localizacao: "" });

        onClose();
    };

    return (
        <div className={`fixed inset-0 bg-black/55 flex items-center justify-center z-[1000] backdrop-blur-sm outline-none ${isOpen ? "active" : ""}`} onClick={onClose}>
            <div className=" w-full max-w-[500px] p-8 rounded-xl shadow-xl
  bg-white dark:bg-[#1b1b1b]
  border border-transparent dark:border-[#2e2e2e]
  transition-colors" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center mb-5 text-[#222] dark:text-white">Registrar Nova Reciclagem</h2>

                <form onSubmit={handleSubmit} className="flex flex-col mb-4 font-medium text-[#333] dark:text-[#ddd]">

                    <label className="flex flex-col mb-4 font-medium text-[#333] dark:text-[#ddd]">
                        Tipo de Material:
                        <input className="border-0 border-b border-[#ccc] dark:border-[#555]
                             bg-transparent outline-none py-2 text-[15px]
    text-[#333] dark:text-[#e5e5e5]
    focus:border-[#2b8842] dark:focus:border-indigo-400"
                            type="text"
                            name="material"
                            value={formData.material}
                            onChange={handleChange}
                            placeholder="Ex: Plástico, Papel..."
                            required
                        />
                    </label>

                    <label className="flex flex-col mb-4 font-medium text-[#333] dark:text-[#ddd]">
                        Quantidade:
                        <input
                            type="number"
                            name="quantidade"
                            value={formData.quantidade}
                            onChange={handleChange}
                            placeholder="Ex: 2"
                            required
                        />
                    </label>

                    <label className="flex flex-col mb-4 font-medium text-[#333] dark:text-[#ddd]">
                        Localização:
                        <input
                            type="text"
                            name="localizacao"
                            value={formData.localizacao}
                            onChange={handleChange}
                            placeholder="Ex: Rua das Flores, 123"
                            required
                        />
                    </label>

                    <div className="flex justify-between mt-6">
                        <button type="submit" className=" px-5 py-2.5 rounded-lg text-white cursor-pointer transition
    bg-green-400 hover:bg-green-600
    dark:bg-green-500 dark:hover:bg-green-700">
                            Salvar
                        </button>

                        <button type="button" className=" px-5 py-2.5 rounded-lg text-white cursor-pointer transition
    bg-red-500 hover:bg-red-600
    dark:bg-red-600 dark:hover:bg-red-700" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
