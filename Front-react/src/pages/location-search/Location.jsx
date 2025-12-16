import { Search, X, Sun, Moon, Settings, Home, LogOut, Inbox, BookOpen, CheckSquare, Users } from "lucide-react";
import { useRef, useState } from "react";
import "./Location.css";
import SearchMap from "../../components/SearchMap";


export default function Location() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  }
  const mapRef = useRef(null);


  return (
    <>

      <div className="layout " >

        

        <div className="content">
          <div className="location-page">
            <div className="location-card">

              {/* Barra de busca */}
              <div className="search-container">
                <div className="search-box">
                  <Search className="search-icon" size={18} />

                  {/* <input
                    type="text"
                    placeholder="Buscar localização..."
                    className="search-input"
                  /> */}

                  <SearchMap mapRef={mapRef} />

                 { /*  <button className="clear-btn" onClick={() =>{ }}>
                    <X size={16} />
                  </button>*/ }
                </div>
              </div>

              {/* Área do mapa */}
              <div className="map-placeholder">
                <UserMap mapRef={mapRef} />
              </div>

            </div>
          </div>
        </div>

      </div>

    </>
  );
}
