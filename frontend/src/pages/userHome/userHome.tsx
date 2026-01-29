

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReciclyngModal, { type RecyclingFormData } from "@/components/reciclyngModal"
import RecyclingCard from "@/components/recyclingCard"
import PointsChart from "@/components/pointsChart"
import "@/styles/profileResponsive.css"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUser, createDelivery } from "@/api/userHome"


import "../../global.css"


import {
  ArchiveRestore, Leaf, PlusCircle
} from 'lucide-react';
import { data, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/authContext';
import { RecycleBin } from "@/components/RecycleBin"
import { useSnackbar } from "notistack"





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
  fotoPerfil: string
}

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const [darkMode, setDarkMode] = useState(false);
  const token = localStorage.getItem("token")

  const { userId } = useAuth()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUser(Number(userId), String(token)),
    enabled: !!userId && !!token
  })

  const deliveries = user?.delivery || []
  const points = user?.Points || 0


  const createDeliveryMutation = useMutation({
    mutationFn: (data: RecyclingFormData) =>
      createDelivery(
        data.localizacao,
        data.material,
        Number(data.quantidade),
        String(token),
        userId!,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })
      enqueueSnackbar("reciclagem cadastrado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      })
    }
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  }


  function handleAddRecycling(data: RecyclingFormData) {
    createDeliveryMutation.mutate(data)
    setIsModalOpen(false)
  }

  let perfilFoto = ""
  if (user?.fotoPerfil?.startsWith("https:")) {
    perfilFoto = user.fotoPerfil
  } else if (user?.fotoPerfil) {
    perfilFoto = "http://localhost:3000" + user?.fotoPerfil
  } else {
    perfilFoto = "https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&q=60&w=3000"
  }

  console.log(perfilFoto)
  return (
    <div className="max-w-7xl mx-auto w-[90%] py-6 space-y-8 px-4 md:px-0">

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-10">

        {/* Texto
             <div className="max-w-xl text-center md:text-left mt-12 bg-gradient-to-br from-[#91b338]/20 to-[#4CAF50]/10 p-10 shadow-sm">
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-[#91b338]">
            Bem-vindo de volta, <br />
            Nathalia Minossi.
          </h1>

          <h2 className="mt-2 ">Inicie sua jornada em pró ao meio ambiente agora e <br />
            registre sua primeira reciclagem!</h2>
        </div> */}





        {/* MODAL */}
        <ReciclyngModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddRecycling}
        />

        {/* CARD USUÁRIO */}
        <Card className="     rounded-2xl border max-w-xl
  text-center md:text-left
  mt-6 md:mt-12
  p-6 md:p-10  bg-gradient-to-br from-[#91b338]/20 to-[#4CAF50]/10  shadow-sm">
          <CardContent className="flex gap-8 p-8">


            <div className="space-y-2">
              <h1 className=" mt-2 md:mt-4 text-3xl md:text-6xl font-bold tracking-tight text-[#91b338]">   Bem-vindo de volta, {user?.name || "Usuário"}</h1>
              <p className="text-sm">
                Hi, my name is {user?.name}. I'm a system developer.
              </p>
              <span className="text-xs text-muted-foreground">Rua Tal, 123</span>
            </div>
          </CardContent>
        </Card>

        {/* Lixeiras */}
        <div className="flex gap-4 md:gap-8 justify-center flex-wrap mt-6 md:mt-35">
          <RecycleBin label="Papel" color="bg-blue-500/80" />
          <RecycleBin label="Plástico" color="bg-red-500/80" />
          <RecycleBin label="Vidro" color="bg-green-600/80" />
          <RecycleBin label="Metal" color="bg-yellow-400/80" />
        </div>

      </div>

      <Separator />

      {/* BOTÃO */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          size="sm"
          variant="outline"
          className="rounded-full transition-all hover:scale-105"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
        <span className="text-base font-medium ">Adicionar reciclagem</span>
      </div>

      {/* ÁREA PRINCIPAL */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* REGISTROS */}
        <div className="flex-[2] space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <ArchiveRestore className="text-[#91b338]" />
            <h2 className="font-semibold">Registros Pendentes</h2>
          </div>

          <ScrollArea className="h-[55vh] md:h-[40vh] rounded-xl border p-4">
            {deliveries.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-10">
                <Leaf size={16} /> Nenhuma reciclagem registrada ainda
              </p>
            ) : (
              <div className="space-y-3">
                {deliveries.map((item: any, index: any) => (
                  <RecyclingCard
                    key={index}
                    material={item.materialType}
                    Peso={item.Peso}
                    localizacao={item.deliveryLocal}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* PONTUAÇÃO */}
        <div className="flex-1">
          <Card className="md:sticky md:top-6 rounded-xl border">
            <CardHeader>
              <CardTitle className="text-base">Pontuação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PointsChart points={points} />
              <div className="  rounded-lg bg-emerald-500/10
  text-emerald-700
  px-4 py-2 text-center
  font-semibold
  shadow-inner">
                {points} pontos
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
