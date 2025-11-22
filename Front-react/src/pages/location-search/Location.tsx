import { Search, X } from "lucide-react";
import "./Location.css";

export default function Location() {
  return (
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
  );
}
