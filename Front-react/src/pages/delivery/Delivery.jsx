import React, { useEffect } from 'react'
import './Delivery.css'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function Delivery() {
    useEffect(() => {

        const container = L.DomUtil.get("map");
        if (container != null) {
            container._leaflet_id = null;
        }
        // 1. Cria o mapa
        const map = L.map("map",{
              center: [50, 10],
            dragging: true,
            scrollWheelZoom : true,
            doubleClickZoom:true,
            boxZoom:true,

        }).setView([0, 0], 2); 

        map.dragging.enable()
        

        // 2. Adiciona os tiles do OpenStreetMap
        L.tileLayer("https\://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19, // Define o zoom máximo que o usuário pode dar.

            attribution: '© OpenStreetMap contribuidores' // É o texto de créditos mostrado no canto do mapa. Por licença, você deve dar crédito ao OSM (e a outros provedores, se usar).
            
        }).addTo(map); // Adiciona essa camada de tiles no mapa que você criou. Sem essa parte, o mapa fica em branco.

        // 3. Verifica se o navegador suporta Geolocation
        if (navigator.geolocation) { // Verifica se o navegador suporta Geolocation API. Nem todos os navegadores antigos suportam.
            navigator.geolocation.getCurrentPosition(async position => { // Pede ao navegador a localização atual do usuário. success → função executada se obtida; error → se houver problema.


                const lat = position.coords.latitude; // Extrai a latitude da posição do usuário.
                const lon = position.coords.longitude; // Extrai a longitude da posição do usuário.

                map.setView([lat, lon], 15); // Centraliza o mapa na posição do usuário. 15 é o nível de zoom, mostrando a cidade ou bairro aproximado.

                let marker = L.marker([lat, lon]).addTo(map) // Cria um marcador no mapa na posição do usuário.
                    .bindPopup("📍 Você está aqui!").openPopup(); // Adiciona um balão de texto ao marcador e abre imediatamente.


                // 4. Busca locais próximos (exemplo: restaurantes em até 1000m)
                const query = `[out:json];node["amenity"="townhall"](around:50000,${lat},${lon});out;`; // Monta a query da Overpass API para buscar restaurantes em um raio de 1000 metros da localização do usuário.
                const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`; // Codifica a query e cria a URL completa da requisição.
                /*
                encodeURIComponent() é uma função do JavaScript que transforma uma string em um formato seguro para URLs. URLs não podem ter certos caracteres como espaços, acentos, #, &, ?, + etc. Ele substitui esses caracteres por códigos que a URL entende.
                */
                try {
                    const response = await fetch(url); // Faz a requisição assíncrona à Overpass API.
                    const data = await response.json(); // Converte de JSON (string) para objeto JavaScript

                    data.elements.forEach(element => { // Para cada ponto retornado pela API ("ponto” é basicamente um lugar específico no mapa)
                        const nome = element.tags.name || "prefeitura"; // Pega o nome do ponto ou usa 'Restaurante' se não houver.
                        const coords = [element.lat, element.lon]; // Pega as coordenadas do ponto.

                        let markerLocals = L.marker(coords).addTo(map) // Adiciona um marcador no mapa.
                            .bindPopup(`🏛 ${nome}`); // Adiciona um popup com o nome do restaurante.
                        markerLocals.on('click', onclick)
                    });
                } catch (err) {
                    console.error("Erro ao buscar dados da Overpass API", err); // Captura e mostra erros da API.
                }


            }, () => {
                alert("Não foi possível obter sua localização."); // Função de erro da Geolocation API.
            });
        } else {
            alert("Geolocalização não é suportada."); // Caso o navegador não suporte Geolocation.
        }

    }, []);

    function onclick(e) {
        let popup = e.target.getPopup();
        let content = popup.getContent();
        let input = document.getElementsByClassName("delivery-Local")

        for (let i = 0; i < input.length; i++) {
            input[i].placeholder = content;

        }

    }


    return (
        <>
            <section id='delivery-container'>
                
                <div id='map'></div>
                <h1>Insira as informações da sua entrega</h1>

                <div id='address-local'>
                    <form action="">

                        <div id='one-choose'>
                            <h2>Local de coleta</h2>
                            <input type="text" name="" className="delivery-Local" placeholder='Delivery local' disabled required />
                        </div>

                        <div id='two-choose'>
                            <h2>Tipo de material</h2>
                            <select id="trash-type" name="trash" required>
                                <option className='dropdown-list' value="paper">Papel</option>
                                <option className='dropdown-list'  value="glass">Vidro</option>
                                <option className='dropdown-list'  value="plastic">Plástico</option>
                                <option className='dropdown-list'  value="metal">Metal</option>
                            </select>
                        </div>

                        <div id='three-choose'>
                            <h2>Data da Entrega</h2>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker/>
                            </LocalizationProvider>

                        </div>


                        <button type="submit">Reservar</button>
                    </form>
                </div>

            </section>




        </>
    )
}

export default Delivery