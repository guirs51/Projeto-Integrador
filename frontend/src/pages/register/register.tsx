/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { IoEyeSharp } from "react-icons/io5"
import { FaEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useSnackbar } from "notistack"
import { useNavigate } from "react-router"
import { useAuth } from "@/context/authContext"
import { createUser } from "@/api/auth"

export default function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  //const [errorMessage, setErrorMessage] = useState<string>("")
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { login } = useAuth()

  // Extrai as mensagens de erro do que não está de acordo com o DTO
  function extractDtoError(errors: any): string {
    if (Array.isArray(errors)) {
      for (const fieldError of errors) {
        const messages = Object.values(fieldError)
        if (messages.length > 0) {
          return messages[0] as string
        }
      }
    }

    if (typeof errors === "object" && errors.message) {
      return errors.message
    }

    if (typeof errors.message === "string") {
      return errors.message
    }

    return "Erro ao cadastrar"
  }



  async function handleRegister() {
    // tenta cadastrar o usuário
    try {
      // cria o usuario
      const data = await createUser(name, email, cpf, password)

      // envia o token para o localstorage
      localStorage.setItem("token", data.token)
      // realiza o login
      login(data.user.id)

      // mensagens
      enqueueSnackbar("Usuário cadastrado com sucesso!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" }
      })

      navigate("/UserHome")

    } catch (error: any) {
      // se n consegui cadastrar, chama a função que extrai o erro para exibir no "alert"
      const message = extractDtoError(error)

      enqueueSnackbar(message, {
        variant: "warning",
        anchorOrigin: { vertical: "top", horizontal: "right" }
      })
    }
  }



  return (
    <div className="flex h-screen w-full">

      {/* ESQUERDA */}
      <div className="flex flex-1 items-center justify-center bg-neutral-50">
        <Card className="w-full max-w-md shadow-lg bg-neutral-100">
          <CardHeader className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-neutral-900">
              Bem-vindo ao <span className="text-[#91b338]">Recicle +</span>
            </h1>
            <p className="text-sm text-muted-foreground  text-zinc-600">
              Junte-se à nossa comunidade sustentável
            </p>
          </CardHeader>

          <CardContent className="space-y-4 ">
            <Input placeholder="Nome" onChange={(e) => setName(e.target.value)} className="bg-white text-zinc-900" />
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="bg-white text-zinc-900" />
            <Input placeholder="CPF" onChange={(e) => setCpf(e.target.value)} className="bg-white text-zinc-900" />

            {/* Senha */}
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white text-zinc-900"
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
              className="w-full bg-[#91b338] hover:bg-green-600"
              onClick={handleRegister}
            >
              Cadastrar
            </Button>

            <p className="text-xs text-center  text-zinc-600">
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
