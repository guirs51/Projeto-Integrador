import { useState } from "react"
import { IoEyeSharp } from "react-icons/io5"
import { FaEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from "react-router"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "../../context/authContext"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)

  async function loginUser() {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Erro ao fazer login")
        return
      }

      localStorage.setItem("token", data.token)
      login(data.user.id)

      alert("Login realizado com sucesso!")
      navigate("/UserHome")
    } catch {
      alert("Erro de conexão com o servidor")
    }
  }

  return (
 
    <div className="flex h-screen w-full bg-white text-zinc-900">
      
      {/* ESQUERDA */}
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md bg-white border shadow-lg">
          
          <CardHeader className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-black">
              Bem-vindo de volta ao{" "}
              <span className="text-green-700">Recicle +</span>
            </h1>
            <p className="text-sm text-zinc-600">
              Junte-se à nossa comunidade sustentável
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="Email"
              className="bg-white text-zinc-900"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Senha */}
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                placeholder="Senha"
                className="bg-white text-zinc-900 pr-10"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                {show ? <IoEyeSharp /> : <FaEyeSlash />}
              </button>
            </div>

            <Button
              onClick={loginUser}
              className="w-full bg-green-700 hover:bg-green-800 text-white"
            >
              Entrar
            </Button>

            <p className="text-xs text-center text-zinc-600">
              Não tem uma conta?{" "}
              <a href="/regis" className="text-green-700 font-medium">
                Crie agora!
              </a>
            </p>

            <div className="flex flex-col items-center gap-2 pt-2">
              <span className="text-xs text-zinc-500">
                Ou continue com
              </span>
              <Button
                variant="outline"
                size="icon"
                className="bg-white border-zinc-300"
              >
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
