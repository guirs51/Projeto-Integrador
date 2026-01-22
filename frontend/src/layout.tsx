import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { Outlet, useNavigate } from "react-router"
import { useAuth } from "./context/authContext"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-full w-full">
        {/* <SidebarTrigger /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  )
}