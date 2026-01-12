import { createContext, useContext, useEffect, useState } from "react"


export interface LocationData {
    lat: number
    lng: number
    address: string
}

interface LocationContextType {
    location: LocationData | null
    setLocation: (loca: LocationData) => void
    clearLocation: () => void
}

const LocationContext = createContext<LocationContextType | null>(null)

export function LocationProvider({ children }: { children: React.ReactNode }) {

    const [location, setLocationState] = useState<LocationData | null>(null)


    useEffect(() => {
        const saved = localStorage.getItem("user_location")
        if (saved) {
            try {
                setLocationState(JSON.parse(saved))
            } catch {
                localStorage.removeItem("User_Location")
            }
        }
    },[])

    useEffect(() =>{
        if(location){
            localStorage.setItem("user_location",JSON.stringify(location))
        }
    },[location])

  function setLocation(loc: LocationData) {
    setLocationState(loc)
  }

  function clearLocation() {
    setLocationState(null)
    localStorage.removeItem("user_location")
  }

    return (
        <LocationContext.Provider value={{ location, setLocation,clearLocation }}>
            {children}
        </LocationContext.Provider>
    )
}

export function useLocation() {
    const context = useContext(LocationContext)
    if (!context) {
        throw new Error("useLocation deve estar dentro de LocationProvider")
    }
    return context
}