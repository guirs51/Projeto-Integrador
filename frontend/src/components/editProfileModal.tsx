import { useState } from "react"
import { X } from "lucide-react"

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
  name: string
  email: string
  cpf: string
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

  function buildUpdateUser(): Partial<User> {
    const payload: Partial<User> = {}

    if (formName.trim() && formName !== userData.name) {
      payload.name = formName
    }

    if (formEmail.trim() && formEmail !== userData.email) {
      payload.email = formEmail
    }

    if (formCpf.trim() && formCpf !== userData.cpf) {
      payload.cpf = formCpf
    }

    return payload
  }

  function handleSubmit() {
    const update = buildUpdateUser()
    onSave(update)
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Editar perfil</DialogTitle>
          <button onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </DialogHeader>

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
