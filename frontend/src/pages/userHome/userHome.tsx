

import { useEffect, useState } from "react"



import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import ReciclyngModal, { type RecyclingFormData } from "@/components/reciclyngModal"
import RecyclingCard from "@/components/recyclingCard"
import PointsChart from "@/components/pointsChart"

import "../../global.css"


import {
  ArchiveRestore, PlusCircle, Home,
  Inbox,
  BookOpen,
  CheckSquare,
  Users,
  Settings,
  LogOut,
  Sun,
  Moon,
  User
} from 'lucide-react';
import { data, useLocation } from 'react-router';
import { useUser } from '../../context/userContext';
import { useAuth } from '../../context/authContext';





interface RecyclingData {
  id: number,
  materialType: string;
  quantidade: string;
  deliveryLocal: string;
  status: string
}

interface User {
  id: number
  name: string
  email: string
  cpf: string
  Points: number
}

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [deliveries, setDeliveries] = useState<RecyclingData[]>([]);


  const [user, setUser] = useState<User | null>(null)
  const token = localStorage.getItem("token")

  const { userId } = useAuth()

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });

        const data = await response.json();

        if (!response.ok) {
          alert(
            "Erro ao buscar dados do usuário: " +
            response.status + " " + data.mensagem
          );
          return;
        }

        setUser(data)
        setDeliveries(data.delivery)

      } catch (error) {
        console.error("Erro de rede:", error);
      }
    }

    if (userId && token) {
      getUser();
    }
  }, [userId, token]);

  const points = deliveries.length * 10;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  }

  const postDelivery = async (local: string, materialType: string, quantidade: number) => {
    try {
      const response = await fetch("http://localhost:3000/users/create/delivery", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ deliveryLocal: local, materialType: materialType, quantidade: Number(quantidade), user: { id: userId }, company: { id: 1 } })
      })

      const data = await response.json()

      console.log(userId)

      if (!response.ok) {
        alert("Houve um erro ao adicionar uma reciclagem. Erro: " + data?.mensagem)
        return
      }

      alert("reciclagem criada com sucesso")
      console.log(data)

    } catch (e) {
      console.log("Houve um erro: ", e);
      alert("Erro na conexão com o servidor.");
    }
  }
 function handleAddRecycling(data: RecyclingFormData) {
  postDelivery(
    data.localizacao,
    data.material,
    Number(data.quantidade)
  )

  setIsModalOpen(false)
}
  return (
    <div className="mx-auto w-[90%] py-6 space-y-8">
      {/* MODAL */}
      <ReciclyngModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRecycling}
      />

      {/* CARD USUÁRIO */}
      <Card className="rounded-2xl border bg-background">
        <CardContent className="flex gap-8 p-8">
          <Avatar className="h-36 w-36">
            <AvatarImage src="https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&q=60&w=3000" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{user?.name || "Usuário"}</h1>
            <p className="text-sm text-muted-foreground">
              Hi, my name is {user?.name}. I'm a system developer.
            </p>
            <span className="text-xs text-muted-foreground">Rua Tal, 123</span>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* BOTÃO */}
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
        <span className="text-base font-medium">Adicionar reciclagem</span>
      </div>

      {/* ÁREA PRINCIPAL */}
      <div className="flex gap-8">
        {/* REGISTROS */}
        <div className="flex-[2] space-y-4">
          <div className="flex items-center gap-2">
            <ArchiveRestore className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Área dos Registros Pendentes</h2>
          </div>

          <ScrollArea className="h-[40vh] rounded-xl border p-4">
            {deliveries.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Você não possui registros
              </p>
            ) : (
              <div className="space-y-3">
                {deliveries.map((item, index) => (
                  <RecyclingCard
                    key={index}
                    material={item.materialType}
                    quantidade={item.quantidade}
                    localizacao={item.deliveryLocal}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* PONTUAÇÃO */}
        <div className="flex-1">
          <Card className="sticky top-6 rounded-xl border">
            <CardHeader>
              <CardTitle className="text-base">Pontuação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PointsChart points={points} />
              <div className="rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1 text-center text-sm font-medium">
                {points} pontos
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
