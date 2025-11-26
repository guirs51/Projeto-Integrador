import { Search, X, Sun, Moon, Settings, Home, LogOut, Inbox, BookOpen, CheckSquare, Users } from "lucide-react";
import { useState } from "react";

import "./Location.css";

export default function Location() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  }

  return (
    <>

      <div className="layout " >

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
              <div className="darkmode-toggle" onClick={toggleDarkMode}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}

              </div>

            </div>
          </aside>
        </div>

      <div className="content">
         <div className="location-page">
          <div className="location-card">

            {/* Barra de busca */}
            <div className="search-container">
              <div className="search-box">
                <Search className="search-icon" size={18} />

                <input
                  type="text"
                  placeholder="Buscar localização..."
                  className="search-input"
                />

                <button className="clear-btn">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Área do mapa */}
            <div className="map-placeholder">
              <p>Mapa aparecerá aqui...</p>
            </div>

          </div>
        </div>
      </div>
       
      </div>

    </>
  );
}
