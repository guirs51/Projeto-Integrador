import './Register.css'
import { useEffect, useState } from 'react'



function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const cpf = "0000001"

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
                            <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} />
                        </form>


                        <button onClick={createUser}>Cadastrar</button>

                        <div className='createAccount'>
                            <h1>Já tem uma conta? <a href="./login">Entre agora!</a></h1>
                        </div>

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