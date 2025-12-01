import React, { useState } from "react";
import "./UserProfile.css";
import DataField from "../../components/DataField";
import DataPasswordField from "../../components/DataPasswordField";
import HistoricCard from "../../components/HistoricCard";
import jsonData from './testHistorico.json'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Home, Inbox, BookOpen, CheckSquare, Users, Settings, LogOut, Sun, Moon } from 'lucide-react';

export default function UserProfile() {

    const historic = jsonData["Atividades"];
    const [open, setOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    return (


        <div id="default" className={darkMode ? "dark" : ""}>

            <div className="sidebar-container">
                <aside className="sidebar">
                    <nav className="nav">
                        <a className="nav-tem ">
                            <Home size={18} /> Home
                        </a>
                        <a className="nav-tem">
                            <Inbox size={18} /> Bonificações
                        </a>

                        <a className="nav-tem">
                            <BookOpen size={18} /> Materiais
                        </a>

                        <a className="nav-tem ">
                            <CheckSquare size={18} /> Reciclagens
                        </a>

                        <a className="nav-tem ">
                            <Users size={18}/> Localização
                        </a>

                    </nav>

                    <div className="bottom">
                        <div className="section-title">CONFIGURAÇÕES</div>
                        <a className="nav-tem active">
                            <Settings size={18}/> Configurações
                        </a>
                         <a className="nav-tem">
                            <LogOut size={18}/> Sair
                         </a>
                         <div className="darkmode-toggle" onClick={() => setDarkMode(!darkMode)}>
    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
</div>
                    </div>

                </aside>
            </div>
 <div>Edit Profile</div>


            <section id="user-head">
               <button className="photo">
                    Up new photo
               </button>
                <img src="https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnRhJTIwdHJvcGljYWx8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" alt="" id="img" />
                <div className="bio">
                    <div id="bio-header">
                        <h1 className="big-text">Fulano de tal junior abate </h1>
                        <button id="bio-edit">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                                <path d="M5 21q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V10q-.825 0-1.562.2t-1.313.8L16 13.125V8H8v8l4-2l2.075 1.05L12 17.1V21zm9 0v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95zM5.4 6h13.2l-.85-1H6.25z" />
                            </svg>

                        </button>
                    </div>
                    <h2>Hi, my names is Fulana! im developer sistems and i have 18 years old.</h2>
                </div>

            </section>

            <section id="user-info">
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
