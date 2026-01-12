/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react"
import L, { marker } from "leaflet"
import "leaflet/dist/leaflet.css"
import { useLocation } from "@/context/locationContext"

interface UserMapProps {
  mapRef: React.MutableRefObject<L.Map | null>
}

export default function UserMap({ mapRef }: UserMapProps) {
  const { setLocation } = useLocation()



  useEffect(() => {
    const container = L.DomUtil.get("map")

    if (container != null) {
      // evita erro ao recarregar componente
      ; (container as any)._leaflet_id = null
    }

    const map = L.map("map", {
      zoomControl: true,
    }).setView([0, 0], 2)

    mapRef.current = map

    L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        minZoom: 8,
      }
    ).addTo(map)




    // 🌍 GEOLOCALIZAÇÃO
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude

        const icons = {
          prefeitura: new L.Icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/1666/1666066.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: undefined
          }),
        }

        map.setView([lat, lon], 15)

        L.marker([lat, lon])
          .addTo(map)
          .bindPopup("📍 Você está aqui!")
          .openPopup()

        // 🏛 PREFEITURAS (Overpass API)
        try {
          const query = `
            [out:json];
            node["amenity"="townhall"](around:50000,${lat},${lon});
            out;
          `
          const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
            query
          )}`

          const response = await fetch(url)
          const data = await response.json()

          data.elements.forEach((element: any) => {
            const nome = element.tags?.name || "Prefeitura"
            const coords: [number, number] = [element.lat, element.lon]



            const marker = L.marker(coords, { icon: icons.prefeitura })
              .addTo(map)
              .bindPopup(`🏛 ${nome}`)

            marker.on("click", async () => {
              try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords[0]}&lon=${coords[1]}`)

                const geo = await response.json()

                const address = geo.display_name || `${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`

                setLocation({
                  lat: coords[0],
                  lng: coords[1],
                  address: `🏛 ${nome} - ${address}`
                })

                console.log("🗺️ MAPA setLocation:", {
                  lat: coords[0],
                  lng: coords[1],
                  address
                })
                marker.bindPopup(`localização selecionado com sucesso`).openPopup()
              } catch (error) {
                console.error("Erro ao buscar endereço:", error)

                setLocation({
                  lat: coords[0],
                  lng: coords[1],
                  address: `🏛 ${nome}`,
                })




              }
            })
          })
        } catch (error) {
          console.error("Erro ao buscar prefeituras:", error)
        }
      })
    }

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [mapRef, setLocation])



  return (
    <div
      id="map"
      className="
        w-full 
        h-[60vh] 
        rounded-2xl 
        border 
        border-border
        overflow-hidden
        shadow-sm
        bg-muted
      "
    />
  )
}
