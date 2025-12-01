import React, { useState } from "react";
import "./UserProfile.css";
import DataField from "../../components/DataField";
import DataPasswordField from "../../components/DataPasswordField";
import HistoricCard from "../../components/HistoricCard";
import jsonData from './testHistorico.json'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Home, Inbox, BookOpen, CheckSquare, Users, Settings, LogOut, Sun, Moon, Edit } from 'lucide-react';

export default function UserProfile() {

    const historic = jsonData["Atividades"];
    const [open, setOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    return (


        <div id="default" className={darkMode ? "dark" : ""}>

            <div className="sidebar-container">
                <aside className="sidebar">
                    <nav className="nav">
                        <a className="nav-item ">
                            <Home size={18} /> Home
                        </a>
                        <a className="nav-item">
                            <Inbox size={18} /> Bonificações
                        </a>

                        <a className="nav-item">
                            <BookOpen size={18} /> Materiais
                        </a>

                        <a className="nav-item ">
                            <CheckSquare size={18} /> Reciclagens
                        </a>

                        <a className="nav-item ">
                            <Users size={18} /> Localização
                        </a>

                    </nav>

                    <div className="bottom">
                        <div className="section-title">CONFIGURAÇÕES</div>
                        <a className="nav-item active">
                            <Settings size={18} /> Configurações
                        </a>
                        <a className="nav-item">
                            <LogOut size={18} /> Sair
                        </a>
                        <div className="darkmode-toggle" onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </div>
                    </div>

                </aside>
            </div>
           


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
                    <div className="but">  <button className="edit-btn"> <Edit fontSize={12} /> Editar  </button></div>   
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
                        Guilherme vai ser molestado
                    </MuiAlert>
                </Snackbar>

            </div>



        </div >

    );
}
