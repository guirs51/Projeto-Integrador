import React, { useState } from 'react';
import './NewRecyclingModal.css';
import { Drama } from 'lucide-react';


// interface NewRecyclingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (local: string, materialType: string, quantidade: number) => void;
// }

export default function NewRecyclingModal({ isOpen, onClose, onSubmit }) {

  if (!isOpen) return null

  const [materialType, setMaterialType] = useState<string>('')
  const [local, setLocal] = useState<string>('')
  const [quantidade, setQuantidade] = useState<number>()

  const postDelivery = async () => {
    try {
      onSubmit(local, materialType, Number(quantidade))
      onClose()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={`modal-overlay ${isOpen ? "active" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Registrar Nova Reciclagem</h2>
        <form className="modal-form">
          <label>
            Tipo de Material:
            <input
              type="text"
              name="material"
              onChange={(e) => setMaterialType(e.target.value)}
              placeholder="Ex: Plástico, Papel..."
              required
            />
          </label>

          <label>
            Quantidade:
            <input
              type="number"
              name="quantidade"
              onChange={(e) => setQuantidade(Number(e.target.value))}
              placeholder="Ex: 2"
              required
            />
          </label>

          <label>
            Localização:
            <input
              type="text"
              name="localizacao"
              onChange={(e) => setLocal(e.target.value)}
              placeholder="Ex: Rua das Flores, 123"
              required
            />
          </label>

          <div className="modal-buttons">
            <button type="button" className="save-btn" onClick={postDelivery}>
              Salvar
            </button>

            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
