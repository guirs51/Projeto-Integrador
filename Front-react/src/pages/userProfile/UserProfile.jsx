import React, { useState } from "react";
import "./UserProfile.css";

// Components
import DataField from "../../components/DataField";
import DataPasswordField from "../../components/DataPasswordField";
import HistoricCard from "../../components/HistoricCard";
import EditProfileModal from "../../components/EditProfileModal";

// Data
import historyData from "./testHistorico.json";

// UI
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Edit } from "lucide-react";

export default function UserProfile() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
const [openEditModal, setOpenEditModal] = useState(false);

const [userData, setUserData] = useState({
  nome: "Fulano",
  sobrenome: "Silva",
  email: "fulano@email.com",
  bio: "Hi 👋, I'm Fulano, a passionate developer..."
});

  const history = historyData.Atividades;

  return (
    <div id="default" className={darkMode ? "dark" : ""}>

      {/* ================= HEADER + PROFILE ================= */}
      <section className="profile-card">
        
        <div className="profile-header">
          <img
            src="https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000"
            alt="Foto"
            className="profile-photo"
          />
        </div>

        <hr className="line" />

        {/* ================= PERSONAL INFO ================= */}
        <div className="section">
          <div className="section-title">
            <span>Informações pessoais</span>
            <button className="edit-btn"  onClick={() => setOpenEditModal(true)}>
              <Edit size={18} /> Editar
            </button>
          </div>

          <div className="info-grid">
            <DataField title="Nome" info="Fulano" />
            <DataField title="Sobrenome" info="Silva" />
            <DataField title="Email" info="fulano@email.com" />
            <DataPasswordField title="Senha" info="••••••••" />
          </div>
        </div>

        {/* ================= BIO ================= */}
        <div className="section">
          <div className="section-title">
            <span>Bio</span>
          </div>

          <p className="bio-text">
            Hi, I'm Fulano, a passionate developer focused on crafting great
            digital experiences...
          </p>
        </div>

        {/* ================= HISTORY ================= */}
        <div id="personal-info">
          <div id="info-header">
            <h2>Histórico</h2>
            <a id="more-info-btn" href='/recycling' >Mais Informações</a>
          </div>

          <hr id="line" />

          <div id="info-historic">
            {history.map((item, index) => (
              <HistoricCard
                key={index}
                historicTitle={item.Titulo}
                historicDate={item.Data}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ================= DELETE ACCOUNT ================= */}
      <div id="delete">
        <button id="delete-btn" onClick={() => setOpenSnackbar(true)}>
          Deletar conta
        </button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MuiAlert variant="filled" severity="success" sx={{ width: "100%" }}>
            Usuário foi deletado
          </MuiAlert>
        </Snackbar>

        {openEditModal && (
  <EditProfileModal
    onClose={() => setOpenEditModal(false)}
    userData={userData}
    onSave={(newData) => setUserData(newData)}
  />
)}

      </div>
    </div>
  );
}
