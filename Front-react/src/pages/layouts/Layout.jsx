import { BookOpen, CheckSquare, Home, Inbox, LogOut, Settings, Users, Sun, Moon } from "lucide-react"
import "../../global.css"
import "./layout.css"
import { Outlet, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useUser } from "../../context/UserContext"
import { useAuth } from "../../context/AuthContext"

export default function Layout() {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark");
    };

    const navigate = useNavigate();
    const { logout } = useAuth()


    return (
        <div className="w-full h-full flex" >
            <div className="sidebar-container">
                <aside className="sidebar">

                    <nav className="nav">
                        <a className="nav-item active" onClick={() => navigate("/UserHome")}>
                            <Home size={18} /> Home
                        </a>

                        <a className="nav-item" href="/bonifications">
                            <Inbox size={18} /> Bonificações
                        </a>

                        <a className="nav-item" href="/materials">
                            <BookOpen size={18} /> Materiais
                        </a>

                        <a className="nav-item" href="/recycling">
                            <CheckSquare size={18} /> Reciclagens
                        </a>

                        <a className="nav-item" href="/location">
                            <Users size={18} /> Localização
                        </a>
                    </nav>

                    <div className="bottom">
                        <div className="section-title">CONFIGURAÇÕES</div>

                        <a className="nav-item" onClick={() => navigate("/userConfig")}>
                            <Settings size={18} /> Configurações
                        </a>

                        <a className="nav-item logout" onChange={logout} onClick={() => navigate("/login")}>
                            <LogOut size={18} /> Sair
                        </a>

                        <div className="darkmode-toggle" onClick={toggleDarkMode}>
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </div>
                    </div>
                </aside>
            </div>

            <main className="w-full min-h-screen">
                <Outlet /> {/* Aqui renderiza as páginas filhas */}
            </main>
        </div>
    );
}