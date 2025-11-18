import './Register.css'
import { useState } from 'react'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const cpf = "1234"

    const [show, setShow] = useState(false)

    const mostraOcultar = () => {
        setShow(!show)
    }

    async function createUser() {
        try {
            console.log("função chamada")
            const response = await fetch('http://localhost:3000/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, cpf, password })
            })

            const data = await response.json();

            if (!response.ok) {
                alert(`Erro ${response.status}: ${data.message || 'Erro desconhecido'}`);
                return;
            }

            alert("Cadastro realizado com sucesso!");
            console.log("Usuário criado:", data);

            const token = data.token
            alert(token)

            localStorage.setItem("token", token)

        } catch (e) {
            console.log("Houve um erro: " + e);
            alert("Erro de conexão com o servidor: " + e);
        }
    }

    return (
        <>
            <div className='container'>
                <div className='card-esquerda'>
                    <div className='register'>
                        <h1>Bem-vindo ao <span>Recicle +</span></h1>
                        <h2>Junte-se à nossa comunidade na busca por um futuro melhor. <span>future</span>.</h2>
                    </div>
                    <div className='form'>
                        <form >
                            <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                            <input type={show ? "text" : "password"} placeholder='Senha' id='password' onChange={(e) => setPassword(e.target.value)} />
                            <button className='btn-view' onClick={mostraOcultar} type='button'>
                                {!show ? <FaEyeSlash size={20} color='black' /> : <IoEyeSharp size={20} color='black' />}
                            </button>
                        </form>

                        <button onClick={createUser}>Cadastrar</button>

                        <div className='createAccount'>
                            <h1>Já tem uma conta? <a href="./login">Entre agora!</a></h1>
                        </div>

                        <p>Ou continue com</p>
                        
                        <button className='btn-google'><span className='google-logo'><FcGoogle  size={30}/></span></button>
                    </div>
                </div>

                <div className='card-direita'>
                    <h1>Preservar a natureza é o primeiro passo para preservar o futuro.</h1>
                </div>
            </div>
        </>
    )
}

export default Register