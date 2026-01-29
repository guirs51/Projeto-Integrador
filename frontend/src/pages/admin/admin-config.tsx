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
import { useState } from "react";
import { Search } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMaterial, postMaterial } from "@/api/materialAdmin";
import { enqueueSnackbar } from "notistack";


interface Material {
  id: number;
  name: string;
  importance: number;
  points: number;
}

export default function AdminConfig() {

  const [open, setOpen] = useState<boolean>(false)
  const [pontos, setPontos] = useState<String>("")
  const [nomeMaterial, setNomeMaterial] = useState<string>("")
  const [importancia, setImportancia] = useState<String>("")


  const queryClient = useQueryClient()

  const { data: material = [] } = useQuery({
    queryKey: ["material"],
    queryFn: () => getMaterial(),
  })

  const materiais: Material[] = material || null

  const postMaterialMutation = useMutation({
    mutationFn: () => postMaterial(nomeMaterial, String(pontos), String(importancia)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material"] }),
        enqueueSnackbar("material cadastrado com sucesso!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        })
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || "Erro ao cadastrar material", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      })
    }
  })

  function handlePostMutation() {
    postMaterialMutation.mutate()
    setOpen(false)
  }

  const deleteMaterialMutation = useMutation({
    mutationFn: (id: number) => deleteMaterial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material"] }),
        enqueueSnackbar("material deletado com sucesso!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        })
    }
  })

  function handleDeleteMutation(id: number) {
    deleteMaterialMutation.mutate(id)
    setOpen(false)
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

      <main>

        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4 md:gap-6 px-4 md:px-10 py-6">
          <div className=" p-4 pl-10">
            <h1 className="mt-4 text-3xl md:text-6xl font-bold tracking-tight text-[#91b338]">
              Olá ADM
            </h1>
            <p className="text-accent-foreground/70 text-sm">
              Essa é a tela onde você consegue adicionar novos materiais.
            </p>
          </div>


        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 px-4 md:pl-10">

          <div className="py-1 relative flex-1 w-full md:max-w-2xl">
            <Input className=" rounded-sm" placeholder="ex: vidro" ></Input>
            <Search size={20} className="absolute right-2 top-3 text-accent-foreground/50 " />
          </div>
          <div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button className="bg-[#91b338] text-neutral-50" variant="outline">Adicionar material</Button>
              </PopoverTrigger>
              <PopoverContent className="w-[90vw] max-w-80">
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
                        defaultValue=""
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
                        defaultValue=""
                        className="col-span-2 h-8"
                        onChange={(e) => setPontos(String(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                <Button className="bg-[#91b338] text-neutral-50" type="submit" variant="outline" onClick={handlePostMutation}>
                  Salvar
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="w-full overflow-x-auto md:overflow-visible">
          <Table className="min-w-[600px] md:min-w-0 scale-95">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Material</TableHead>
                <TableHead className="font-semibold">Importância</TableHead>
                <TableHead className="font-semibold">Pontos</TableHead>
                <TableHead className="font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {materiais.map((material) => {
                return (<TableRow
                  key={material?.id}
                  className="border-b hover:bg-green-500/10 dark:hover:bg-green-500/20 transition"
                >
                  <TableCell>{material?.name}</TableCell>

                  <TableCell>
                    {Array.from({ length: material?.importance }).map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </TableCell>

                  <TableCell className="font-bold">{material?.points}</TableCell>

                  <TableCell >
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-red-700 px-3 py-1 rounded-sm text-sm dark:hover:bg-red-500 transition " >Remover</AlertDialogTrigger>
                      <AlertDialogContent >
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
                          <Button type="submit" variant="outline" onClick={() => handleDeleteMutation(Number(material?.id))}>
                            remover
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
        </div>


      </main>

    </div>
  );
}
