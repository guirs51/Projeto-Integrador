import { Gift, Zap, Droplet, Flame, Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router";

export default function Bonifications() {


  const [deliveries, setDeliveries] = useState<RecyclingData[]>([]);


  const [user, setUser] = useState<User | null>(null)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

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

    if (!userId && !token) {
      navigate("/login")
    }
  }, [userId, token]);

  const points = deliveries.length * 10;

  const goal = 100
  const progress = (points / goal) * 100

  const benefits = [
    {
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      title: "Conta de Luz",
      discount: "5% - 25%",
      description: "Ganhe descontos ao completar metas mensais.",
    },
    {
      icon: <Droplet className="h-5 w-5 text-blue-500" />,
      title: "Conta de Água",
      discount: "5% - 20%",
      description: "Economize acumulando pontos recicláveis.",
    },
    {
      icon: <Building2 className="h-5 w-5 text-zinc-500" />,
      title: "IPTU",
      discount: "3% - 15%",
      description: "Descontos progressivos com base em sustentabilidade.",
    },
    {
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      title: "Gás",
      discount: "5% - 10%",
      description: "Ganhe bônus ao manter alta pontuação mensal.",
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
            <span>{points} pontos</span>
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
        {benefits.map((item, index) => (
          <Card key={index} className="transition hover:shadow-lg">
            <CardContent className="p-5 space-y-3">

              <div className="flex items-center gap-2">
                {item.icon}
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </div>

              <p className="text-sm">
                <strong>Desconto disponível:</strong> {item.discount}
              </p>

              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
