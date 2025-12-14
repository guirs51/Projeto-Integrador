import { Search, X, Sun, Moon } from "lucide-react"
import { useRef, useState, useEffect } from "react"

import SearchMap from "@/components/searchMap"
import UserMap from "@/components/userMap"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function Location() {
  const mapRef = useRef(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true"
    setDarkMode(saved)
    document.documentElement.classList.toggle("dark", saved)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const value = !prev
      localStorage.setItem("darkMode", String(value))
      document.documentElement.classList.toggle("dark", value)
      return value
    })
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl  font-semibold">Localização</h1>

        <div className="flex items-center gap-2">
          <Sun size={16} />
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          <Moon size={16} />
        </div>
      </div>

      <Separator className="mb-6" />

      {/* CARD PRINCIPAL */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6 space-y-6">
          {/* BUSCA */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />



              <SearchMap mapRef={mapRef} />

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          {/* MAPA */}
          <div className="w-full h-[60vh] rounded-xl border border-dashed border-border bg-muted flex items-center justify-center">
            <UserMap mapRef={mapRef} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
