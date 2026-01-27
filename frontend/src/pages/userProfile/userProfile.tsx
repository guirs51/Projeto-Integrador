import { useState } from "react"
import { useNavigate } from "react-router"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/context/authContext"
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
import DataField from "@/components/dataField"
import DataPasswordField from "@/components/dataPasswordField"
import EditProfileModal from "@/components/editProfileModal"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUser } from "@/api/userHome"
import { deleteUser, updateUser } from "@/api/userConfig"
import { enqueueSnackbar } from "notistack"

export interface User {
  id: number
  name: string
  email: string
  cpf: string
  fotoPerfil?: string
}

export default function UserProfile() {
  // const [user, setUser] = useState<User | null>(null)
  const [openEditModal, setOpenEditModal] = useState(false)

  const navigate = useNavigate()
  const { userId, logout } = useAuth()
  const token = localStorage.getItem("token")

  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUser(Number(userId), String(token)),
    enabled: !!userId && !!token
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(Number(userId), String(token)),
    onSuccess: () => {
      logout()
      navigate("/regis")
    }
  })

  const updateMutation = useMutation({
    mutationFn: (update: Partial<User>) => updateUser(Number(userId), String(token), update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] }),
        enqueueSnackbar("reciclagem cadastrado com sucesso!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        })
    }
  })

  function hadleDelete() {
    deleteMutation.mutate()
  }

  function handlUpdate(update: Partial<User>) {
    updateMutation.mutate(update)
  }




  let perfilFoto = ""
  if (user?.fotoPerfil?.startsWith("https:")) {
    perfilFoto = user.fotoPerfil
  } else if (user?.fotoPerfil) {
    perfilFoto = "http://localhost:3000" + user?.fotoPerfil
  } else {
    perfilFoto = "https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&q=60&w=3000"
  }

  return (
    <div className="flex justify-center p-22">
      <Card className="w-full max-w-3xl  rounded-2xl shadow-lg">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-28 h-28">
              <AvatarImage src={perfilFoto} />
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
              {user?.bio ? user?.bio : "Hi, I'm a passionate developer focused on crafting great digital experiences."}
            </p>
          </div>

          <Separator />

          {/* Delete */}
          <div className="flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger className="bg-red-700 p-2 rounded-sm  dark:hover:bg-red-500 transition ">Deletar</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Você tem certeza que deseja deletar sua conta?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação sera permante, confirme sua senha para prosseguir.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  {/* <Input placeholder="Digite sua senha" onChange={(e) => setPasswordVeri(e.target.value)}></Input> */}
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600  dark:hover:bg-red-500 transition" onClick={hadleDelete}>Deletar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      {openEditModal && user && (
        <EditProfileModal
          userData={user}
          onSave={handlUpdate}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </div>
  )
}
