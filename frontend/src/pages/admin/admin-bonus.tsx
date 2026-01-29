import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserMenu } from "@/components/userMenu"
import { ModeToggle } from "@/components/mode-toggle"
import { Link } from "react-router"
import { navigationItems2 } from "@/types/Navigation"
import LogoR from '@/imgs/logo.png'
import { Gift } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postBonus } from "@/api/bonusAdmin"
import { enqueueSnackbar } from "notistack"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


interface Bonus {
    id: string
    title: string
    description: string
    requiredPoints: number
}

export default function AdminBonus() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [requiredPoints, setRequiredPoints] = useState(0)
    const [bonusList, setBonusList] = useState<Bonus[]>([])

    const queryClient = useQueryClient()

    const postBonusMutation = useMutation({
        mutationFn: () => postBonus(title, requiredPoints, description),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bonus"] })
            enqueueSnackbar("Bonus cadastrado com sucesso!", {
                variant: "success",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            })
        }
    })

    function handleCreateBonus() {
        if (!title || !description || requiredPoints <= 0) return

        // setBonusList((prev) => [
        //     ...prev,
        //     {
        //         id: crypto.randomUUID(),
        //         title,
        //         description,
        //         requiredPoints,
        //     },
        // ])

        postBonusMutation.mutate()

        setTitle("")
        setDescription("")
        setRequiredPoints(0)
    }

    return (

        <div>


            <main>

                <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4 md:gap-6 px-4 md:px-10 py-6">
                    <div className=" p-4 pl-10">
                        <h1 className=" mt-4 text-3xl md:text-6xl font-bold tracking-tight text-[#91b338]">
                            Olá ADM
                        </h1>
                        <p className="text-accent-foreground/70 text-sm">
                            Essa é a tela onde você consegue adicionar novas bonificações.
                        </p>
                    </div>
                </div>

                <div className="px-4 py-6 md:p-8 space-y-8">
                    <h1 className="text-2xl mt-2  font-bold tracking-tight text-[#91b338]">Gerenciar Bônus</h1>

                    {/* Criar bônus */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Novo Bônus</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4 px-4 py-4 md:p-3 md:pl-10">
                            <div className="">
                                <Label className="mb-1 block">Nome do bônus</Label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ex: Desconto em loja parceira"
                                />
                            </div>

                            <div>
                                <Label className="p-2">Descrição</Label>
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Ex: 15% de desconto em produtos sustentáveis"
                                />
                            </div>

                            <div>
                                <Label className="p-2">Pontos necessários</Label>
                                <Input
                                    type="number"
                                    value={requiredPoints}
                                    onChange={(e) => setRequiredPoints(Number(e.target.value))}
                                />
                            </div>

                            <div className="flex justify-center md:justify-end">
                                <Button onClick={handleCreateBonus}>
                                    Criar bônus
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Lista de bônus */}
                    <div className="grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {bonusList.map((bonus) => (
                            <Card className="bg-blue-300/25" key={bonus.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 mt-2"> <Gift />{bonus.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-5">
                                        {bonus.description}
                                    </p>
                                    <p className="text-sm font-medium">
                                        🔒 {bonus.requiredPoints} pontos
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>

    )
}
