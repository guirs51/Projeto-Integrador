import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Plus, SearchAlert } from "lucide-react";
import { Button } from "./ui/button";
import { RequestModal } from "@/pages/admin/admin-requests";



export const mock: Request[] = [
  {
    id_request: "1",
    createdAt: "11-11-25",
    recycling: "papel",
    status: "success",
    quantity: 100,
    user: {
      name: "Arthur Tavares Souto",
      cpf: "142.555.159-99",
      email: "arthurtavaressouto@gmail.com",
    },
  },
  {
    id_request: "2",
    createdAt: "10-11-25",
    recycling: "plástico",
    status: "pending",
    quantity: 45,
    user: {
      name: "Nathalia Minossi",
      cpf: "321.654.987-00",
      email: "nathalia.minossi@gmail.com",
    },
  },
  {
    id_request: "3",
    createdAt: "09-11-25",
    recycling: "vidro",
    status: "success",
    quantity: 200,
    user: {
      name: "Lucas Andrade",
      cpf: "987.123.456-11",
      email: "lucas.andrade@email.com",
    },
  },
  {
    id_request: "4",
    createdAt: "08-11-25",
    recycling: "metal",
    status: "canceled",
    quantity: 30,
    user: {
      name: "Mariana Lopes",
      cpf: "456.789.123-22",
      email: "mariana.lopes@email.com",
    },
  },
  {
    id_request: "5",
    createdAt: "07-11-25",
    recycling: "papelão",
    status: "pending",
    quantity: 150,
    user: {
      name: "Rafael Costa",
      cpf: "654.321.987-33",
      email: "rafael.costa@email.com",
    },
  },
  {
    id_request: "6",
    createdAt: "06-11-25",
    recycling: "eletrônicos",
    status: "success",
    quantity: 12,
    user: {
      name: "Beatriz Fernandes",
      cpf: "789.456.123-44",
      email: "beatriz.fernandes@email.com",
    },
  },
]


const STATUS_BADGE_STYLES: Record<RequestStatus, string> = {
  success: "bg-green-600 hover:bg-green-700",
  failed: "bg-red-600 hover:bg-red-700",
  processing: "bg-yellow-500 text-black hover:bg-yellow-600",
  pending: "bg-neutral-500 hover:bg-neutral-600",
  canceled: "bg-zinc-600 hover:bg-zinc-700",
}


export type RequestStatus =
  | "pending"
  | "success"
  | "processing"
  | "failed"
  | "canceled"

export type UserMock = {
  name: string
  cpf: string
  email: string
}

export type Request = {
  id_request: string
  user: UserMock
  recycling: string
  createdAt: string
  status: RequestStatus
  quantity: number

}


interface TableAdminProps {
  data: Request[]
}

export default function TableAdmin({ data }: TableAdminProps) {
  return (
    <div className="w-full h-full">
      {/*  <div className="grid max-w-sm gap-6">
        <InputGroup>
        <InputGroupInput placeholder="Search..."/>
        <InputGroupAddon>
        <Search/>
        </InputGroupAddon>
        <InputGroupAddon align={"inline-end"}>results</InputGroupAddon>
        </InputGroup>
      </div>*/ }
      <div className="rounded-xl border border-border bg-card p-2 shadow-sm">
        <div className="overflow-x-auto ">
          <Table>
            <TableHeader className="bg-muted/60 text-muted-foreground">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Reciclagem</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length < 1 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-24">
                    <div className="flex items-center justify-center">
                      <div
                        className="
            w-full max-w-md
            rounded-2xl border
            p-8 text-center
            shadow-lg
         
          "
                      >
                        {/* Ícone */}
                        <div
                          className="
              mx-auto mb-6 flex h-20 w-20 items-center justify-center
              rounded-full
              bg-gradient-to-br from-green-400 to-emerald-600
              shadow-lg
            "
                        >
                          <SearchAlert className="h-10 w-10  text-white" />
                        </div>

                        {/* Texto */}
                        <h2 className="text-xl font-semibold ">
                          Nenhuma solicitação encontrada
                        </h2>


                        {/* Ação */}
                        <div className="mt-6 flex justify-center">
                          <RequestModal onCreated={() => { }} />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}



              {data.map((item, index) => (
                <TableRow
                  key={item.id_request}
                  className={cn(
                    "transition-colors hover:bg-accent/40",
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  )}
                >

                  <TableCell>{item.user.name}</TableCell>
                  <TableCell>{item.user.email}</TableCell>
                  <TableCell>{item.user.cpf}</TableCell>
                  <TableCell>{item.recycling}</TableCell>
                  <TableCell>{String(item.quantity)}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>


                  {/* STATUS BADGE */}
                  <TableCell>
                    <Badge
                      className={cn(
                        "text-xs px-2 py-1",
                        STATUS_BADGE_STYLES[item.status]
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>

                  {/* SELECT NA COLUNA DE AÇÕES */}
                  <TableCell className="text-center">
                      <RequestDetailsModal data={item}/>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}



import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

interface RequestDetailsModalProps {
  data: Request
  onAccept?: (request: Request) => void
  onDeny?: (request: Request) => void
}

export function RequestDetailsModal({
  data,
  onAccept,
  onDeny,
}: RequestDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Ver detalhes
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-card">
        <DialogHeader>
          <DialogTitle>Detalhes da Solicitação</DialogTitle>
          <DialogDescription>
            Informações completas da request
          </DialogDescription>
        </DialogHeader>

        {/* Conteúdo */}
        <div className="grid gap-4 py-2 text-sm">
          <Info label="Nome" value={data.user.name} />
          <Info label="Email" value={data.user.email} />
          <Info label="CPF" value={data.user.cpf} />
          <Info label="Reciclagem" value={data.recycling} />
          <Info label="Quantidade" value={`${data.quantity}`} />
          <Info label="Data" value={data.createdAt} />

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge
              className={cn(
                "capitalize",
                data.status === "success" && "bg-primary",
                data.status === "failed" && "bg-destructive",
                data.status === "processing" && "bg-accent",
                data.status === "pending" && "bg-muted",
                data.status === "canceled" && "bg-secondary"
              )}
            >
              {data.status}
            </Badge>
          </div>
        </div>

        {/* Ações */}
        <DialogFooter className="gap-2">
          <Button
            variant="destructive"
            onClick={() => onDeny?.({ ...data, status: "failed" })}
          >
            Negar
          </Button>

          <Button
            className="bg-primary"
            onClick={() => onAccept?.({ ...data, status: "success" })}
          >
            Aceitar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ===============================
   Componente auxiliar
================================ */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-muted/40 p-6 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}
