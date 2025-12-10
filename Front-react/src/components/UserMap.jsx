import React, { useEffect } from 'react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function UserMap({ mapRef }) {

    useEffect(() => {
        const container = L.DomUtil.get("map");
        if (container != null) container._leaflet_id = null;

        const map = L.map("map").setView([0, 0], 2);
        mapRef.current = map; // <<====== SALVA O MAPA PARA OUTROS COMPONENTES

        L.tileLayer(
            'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}?api_key=57544848-9855-440b-92b6-a416e1141fd2',
            {
                maxZoom: 19,
                minZoom:8 ,
                ext: 'jpg'
            }
        ).addTo(map);

        // GEOLOCALIZAÇÃO + PREFEITURAS
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async pos => {

                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                map.setView([lat,lon],20)

                L.marker([lat, lon]).addTo(map)
                    .bindPopup("📍 Você está aqui!")
                    .openPopup();

                // BUSCAR PREFEITURAS
                const query = `[out:json];node["amenity"="townhall"](around:50000,${lat},${lon});out;`;
                const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

                const response = await fetch(url);
                const data = await response.json();

                data.elements.forEach(element => {
                    const nome = element.tags.name || "Prefeitura";
                    const coords = [element.lat, element.lon];

                    L.marker(coords)
                        .addTo(map)
                        .bindPopup(`🏛 ${nome}`);
                });

            });
        }

        return () => map.remove();
    }, []);

    return <div id="map" style={{ height: "60vh", width: "100%",borderRadius:"15px" }}></div>;
}
