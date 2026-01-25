import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { materialsTable } from "../materials/materialsTable";

import { Label } from "@/components/ui/label";
import { use, useEffect, useState } from "react";
import { data } from "react-router";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { UserMenu } from "@/components/userMenu";
import { ModeToggle } from "@/components/mode-toggle";
import {  navigationItems2 } from "@/types/Navigation";
import LogoR from '@/imgs/logo.png'


interface Material {
  id: number;
  name: string;
  importance: number;
  points: number;
}

export default function AdminConfig() {

  const [material, setMaterial] = useState<Material[]>([])
  const [pontos, setPontos] = useState<String>("")
  const [nomeMaterial, setNomeMaterial] = useState<string>("")
  const [importancia, setImportancia] = useState<String>("")
  const { userId } = useAuth()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    const getMaterial = async () => {
      if (!userId && !token) {
        navigate("/login")
      }
      try {
        const response = await fetch("http://localhost:3000/material/", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        })

        const data = await response.json()
        if (!response.ok) {
          alert("Houve um Erro")
          return
        }
        setMaterial(data)

      } catch (e) {
        console.log(e)
      }
    }

    getMaterial()

  }, [])

  const postMaterial = async () => {
    try {
      const response = await fetch("http://localhost:3000/material/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: nomeMaterial, points: Number(pontos), importance: Number(importancia) })
      })

      if (!response.ok) {
        alert("houve um Erro")
        return
      }


    } catch (e) {
      console.log(e)
    }
  }

  const deleteMaterial = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/material/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })

      if (!response.ok) {
        alert("houve um Erro")
        return
      }

    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="">

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
            {navigationItems2.map(({ title, url, icon: Icon }) => (
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
            <UserMenu />
          </div>
        </div>
      </header>


      <main>

                <div className="w-full flex items-start justify-between gap-6 px-10 py-6 ">
                <div className=" p-4 pl-10">
                    <h1 className=" mt-4 text-3xl md:text-6xl font-bold tracking-tight text-[#91b338]">
                        Olá ADM
                    </h1>
                    <p className="text-accent-foreground/70 text-sm">
                        Essa é a tela onde você consegue adicionar novos materiais.
                    </p>
                </div>

              
            </div>


        <div className="flex  items-center gap-4 pl-10 ">
          <div className="py-1 relative  flex-1 max-w-2xl">
            <Input className=" rounded-sm" placeholder="ex: vidro" ></Input>
            <Search size={20} className="absolute right-2 top-3 text-accent-foreground/50 " />
          </div>
            <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button  className="bg-[#91b338] text-neutral-50" variant="outline">Adicionar material</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">
                    Adicione um novo tipo de material
                  </h4>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Importância</Label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                      onChange={(e) => setImportancia(String(e.target.value))}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Material</Label>
                    <Input
                      id="Material"
                      defaultValue="papel"
                      className="col-span-2 h-8"
                      value={nomeMaterial}
                      onChange={(e) => setNomeMaterial(String(e.target.value))}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Pontos</Label>
                    <Input
                      id="Pontos"
                      defaultValue="10"
                      className="col-span-2 h-8"
                      onChange={(e) => setPontos(String(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <Button  className="bg-[#91b338] text-neutral-50" type="submit" variant="outline" onClick={postMaterial}>
                Salvar
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        </div>

        <div className="w-full overflow-x-auto">
          <Table className="scale-95">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Material</TableHead>
                <TableHead className="font-semibold">Importância</TableHead>
                <TableHead className="font-semibold">Pontos</TableHead>
                <TableHead className="font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {material.map((item: Material) => (
                <TableRow
                  key={item.id}
                  className="border-b hover:bg-green-500/10 dark:hover:bg-green-500/20 transition"
                >
                  <TableCell>{item.name}</TableCell>

                  <TableCell>
                    {Array.from({ length: item.importance }).map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </TableCell>

                  <TableCell className="font-bold">{item.points}</TableCell>

                  <TableCell >
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-red-700 p-2 rounded-sm  dark:hover:bg-red-500 transition " >Remover</AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Você tem certeza que deseja remover esse material?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação sera permante.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <Button type="submit" variant="outline" onClick={() => deleteMaterial(item.id)}>
                            remover
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

       
      </main>

    </div>
  );
}
