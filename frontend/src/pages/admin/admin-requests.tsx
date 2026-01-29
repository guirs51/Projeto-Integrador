import TableAdmin, { mock } from "@/components/tableAdmin";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { use, useEffect, useState } from "react";

import type { Request, RequestStatus } from "@/components/tableAdmin";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle, Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import LogoR from "@/imgs/logo.png";
import { navigationItems2 } from "@/types/Navigation";
import { Link, useNavigate } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "@/components/userMenu";
import { useAuth } from "@/context/authContext";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll } from "@/api/requestAdmin";


export default function AdminRequest() {
    const [requestsFake, setRequests] = useState<Request[]>([])
    const [filter, setFilter] = useState<string>("")
    const [barData, setBarData] = useState<'pending' | 'all'>("pending")
    const { userId } = useAuth()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    // const queryClient = useQueryClient()

    const { data: requests = [] } = useQuery({
        queryKey: ['admin'],
        queryFn: () => getAll(),
        enabled: !!userId && !!token
    })

    const filterRequests = filter !== "" ? requests?.filter((i: Request) => i.user.name.toUpperCase().includes(filter.toUpperCase())) : requests

    const itensPending = filterRequests.filter((r: Request) => r.status === "PENDING")

    if (!userId && !token) {
        navigate("/login")
    }

    return (


        <div>

            <main>
                <section className="w-full h-full p-5 ">

                    <div className="w-full flex flex-col md:flex-row gap-4 md:gap-7 items-start md:items-center">
                        <div className=" p-4 pl-10">
                            <h1 className="mt-4 text-3xl md:text-6xl font-bold tracking-tight text-[#91b338]">
                                Olá ADM
                            </h1>
                            <p className="text-accent-foreground/70 text-sm">
                                Essa é a tela onde você consegue adicionar novos materiais.
                            </p>
                        </div>
                    </div>


                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">

                        <div className="relative flex-1 w-full md:max-w-2xl">
                            <Input onChange={(e) => setFilter(e.target.value)} className=" rounded-sm" placeholder="ex: request123" ></Input>
                            <Search size={20} className="absolute right-2 top-3 text-accent-foreground/50 " />
                        </div>


                        <RequestModal onCreated={(data) => { setRequests([...filterRequests, data]) }} />
                    </div>


                    <div className="flex gap-2 py-4">
                        <Button
                            onClick={() => setBarData("pending")}
                            size="sm"
                            variant="ghost"
                            className={cn(
                                "h-8 rounded-full px-4 text-sm font-medium transition-all",
                                "hover:bg-accent",
                                barData === "pending"
                                    ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                                    : "text-muted-foreground"
                            )}
                        >
                            Pendentes
                        </Button>

                        <Button
                            onClick={() => setBarData("all")}
                            size="sm"
                            variant="ghost"
                            className={cn(
                                "h-8 rounded-full px-4 text-sm font-medium transition-all",
                                "hover:bg-accent",
                                barData === "all"
                                    ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                                    : "text-muted-foreground"
                            )}
                        >
                            Todas
                        </Button>
                    </div>


                    <div className="w-full overflow-x-auto md:overflow-visible ">
                        {barData === "pending" && (
                            <TableAdmin data={itensPending} />
                        )}
                        {barData === "all" && (
                            <TableAdmin data={filterRequests} />
                        )}
                    </div>
                </section>
            </main>

        </div>



    )
}



interface RequestModalProps {
    onCreated: (data: Request) => void
}

export function RequestModal({ onCreated }: RequestModalProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [materialType, setRecycling] = useState("")
    const [status, setStatus] = useState<RequestStatus>("PENDING")
    const [quantity, setQuantity] = useState<number | "">("")
    const [createdAt, setCreatedAt] = useState("")

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const uuid = crypto.randomUUID()

        onCreated({
            user: {
                name,
                cpf,
                email
            },
            materialType,
            status,
            quantidade: Number(quantity),
            // createdAt,
            id: uuid
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Simular Request</Button>
            </DialogTrigger>

            <DialogContent className="w-[95vw] max-w-[425px]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Nova Request</DialogTitle>
                        <DialogDescription>
                            Preencha os dados para simular uma request
                        </DialogDescription>
                    </DialogHeader>

                    {/* Nome */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            placeholder="Fulano"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            placeholder="email@gmail.com"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* CPF */}
                    <div className="grid gap-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                            placeholder="99999999999"
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>

                    {/* Tipo de reciclagem */}
                    <div className="grid gap-2">
                        <Label htmlFor="recycling">Reciclagem</Label>
                        <Input
                            placeholder="Vidro, Papel"
                            id="recycling"
                            value={materialType}
                            onChange={(e) => setRecycling(e.target.value)}
                        />
                    </div>

                    {/* Quantidade */}
                    <div className="grid gap-2">
                        <Label htmlFor="quantity">Quantidade</Label>
                        <Input
                            placeholder="60"
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    {/* Status */}
                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select value={status} onValueChange={(value) => setStatus(value as RequestStatus)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="processing">Em andamento</SelectItem>
                                <SelectItem value="success">Concluído</SelectItem>
                                <SelectItem value="failed">Falhou</SelectItem>
                                <SelectItem value="canceled">Cancelado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Data */}
                    <div className="grid gap-2">
                        <Label htmlFor="createdAt">Data de criação</Label>
                        <Input
                            id="createdAt"
                            type="date"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
