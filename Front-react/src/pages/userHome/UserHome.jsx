import React, { useEffect, useState } from 'react';
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
import { useLocation } from 'react-router';


interface RecyclingData {
    material: string;
    quantidade: string;
    localizacao: string;
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
    const [recyclingHistory, setRecyclingHistory] = useState<RecyclingData[]>([]);
    const [darkMode, setDarkMode] = useState(false);
    const handleAddRecycling = (newItem: RecyclingData) => {
        setRecyclingHistory((prev) => [...prev, newItem]);

    };

    const [user, setUser] = useState<User | null>(null)
    const token = localStorage.getItem("token")
    const location = useLocation()
    const { id, mensagem } = location.state || {}
    console.log("Voce " + mensagem + " um " + id)

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`, {
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

                setUser(data);
            } catch (error) {
                console.error("Erro de rede:", error);
            }
        }

        if (id && token) {
            getUser();
        }
    }, [id, token]);
    const points = recyclingHistory.length * 10;

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark");
    }
    return (
        <div className="container">

            <NewRecyclingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddRecycling}
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
                        {recyclingHistory.length < 1 ? (
                            <div className='nothing_registers'>
                                <h2>Você não possui registros</h2>
                            </div>
                        ) : (
                            <div>
                                {recyclingHistory.map((item, index) => (
                                    <RecyclingCard
                                        key={index}
                                        material={item.material}
                                        quantidade={item.quantidade}
                                        localizacao={item.localizacao}
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
