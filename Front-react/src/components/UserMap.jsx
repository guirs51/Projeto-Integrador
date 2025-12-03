import React, { useEffect } from 'react'
import "leaflet/dist/leaflet.css";
import "../components/UserMap.css"
import L from "leaflet";

export default function UserMap() {

    useEffect(() => {
        const container = L.DomUtil.get("map");
        if (container != null) container._leaflet_id = null;

        const map = L.map("map").setView([0, 0], 2);

        L.tileLayer(
            'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}?api_key=57544848-9855-440b-92b6-a416e1141fd2',
            {
                maxZoom: 20,
                ext: 'jpg'
            }
        ).addTo(map);

        const searchInput = document.getElementById("search");
        let lastSearchMarker = null;

        async function geocode(query) {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
            const response = await fetch(url);
            return await response.json();
        }

        searchInput.addEventListener("input", async () => {
            const text = searchInput.value.trim();
            if (text.length < 3) return;

            const results = await geocode(text);
            if (results.length === 0) return;

            const r = results[0];
            const lat = parseFloat(r.lat);
            const lon = parseFloat(r.lon);

            map.setView([lat, lon], 15);

            if (lastSearchMarker) map.removeLayer(lastSearchMarker);

            lastSearchMarker = L.marker([lat, lon])
                .addTo(map)
                .bindPopup(r.display_name)
                .openPopup();
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup("📍 Você está aqui!")
                    .openPopup();

                const query = `[out:json];node["amenity"="townhall"](around:50000,${lat},${lon});out;`;
                const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    data.elements.forEach(element => {
                        const nome = element.tags.name || "Prefeitura";
                        const coords = [element.lat, element.lon];

                        let markerLocals = L.marker(coords).addTo(map)
                            .bindPopup(`🏛 ${nome}`);

                        markerLocals.on('click', (e) => {
                            const content = e.target.getPopup().getContent();
                            const inputs = document.getElementsByClassName("delivery-local");
                            for (let i = 0; i < inputs.length; i++) {
                                inputs[i].placeholder = content;
                            }
                        });
                    });

                } catch (err) {
                    console.error("Erro ao buscar prefeituras", err);
                }

            }, () => {
                alert("Não foi possível obter sua localização.");
            });
        }

        return () => map.remove();

    }, []);

    return (
        <>
            <section id='map-container'>
                <input type="text" id='search' placeholder='Buscar endereço...' />
                <div id='map'></div>
            </section>
        </>
    )
}
