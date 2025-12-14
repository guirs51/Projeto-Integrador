import { useEffect, useState } from "react"
import { useNavigate} from "react-router"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/context/authContext"

import DataField from "@/components/dataField"
import DataPasswordField from "@/components/dataPasswordField"
import EditProfileModal from "@/components/editProfileModal"

export interface User {
  id: string
  name: string
  cpf: string
  email: string
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [openEditModal, setOpenEditModal] = useState(false)

  const navigate = useNavigate()
  const { userId, logout } = useAuth()
  const token = localStorage.getItem("token")

  async function deleteUser() {
    if (!userId || !token) return

    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      alert("Erro ao deletar usuário")
      return
    }

    logout()
    navigate("/regis")
  }

  async function updateUser(update: Partial<User>) {
    if (!userId || !token) return

    const response = await fetch(
      `http://localhost:3000/users/update/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(update),
      }
    )

    if (!response.ok) {
      alert("Erro ao atualizar usuário")
      return
    }

    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    async function getUser() {
      if (!userId || !token) return

      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) return

      const data = await response.json()
      setUser(data)
    }

    getUser()
  }, [userId, token])

  return (
    <div className="flex justify-center p-3">
      <Card className="w-full max-w-3xl rounded-2xl shadow-lg">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-28 h-28">
              <AvatarImage src="https://images.unsplash.com/photo-1527980965255-d3b416303d12" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">Perfil do Usuário</h2>
          </div>

          <Separator />

          {/* Informações pessoais */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Informações pessoais</h3>
              <Button size="sm" onClick={() => setOpenEditModal(true)}>
                <Edit className="w-4 h-4 mr-2" /> Editar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DataField title="Nome" info={user?.name ?? ""} />
              <DataField title="CPF" info={user?.cpf ?? ""} />
              <DataField title="Email" info={user?.email ?? ""} />
              <DataPasswordField title="Senha" info="••••••••" />
            </div>
          </div>

          <Separator />

          {/* Bio */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Bio</h3>
            <p className="text-muted-foreground">
              Hi, I'm a passionate developer focused on crafting great digital
              experiences.
            </p>
          </div>

          <Separator />

          {/* Delete */}
          <div className="flex justify-end">
            <Button variant="destructive" onClick={deleteUser}>
              Deletar conta
            </Button>
          </div>
        </CardContent>
      </Card>

      {openEditModal && user && (
        <EditProfileModal
          userData={user}
          onSave={updateUser}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </div>
  )
}
