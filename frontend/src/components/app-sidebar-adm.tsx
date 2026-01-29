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
import { useAuth } from "@/context/authContext"
import { useEffect, useState } from "react"

import { navigationItems2 } from "../types/Navigation"


export function AppSidebar() {

  const [nome, setNome] = useState<String>('')
  const [email, setEmail] = useState<String>('')
  const token = localStorage.getItem('token')
  const { userId } = useAuth()


  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });

        const data = await response.json();

        if (!response.ok) {
          alert(
            "Erro ao buscar dados do usuário: " +
            response.status + " " + data.mensagem
          );
          return;
        }

        setNome(data.name)
        setEmail(data.email)
      } catch (error) {
        console.error("Erro de rede:", error);
      }
    }

    if (userId && token) {
      getUser();
    }
  }, [userId, token]);


  return (
    <Sidebar className="">
      <SidebarContent className="bg-[#91B338]  text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="mt-6">Recicle +</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems2.map((item) => (
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

     
    </Sidebar>
  )
}