
import { Link } from "react-router"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import { useQuery } from '@tanstack/react-query'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useAuth } from "@/context/authContext"
import { getUser } from "@/api/userHome"
import { Users } from "lucide-react"

export function UserMenu() {

  const { userId, logout } = useAuth()
  const token = localStorage.getItem("token")

  const { data: user, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUser(Number(userId), String(token)),
    enabled: !!userId && !!token
  })

  let perfilFoto = ""
  if (user?.fotoPerfil?.startsWith("https:")) {
    perfilFoto = user.fotoPerfil
  } else if (user?.fotoPerfil) {
    perfilFoto = "http://localhost:3000" + user?.fotoPerfil
  } else {
    perfilFoto = "https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&q=60&w=3000"
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full focus:outline-none">
          <Avatar className="h-9 w-9">
            <AvatarImage src={perfilFoto} />
            <AvatarFallback>BM</AvatarFallback>
          </Avatar>

          <span className="hidden sm:block text-sm font-medium text-neutral-50">
            {user?.name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to="/userConfig">Perfil</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-red-500" onClick={logout}>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}