import "./EditProfileModal.css";
import { X } from "lucide-react";
import { useState } from "react";

export default function EditProfileModal({ onClose, userData, onSave }) {

  const [formName, setFormName] = useState(userData.name);
  const [formEmail, setFormEmail] = useState(userData.email);
  const [formCpf, setFormCpf] = useState(userData.cpf);

  const buildUpdateUser = () => {
    const playload = {}

    if (formName.trim() !== "" && formName.trim() !== userData.name) {
      playload.name = formName
    }

    if (formEmail.trim() !== "" && formEmail.trim() !== userData.email) {
      playload.email = formEmail
    }

    if (formCpf.trim() !== "" && formCpf.trim() !== userData.cpf) {
      playload.cpf = formCpf
    }

    return playload;
  }

  const update = buildUpdateUser()

  const handleSubmit = async () => {
    try {
      onSave(update)
      onClose()
    } catch (e) {
      console.log(e)
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2>Editar Perfil</h2>

        <form className="modal-form">
          <label>
            Nome:
            <input
              name="name"
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </label>

          <label>
            CPF:
            <input

              type="text"
              name="cpf"
              value={formCpf}
              onChange={(e) => setFormCpf(e.target.value)}
            />
          </label>

          <label>
            Email:
            <input
              name="email"
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </label>

          <label>
            Bio:
            <textarea
              name="bio"
              type="text"
              rows={4}
              value={"oi"}
              onChange={(e) => console.log(e)}
            />
          </label>

          <button className="save-btn" type="button" onClick={handleSubmit}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
