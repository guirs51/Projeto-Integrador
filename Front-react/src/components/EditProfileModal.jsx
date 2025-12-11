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
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </label>

          <label>
            CPF:
            <input

            type="text"
              name="cpf"
              value={form.cpf}
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
              type="text"
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
