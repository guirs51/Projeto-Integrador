import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

export const navigationItems = [
  {
    title: "Home",
    url: "/userHome",
    icon: Home,
  },
  {
    title: "Materiais",
    url: "/materials",
    icon: Inbox,
  },
  {
    title: "Bonificações",
    url: "/bonifications",
    icon: Calendar,
  },
  {
    title: "Localização",
    url: "/location",
    icon: Search,
  },
  {
    title: "Configurações",
    url: "/userConfig",
    icon: Settings,
  },
]
