import React, { useState, ChangeEvent, FormEvent } from 'react';
import './NewRecyclingModal.css';

interface RecyclingData {
  material: string;
  quantidade: string;
  localizacao: string;
}

interface NewRecyclingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RecyclingData) => void;
}

export default function NewRecyclingModal({
  isOpen,
  onClose,
  onSubmit
}: NewRecyclingModalProps) {
  const [formData, setFormData] = useState<RecyclingData>({
    material: '',
    quantidade: '',
    localizacao: ''
  });

  if (!isOpen) return null;

 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    } as RecyclingData)); 
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ material: '', quantidade: '', localizacao: '' });
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? "active" : ""}`} onClick={onClose} >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Registrar Nova Reciclagem</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Tipo de Material:
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="Ex: Plástico, Papel..."
              required
            />
          </label>

          <label>
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

          <label>
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

          <div className="modal-buttons">
            <button type="submit" className="save-btn">
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
