import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { Outlet } from "react-router"
import { BookOpen, Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { navigationItems } from "./types/Navigation"
import { Link } from "react-router"
import { ModeToggle } from "./components/mode-toggle"
import { Button } from "./components/ui/button"
import { UserMenu } from "./components/userMenu";
import LogoR from './imgs/logo.png'



export default function Layout() {
  return (
    <SidebarProvider>


      <main className="h-full w-full">
        <header
          className="
    sticky top-0 z-50
    border-b border-white/10
    bg-[#91B338] backdrop-blur-xl
  "
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">

            {/* Brand */}
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                <img
                src={LogoR}
                  alt="logoRecicle.png"
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Recicle +</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems.map(({ title, url, icon: Icon }) => (
                <Link key={title} to={url}>
                  <button
                    className="
              inline-flex items-center gap-2
              rounded-full px-3 py-2
              text-xs font-medium
              text-white/70 hover:text-white
              hover:bg-white/10
              border border-transparent hover:border-white/10
              transition
            "
                  >
                    <Icon size={15} />
                    {title}
                  </button>
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <ModeToggle />
            
            </div>

              <div>
                <UserMenu/>
              </div>
          </div>
        </header>





        {/* <SidebarTrigger /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  )
}