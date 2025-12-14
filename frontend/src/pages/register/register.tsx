import { useState } from "react"
import { IoEyeSharp } from "react-icons/io5"
import { FaEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)

  async function createUser() {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, cpf, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      localStorage.setItem("token", data.token)
      alert("Cadastro realizado com sucesso!")
    } catch {
      alert("Erro de conexão com o servidor")
    }
  }

  return (
    <div className="flex h-screen w-full">
      
      {/* ESQUERDA */}
      <div className="flex flex-1 items-center justify-center bg-background">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-2">
            <h1 className="text-xl font-semibold">
              Bem-vindo ao <span className="text-green-600">Recicle +</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Junte-se à nossa comunidade sustentável
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input placeholder="Nome" onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="CPF" onChange={(e) => setCpf(e.target.value)} />

            {/* Senha */}
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {show ? <IoEyeSharp /> : <FaEyeSlash />}
              </button>
            </div>

            <Button
              className="w-full bg-green-700 hover:bg-green-800"
              onClick={createUser}
            >
              Cadastrar
            </Button>

            <p className="text-xs text-center">
              Já tem uma conta?{" "}
              <a href="/login" className="text-green-600 font-medium">
                Entrar
              </a>
            </p>

            <div className="flex flex-col items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">
                Ou continue com
              </span>
              <Button variant="outline" size="icon">
                <FcGoogle size={22} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DIREITA */}
      <div
        className="hidden md:flex flex-1 items-end justify-center p-10 text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg')",
        }}
      >
        <h1 className="max-w-lg text-xl">
          Preservar a natureza é o primeiro passo para preservar o futuro.
        </h1>
      </div>
    </div>
  )
}
