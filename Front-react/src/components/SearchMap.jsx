import { useState } from "react";
import L from "leaflet";
import './SearchMap.css'



export default function SearchInput({ mapRef }) {
    const [text, setText] = useState("");

    async function handleSearch(e) {
        const query = e.target.value;
        setText(query);

        if (query.length < 3) return;

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const results = await response.json();

        if (!results.length) return;

        const r = results[0];
        const lat = parseFloat(r.lat);
        const lon = parseFloat(r.lon);

        const map = mapRef.current;

        if (!map) return;

        // move o mapa
        map.setView([lat, lon], 15);

        // adiciona marker
        L.marker([lat, lon])
            .addTo(map)
            .bindPopup(r.display_name)
            .openPopup();
    }

    return (
        <input
            type="text"
            placeholder="Buscar endereço..."
            value={text}
            onChange={handleSearch}
            style={{
                zIndex: 9999,
                backgroundColor:"transparent",
                padding: 10,
                background: "transparent",
                border: "0",
                outline: "none"
            }}
        />
    );
}
