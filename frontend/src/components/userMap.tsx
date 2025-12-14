import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface UserMapProps {
  mapRef: React.MutableRefObject<L.Map | null>
}

export default function UserMap({ mapRef }: UserMapProps) {
  useEffect(() => {
    const container = L.DomUtil.get("map")
    if (container != null) {
      // evita erro ao recarregar componente
      ;(container as any)._leaflet_id = null
    }

    const map = L.map("map", {
      zoomControl: true,
    }).setView([0, 0], 2)

    mapRef.current = map

   L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg?api_key=57544848-9855-440b-92b6-a416e1141fd2",
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

            L.marker(coords)
              .addTo(map)
              .bindPopup(`🏛 ${nome}`)
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
  }, [mapRef])

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
