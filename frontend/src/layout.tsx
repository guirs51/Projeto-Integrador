import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { Outlet, useNavigate } from "react-router"
import { useAuth } from "./context/authContext"
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Layout() {
  return (
    <GoogleOAuthProvider clientId="283937599928-psbk3t7eocu0etr13q7rdrnhdl9bkrn0.apps.googleusercontent.com">
      <SidebarProvider>
        <AppSidebar />
        <main className="h-full w-full">
          {/* <SidebarTrigger /> */}
          <Outlet />
        </main>
      </SidebarProvider>
    </GoogleOAuthProvider>
  )
}