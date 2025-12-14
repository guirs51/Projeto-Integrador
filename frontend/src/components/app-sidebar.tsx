import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"

import { UserSidebar } from "./userSidebar"

// Menu items.
const items = [
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

export function AppSidebar() {
  return (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recicle +</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
        
      </SidebarContent>
                <ModeToggle/>
       
    </Sidebar>
  )
}