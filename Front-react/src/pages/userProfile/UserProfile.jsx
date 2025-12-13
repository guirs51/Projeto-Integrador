import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
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
import { Edit, User } from "lucide-react";
import { data, Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
// import { Home, Inbox, BookOpen, CheckSquare, Users, Settings, LogOut, Sun, Moon, Edit } from 'lucide-react';
// import { useLocation } from "react-router";

export default function UserProfile() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [user, setuser] = useState(null
  /*{
  nome: "Fulano",
  sobrenome: "Silva",
  email: "fulano@email.com",
  bio: "Hi, I'm Fulano, a passionate developer..."
} */);

  const navigate = useNavigate();
  const { userId } = useAuth()
  const token = localStorage.getItem("token")

  // async function deleteUser(id) {
  //   try {
  //     const response = await fetch(`http://localhost:3000/users/${id}`, {
  //       method: "Delete",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token
  //       }
  //     })

  //     const data = await response.json();

  //     if (!response.ok) {
  //       alert("Erro ao deletar usuario " + response.status + " ", data.mensagem)
  //       return;
  //     }
  //     localStorage.removeItem("token")
  //     localStorage.removeItem("id")


  //     setOpenSnackbar(true)

  //     setTimeout(() => {
  //       navigate("/regis")
  //     }, 1200);


  //   } catch (error) {
  //     console.error("Erro de rede: " + error);

  //   }
  // }

  // useEffect(() => {
  //   async function updateUser() {
  //     try {
  //       const response = await fetch(`http://localhost:3000/users/update/${userId}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": "Bearer " + token
  //         },
  //         body: JSON.stringify()
  //       })
  //     } catch (e) {

  //     }
  //   }
  // })

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        })

        const data = await response.json();

        if (!response.ok) {
          alert("Erro ao buscar dados do usuário: " + response.status + " " + data.mensagem);
          return
        }

        setuser(data)
      } catch (error) {
        console.error("Erro de rede: " + error);

      }
    }

    if (userId && token) {
      getUser()
    }
  }, [userId, token])

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
            <button className="edit-btn" onClick={() => setOpenEditModal(true)}>
              <Edit size={18} /> Editar
            </button>
          </div>

          <div className="info-grid">
            <DataField title="Nome" info={user?.name || ""} />
            <DataField title="CPF" info={user?.cpf || ""} />
            <DataField title="Email" info={user?.email || ""} />
            <DataPasswordField title="Senha" info={user?.senha || "••••••••"} />
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
        {/* <div id="personal-info">
          <div id="info-header">
            <h2>Histórico</h2>
            <a id="more-info-btn" href='/recycling' >Mais Informações</a>
          </div>

          <hr className="line" />

          {/* <div id="info-historic">
            {history.map((item, index) => (
              <HistoricCard
                key={index}
                historicTitle={item.Titulo}
                historicDate={item.Data}
              />
            ))}
          </div> 
        </div> */}
      </section>


      {/* ================= DELETE ACCOUNT ================= */}
      <div id="delete">
        <button id="delete-btn" onClick={() => deleteUser(user.id)}>
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
            userData={user}
            onSave={(newData) => setuser(newData)}
          />
        )}

      </div>
    </div>
  );
}
