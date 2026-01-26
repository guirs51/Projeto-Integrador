/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react"

import L, { marker } from "leaflet"
import "leaflet/dist/leaflet.css"
import { useLocation } from "@/context/locationContext"


interface UserMapProps {
  mapRef: React.MutableRefObject<L.Map | null>
}

export default function UserMap({ mapRef }: UserMapProps) {
  const { setLocation } = useLocation()
  const containerRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    if (!containerRef.current) return

    const map = L.map(containerRef.current, {
      zoomControl: true,
    }).setView([0, 0], 2)

    mapRef.current = map

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 8,
    }).addTo(map)

    let isMounted = true

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        if (isMounted || !mapRef.current) return

        const lat = pos.coords.latitude
        const lon = pos.coords.longitude

        map.setView([lat, lon], 15)

        L.marker([lat, lon])
          .addTo(map)
          .bindPopup("📍 Você está aqui!")
          .openPopup()


      try {
          const query = `
            [out:json];
            node["amenity"="townhall"](around:50000,${lat},${lon});
            out;
          `
          const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
          const response = await fetch(url)
          const data = await response.json()

          if (!isMounted || !mapRef.current) return

          data.elements.forEach((element: any) => {
            const nome = element.tags?.name || "Prefeitura"
            const coords: [number, number] = [element.lat, element.lon]

            const marker = L.marker(coords).addTo(map)

            marker.on("click", async () => {
              if (!mapRef.current) return

              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords[0]}&lon=${coords[1]}`
              )

              const geo = await response.json()
              const address = geo.display_name

              setLocation({
                lat: coords[0],
                lng: coords[1],
                address: `🏛 ${nome} - ${address}`,
              })

              marker.bindPopup("Localização selecionada").openPopup()
            })
          })
        } catch (err) {
          console.error(err)
        }
      })
    }
    return () =>{
      isMounted = false
      map.remove
      mapRef.current = null
    }
    },[setLocation,mapRef])


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