import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import { BookOpen, Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { navigationItems2 } from "../src/types/Navigation"
import { Link } from "react-router"
import { ModeToggle } from "./components/mode-toggle"
import { Button } from "./components/ui/button"
import { UserMenu } from "./components/userMenu";
import LogoR from './imgs/logo.png'
import { AppSidebar } from "./components/app-sidebar-adm" 


export default function Layout() {
  return (
    <SidebarProvider>
      <main className="h-full w-full">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#91B338]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

            <div className="flex items-center gap-3">
              {/*  Mobile */}
              <div className="md:hidden">
                <SidebarTrigger />
              </div>

             
              <div className="flex items-center gap-2 text-white">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <img src={LogoR} className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold">Recicle +</p>
              </div>
            </div>

            {/* NAV DESKTOP */}
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems2.map(({ title, url, icon: Icon }) => (
                <Link key={title} to={url}>
                  <button className="flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:text-white">
                    <Icon size={15} />
                    {title}
                  </button>
                </Link>
              ))}
            </nav>

           
            <div className="flex gap-4">
              <UserMenu />
              <ModeToggle />
            </div>
          </div>
        </header>

        {/* SIDEBAR MOBILE */}
        <div className="md:hidden ">
          <AppSidebar />
        </div>

        <Outlet />
      </main>
    </SidebarProvider>
  )
}
