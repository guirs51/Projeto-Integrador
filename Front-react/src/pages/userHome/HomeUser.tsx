import React, { useEffect, useId, useState } from 'react';
import NewRecyclingModal from '../../components/NewRecyclingModal';
import RecyclingCard from '../../components/RecyclingCard';
import './UserHome.css'
import "../../global.css"
import PointsChart from "../../components/PointsChart";

import {
    ArchiveRestore, PlusCircle, Home,
    Inbox,
    BookOpen,
    CheckSquare,
    Users,
    Settings,
    LogOut,
    Sun,
    Moon,
    User
} from 'lucide-react';
import { data, useLocation } from 'react-router';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';


interface RecyclingData {
    id: number,
    materialType: string;
    quantidade: string;
    deliveryLocal: string;
}

interface User {
    id: number
    name: string
    email: string
    cpf: string
    Points: number
}

export default function ProfilePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [deliveries, setDeliveries] = useState<RecyclingData[]>([]);


    const [user, setUser] = useState<User | null>(null)
    const token = localStorage.getItem("token")

    const { userId } = useAuth()

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(
                        "Erro ao buscar dados do usuário: " +
                        response.status + " " + data.mensagem
                    );
                    return;
                }

                setUser(data)
                setDeliveries(data.delivery)

            } catch (error) {
                console.error("Erro de rede:", error);
            }
        }

        if (userId && token) {
            getUser();
        }
    }, [userId, token]);

    const points = deliveries.length * 10;

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark");
    }

    const postDelivery = async (local: string, materialType: string, quantidade: number) => {
        try {
            const response = await fetch("http://localhost:3000/users/create/delivery", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({ deliveryLocal: local, materialType: materialType, quantidade: Number(quantidade), user: { id: userId }, company: { id: 1} })
            })

            const data = await response.json()

            console.log(userId)

            if (!response.ok) {
                alert("Houve um erro ao adicionar uma reciclagem. Erro: " + data?.mensagem)
                return
            }

            alert("reciclagem criada com sucesso")
            console.log(data)

        } catch (e) {
            console.log("Houve um erro: ", e);
            alert("Erro na conexão com o servidor.");
        }
    }
    return (
        <div className="container">

            <NewRecyclingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={postDelivery}
            />




            <div className='usuario-info'>
                <img src="https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnRhJTIwdHJvcGljYWx8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" alt="" id="img" />

                <div className="bio">
                    <h1 className="big-text">{user?.name || "null"} </h1>
                    <h2>Hi, my names is Fulana! im developer sistems and i have 18 years old.</h2>
                    <h3>rua tal 123</h3>
                </div>
            </div>

            <hr className='line'></hr>

            <div className='btn flex items-center gap-2  '>

                <PlusCircle onClick={() => setIsModalOpen(true)} size={20} color='black' />

                <span>Adicionar reciclagem</span>
            </div>

            {/* <div className="card-grid">
                {recyclingHistory.map((item, index) => (
                    <RecyclingCard
                        key={index}
                        material={item.material}
                        quantidade={item.quantidade}
                        localizacao={item.localizacao}
                    />
                ))}
            </div>



            <div className='points-container'>
                <hr className="line2" />

                <div className='points'>
                    <h1>Pontos acumulados</h1>
                </div>

            </div> */}


            <div className="container_area_registers">


                <div className="registers_area">
                    <div className="registers_title">
                        <ArchiveRestore />
                        <h1>Área dos Registros Pendentes</h1>

                    </div>

                    <div className='registers_log sem-scrollbar'>
                        {deliveries.length < 1 ? (
                            <div className='nothing_registers'>
                                <h2>Você não possui registros</h2>
                            </div>
                        ) : (
                            <div>
                                {deliveries.slice(0, 4).map(item => (
                                    <RecyclingCard
                                        key={item.id}
                                        material={item.materialType}
                                        quantidade={item.quantidade}
                                        localizacao={item.deliveryLocal}
                                    />
                                ))}
                            </div>
                        )}

                    </div>

                </div>


                <div className="points_log">
                    <div className="points_area">
                        <h1>Pontuação</h1>
                        <PointsChart points={points} />
                        <p className="points_number">{points} pontos</p>
                    </div>
                </div>

            </div>

        </div>
    );
}
