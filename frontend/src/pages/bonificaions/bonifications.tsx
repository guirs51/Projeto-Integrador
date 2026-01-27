import { Gift, Zap, Droplet, Flame, Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import type { Bonus } from "@/types/bonus";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/userHome";

export default function Bonifications() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const { userId } = useAuth()

  const { data: user, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUser(Number(userId), String(token)),
    enabled: !!userId && !!token
  })

  const points = user?.Points

  const goal = 100
  const progress = (points / goal) * 100

  const bonuses: Bonus[] = [
    {
      id: "1",
      title: "Desconto na Conta de Luz",
      description: "Até 25% de desconto na fatura mensal.",
      requiredPoints: 100,
    },
    {
      id: "2",
      title: "Desconto na Conta de Água",
      description: "Economize com bônus sustentável.",
      requiredPoints: 50,
    },
    {
      id: "3",
      title: "IPTU Verde",
      description: "Desconto progressivo no IPTU.",
      requiredPoints: 80,
    },
  ]


  return (
    <div className="min-h-screen w-full px-6 py-10 flex flex-col items-center gap-10 bg-background text-foreground">

      {/* TÍTULO */}
      <h1 className="flex items-center gap-2 text-3xl font-bold">
        <Gift className="h-7 w-7 text-green-600" />
        Bonificações
      </h1>

      {/* PROGRESSO */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Seu Progresso</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm font-medium">
            <span>{points ? points : 0} pontos</span>
            <span>Meta: {goal}</span>
          </div>

          <Progress value={progress} />

          {progress >= 100 && (
            <p className="text-center text-green-600 font-semibold">
              🎉 Parabéns! Você desbloqueou descontos!
            </p>
          )}
        </CardContent>
      </Card>

      {/* BENEFÍCIOS */}
      <div className="grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bonuses.map((bonus) => {
          const unlocked = points >= bonus.requiredPoints

          return (
            <Card
              key={bonus.id}
              className={`transition hover:shadow-lg ${unlocked ? "" : "opacity-50"
                }`}
            >
              <CardContent className="p-5 space-y-3">

                <div className="flex items-center gap-2">
                  <Gift
                    className={`h-5 w-5 ${unlocked ? "text-green-600" : "text-zinc-400"
                      }`}
                  />
                  <h3 className="font-semibold text-lg">
                    {bonus.title}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground">
                  {bonus.description}
                </p>

                <p className="text-sm font-medium">
                  🎯 Necessário: {bonus.requiredPoints} pontos
                </p>

                <div className="pt-2">
                  <span
                    className={`text-sm font-semibold ${unlocked ? "text-green-600" : "text-red-500"
                      }`}
                  >
                    {unlocked ? "🎉 Disponível" : "🔒 Bloqueado"}
                  </span>
                </div>

              </CardContent>
            </Card>
          )
        })}
      </div>

    </div>
  )
}
