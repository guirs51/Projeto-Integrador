import { useState } from "react"
import { IoEyeSharp } from "react-icons/io5"
import { FaEyeSlash } from "react-icons/fa"
import { useNavigate } from "react-router"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "../../context/authContext"
import { useSnackbar } from "notistack"
import { GoogleLogin } from "@react-oauth/google"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string>("")
  const { enqueueSnackbar } = useSnackbar()

  async function loginUser(email: string, password: string) {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Erro ao fazer login")
    }

    return data
  }

  async function handleLogin() {
    try {
      const data = await loginUser(email, password)
      localStorage.setItem("token", data.token)
      login(data.user.id)

      enqueueSnackbar("Login realizado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      })

      if (data.user.role === "admin") {
        return navigate("/admin/requests")
      }

      navigate("/UserHome")



    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      })

    }
  }

  async function googleLogin(credentialResponse: any) {
    const idToken = credentialResponse.credential;

    const res = await fetch("http://localhost:3000/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();
    localStorage.setItem("token", data.token)
    login(data.userId)

    if(!data.token || !data.userId) return alert("Erro no servidor")

    navigate("/UserHome");
  }

  return (

    <div className="flex h-screen w-full bg-white text-zinc-900">

      {/* ESQUERDA */}
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md bg-neutral-100 border shadow-lg">

          <CardHeader className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-black">
              Bem-vindo de volta ao{" "}
              <span className="text-[#91B338]">Recicle +</span>
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
              onClick={handleLogin}
              className="w-full bg-[#91B338] hover:bg-green-600 text-white"
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
              <GoogleLogin onSuccess={googleLogin} />
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
