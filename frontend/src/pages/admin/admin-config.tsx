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
import { materialsTable } from "../materials/materialsTable";

import { Label } from "@/components/ui/label";

interface Material {
  name: string;
  importance: number;
  points: number;
}

export default function AdminConfig() {
  return (
    <div className="">
      <div className="flex w-full max-w-sm items-center gap-2 p-10 ">
        <Input type="email" placeholder="Email" />
        <Button type="submit" variant="outline">
          Pesquisar
        </Button>
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
            {materialsTable.map((item: Material, index: number) => (
              <TableRow
                key={index}
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
                    <AlertDialogTrigger className="bg-red-700 p-2 rounded-sm  dark:hover:bg-red-500 transition ">Remover</AlertDialogTrigger>
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
                        <AlertDialogAction className="bg-red-600  dark:hover:bg-red-500 transition">Remover</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Adicionar material</Button>
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
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Material</Label>
                  <Input
                    id="Material"
                    defaultValue="papel"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Pontos</Label>
                  <Input
                    id="Pontos"
                    defaultValue="10"
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
