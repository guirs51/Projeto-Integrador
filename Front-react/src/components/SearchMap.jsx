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

        map.setView([lat, lon], 15);

    }

    return (
        <input id="search-input"
            type="text"
            placeholder="Buscar endereço..."
            value={text}
            onChange={handleSearch}
            style={{

            }}
        />
    );
}
