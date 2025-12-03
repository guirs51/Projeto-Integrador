import React, { useEffect } from 'react'
import "leaflet/dist/leaflet.css";
import "../user-map/UserMap.css"
import L from "leaflet";
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';


export default function UserMap() {

    useEffect(() => {
        const container = L.DomUtil.get("map");
        if (container != null) {
            container._leaflet_id = null
        }

        const map = L.map("map", {
            center: [50, 10],
            dragging: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
        }).setView([0, 0], 2);

        map.dragging.enable();


        const Stadia_AlidadeSatellite = L.tileLayer(
            'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}?api_key=YOUR_KEY',
            {
                minZoom: 0,
                maxZoom: 20,
                ext: 'jpg',
                attribution: '57544848-9855-440b-92b6-a416e1141fd2'
            }
        ).addTo(map);


        L.Control.geocoder({
            defaultMarkGeocode: true,
            placeholder: 'Digite um endereço...',
            errorMessage: 'Local não encontrado!'
        }).addTo(map);


                if (L.control.coordinates) { // verifica se o plugin carregou
            L.control.coordinates({
                position: "bottomright", // posição no mapa
                decimals: 5,             // casas decimais
                decimalSeperator: ".",   // separador decimal
                labelTemplateLat: "Lat: {y}", 
                labelTemplateLng: "Lng: {x}"
            }).addTo(map);
        }

        // Geolocalização
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                map.setView([lat, lon], 15);

                let marker = L.marker([lat, lon]).addTo(map)
                    .bindPopup("📍 Você está aqui!").openPopup();

                // Exemplo de Overpass API
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

                        // Integração com input
                        markerLocals.on('click', (e) => {
                            const content = e.target.getPopup().getContent();
                            const inputs = document.getElementsByClassName("delivery-local");
                            for (let i = 0; i < inputs.length; i++) {
                                inputs[i].placeholder = content;
                            }
                        });
                    });
                } catch (err) {
                    console.error("Erro ao buscar dados da Overpass API", err);
                }

            }, () => {
                alert("Não foi possível obter sua localização.");
            });
        } else {
            alert("Geolocalização não é suportada.");
        }

    }, [])

    return (
        <>
            <div id='map' style={{ height: '100vh', width: '100%' }}></div>
            
        </>
    )
}
