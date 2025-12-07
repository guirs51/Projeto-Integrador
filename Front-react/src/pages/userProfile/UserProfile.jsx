import React, { useState } from "react";
import "./UserProfile.css";
import DataField from "../../components/DataField";
import DataPasswordField from "../../components/DataPasswordField";
import HistoricCard from "../../components/HistoricCard";
import jsonData from './testHistorico.json'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Home, Inbox, BookOpen, CheckSquare, Users, Settings, LogOut, Sun, Moon, Edit } from 'lucide-react';
import { useLocation } from "react-router";

export default function UserProfile() {

    const historic = jsonData["Atividades"];
    const [open, setOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(false);
    return (


        <div id="default" className={darkMode ? "dark" : ""}>

            <section className="profile-card">

                <div className="profile-header">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000"
                        alt="Foto"
                        className="profile-photo"
                    />

                </div>

                <hr className="line" />

                <div className="section">
                    <div className="section-title">
                        <span>Informações pessoais</span>
                        <div className="but">  <button className="edit-btn"> <Edit fontSize={18} /> Editar  </button></div>
                    </div>

                    <div className="info-grid">
                        <DataField title={"Nome"} info={"Nome"} />
                        <DataField title={"Sobrenome"} info={"Sobrenome"} />
                        <DataField title={"Email"} info={"Email"} />
                        <DataPasswordField title={"Senha"} info={"Senha"} />
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">
                        <span>Bio</span>

                    </div>

                    <p className="bio-text">
                        Hi 👋, I'm Fulano, a passionate developer with experience in creating intuitive digital interfaces...
                    </p>
                </div>
                <div id="personal-info">

                    <div id="info-header">
                        <h2>Historico</h2>
                        <button id="more-info-btn">Mais Informações</button>
                    </div>

                    <hr id="line" />

                    <div id="info-historic">

                        {historic.map((item, index) => (
                            <HistoricCard
                                key={index}
                                historicTitle={item.Titulo}
                                historicDate={item.Data}
                            />
                        ))}

                    </div>
                </div>
            </section>


            <section id="user-info">
                {/*
                <div id="personal-info1">
                    <div id="info-header">
                        <h2>Informações</h2>
                        <button id="edit-btn">Editar</button>
                    </div>
                    <hr id="line" />
                    <div id="info-data">
                        <DataField title={"Nome"} info={"Nome"} />
                        <DataField title={"Sobrenome"} info={"Sobrenome"} />
                        <DataField title={"Email"} info={"Email"} />
                        <DataPasswordField title={"Senha"} info={"Senha"} />
                    </div>
                </div>
                
                */ }





            </section>

            <div id="delete">
                <button id="delete-btn" onClick={() => setOpen(true)}>
                    Deletar conta
                </button>


                <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={() => setOpen(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                >
                    <MuiAlert variant="filled" severity="success" sx={{ width: '100%' }}>
                        Usuario foi deletado
                    </MuiAlert>
                </Snackbar>

            </div>



        </div >

    );
}
