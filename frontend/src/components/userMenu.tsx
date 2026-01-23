
import { Link } from "react-router"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function UserMenu() {



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full focus:outline-none">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>BM</AvatarFallback>
          </Avatar>

          <span className="hidden sm:block text-sm font-medium text-neutral-50">
            { "Nathalia Minossi"} 
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
  <Link to="/userConfig">Perfil</Link>
</DropdownMenuItem>
       
        <DropdownMenuItem className="text-red-500">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}