import { BookOpen, CheckSquare, Home, Inbox, LogOut, Settings, Users, Sun, Moon } from "lucide-react"
import "../../global.css"
import "./layout.css"
import { Outlet } from "react-router-dom"
import { useState } from "react"


export default function Layout() {
    const [darkMode, setDarkMode] = useState(false);


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark");
    }
    return (
        <div className="w-full h-full flex">
            <div className="sidebar-container">
                <aside className="sidebar">

                    <nav className="nav">
                        <a className="nav-item active">
                            <Home size={18} /> Home
                        </a>
                        <a className="nav-item">
                            <Inbox size={18} /> Bonificações
                        </a>
                        <a className="nav-item">
                            <BookOpen size={18} /> Materias
                        </a>
                        <a className="nav-item">
                            <CheckSquare size={18} /> Reciclagens
                        </a>
                        <a className="nav-item">
                            <Users size={18} /> Localização
                        </a>
                    </nav>

                    <div className="bottom">
                        <div className="section-title">CONFIGURAÇÕES</div>

                        <a className="nav-item">
                            <Settings size={18} /> Configurações
                        </a>

                        <a className="nav-item logout">
                            <LogOut size={18} /> Sair
                        </a>

                        <div className="darkmode-toggle" onClick={toggleDarkMode}> {darkMode ? <Sun size={18} /> : <Moon size={18} /> }</div>
                        <div />
                    </div>
                </aside>
            </div>


            <main className="w-full  min-h-screen">
                <Outlet /> {/* AQUI RENDERIZA AS PÁGINAS FILHAS */}
            </main>
        </div>
    )
}
