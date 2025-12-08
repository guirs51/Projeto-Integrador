import "./EditProfileModal.css";
import { X } from "lucide-react";
import { useState } from "react";

export default function EditProfileModal({ onClose, userData, onSave }) {

  const [form, setForm] = useState(userData);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2>Editar Perfil</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Nome:
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
            />
          </label>

          <label>
            Sobrenome:
            <input
              name="sobrenome"
              value={form.sobrenome}
              onChange={handleChange}
            />
          </label>

          <label>
            Email:
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Bio:
            <textarea
              name="bio"
              rows={4}
              value={form.bio}
              onChange={handleChange}
            />
          </label>

          <button className="save-btn" type="submit">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
