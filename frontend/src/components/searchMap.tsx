import { useState } from "react"
import { Input } from "@/components/ui/input"

interface SearchMapProps {
  mapRef: React.MutableRefObject<any>
}

export default function SearchMap({ mapRef }: SearchMapProps) {
  const [text, setText] = useState("")

  async function handleSearch(value: string) {
    setText(value)

    if (value.length < 3) return

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        value
      )}`

      const response = await fetch(url)
      const results = await response.json()

      if (!results.length) return

      const { lat, lon } = results[0]
      const map = mapRef.current

      if (!map) return

      map.setView([parseFloat(lat), parseFloat(lon)], 15)
    } catch (error) {
      console.error("Erro ao buscar localização:", error)
    }
  }

  return (
    <Input
      placeholder="Buscar endereço..."
      value={text}
      onChange={(e) => handleSearch(e.target.value)}
      className="
        pl-10 
        rounded-full 
        bg-background 
        text-foreground
        border-border
        focus-visible:ring-1
        focus-visible:ring-primary
      "
    />
  )
}
