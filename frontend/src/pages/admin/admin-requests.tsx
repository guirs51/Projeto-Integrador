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
import { Link } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "@/components/userMenu";




export default function AdminRequest() {
    const [requests, setRequests] = useState<Request[]>([])
    const [filter, setFilter] = useState<string>("")
    const [barData, setBarData] = useState<'pending' | 'all'>("pending")
    const { userId } = useAuth()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const filterRequests = filter !== "" ? requests.filter(i => i.user.name.toUpperCase().includes(filter.toUpperCase())) : requests

    const itensPending = filterRequests.filter(r => r.status === "PENDING")

    console.log("filtrando as request: ", filterRequests)

    useEffect(() => {
        const getAll = async () => {

            if (!userId && !token) {
                navigate("/login")
            }

            try {
                const respose = await fetch('http://localhost:3000/delivery/', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await respose.json()

                const parsed: Request[] = data.map((item: any) => ({
                    id_request: item.id_request,
                    recycling: item.recycling,
                    status: item.status,
                    quantity: item.quantity,
                    user: {
                        name: item.name,
                        cpf: item.cpf,
                        email: item.email,
                    },
                }))

                setRequests(parsed)
                if (!respose.ok) {
                    alert("Erro na requesição")
                    return
                }
                console.log(data)
                setRequests([...data])
            } catch (e) {
                console.log(e)
            }
        }

        getAll()
    }, [])

    return (

        
<div>

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
        <section className="w-full h-full p-5 ">


     
      
                <div className="w-full flex gap-7 flex-row items-center ">
                <div className=" p-4 pl-10">
                    <h1 className=" mt-4 text-3xl md:text-6xl font-bold tracking-tight text-[#91b338]">
                        Olá ADM
                    </h1>
                    <p className="text-accent-foreground/70 text-sm">
                        Essa é a tela onde você consegue adicionar novos materiais.
                    </p>
                </div>
            </div>


            <div className="flex  items-center gap-4">

                <div className="py-1 relative  flex-1 max-w-2xl">
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


            <div className="w-full ">
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

            <DialogContent className="sm:max-w-[425px]">
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
