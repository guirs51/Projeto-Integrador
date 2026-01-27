import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface User {
  id: number
  name: string
  email: string
  cpf: string
  fotoPerfil?: string
  bio: string
}


interface EditProfileModalProps {
  userData: User
  onClose: () => void
  onSave: (data: Partial<User>) => void
}

export default function EditProfileModal({
  userData,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [formName, setFormName] = useState(userData.name)
  const [formEmail, setFormEmail] = useState(userData.email)
  const [formCpf, setFormCpf] = useState(userData.cpf)
  const [bio, setBio] = useState("")

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(
    userData.fotoPerfil
      ? userData.fotoPerfil
      : null
  )

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function uploadFoto() {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("foto", selectedFile)

    await fetch(`http://localhost:3000/users/${userData.id}/foto`, {
      method: "POST",
      body: formData,
    })
  }

  function buildUpdateUser(): Partial<User> {
    const payload: Partial<User> = {}

    if (formName.trim() && formName !== userData.name) {
      payload.name = formName
    }

    if (formEmail.trim() && formEmail !== userData.email) {
      payload.email = formEmail
    }

    if (!formCpf) {
      payload.cpf = "Vazio"
    } else if (formCpf.trim() && formCpf !== userData.cpf) {
      payload.cpf = formCpf
    }

    if (bio.trim() && bio !== userData.email) {
      payload.bio = bio
    }


    return payload
  }

  function handleSubmit() {
    const update = buildUpdateUser()
    if (selectedFile) {
      uploadFoto()
    }

    onSave(update)

    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Editar perfil</DialogTitle>
          <button onClick={onClose}>
          </button>
        </DialogHeader>

        <div className="flex flex-col items-center gap-2">
          {preview ? (
            <img
              src={preview}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200" />
          )}

          <label className="text-sm cursor-pointer text-blue-600">
            Trocar foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input value={formName} onChange={(e) => setFormName(e.target.value)} />
          </div>

          <div className="space-y-1">
            <Label>CPF</Label>
            <Input value={formCpf} onChange={(e) => setFormCpf(e.target.value)} />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Bio</Label>
            <Textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Fale um pouco sobre você"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
