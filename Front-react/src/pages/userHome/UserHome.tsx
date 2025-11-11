import React, { useState } from 'react';
import NewRecyclingModal from '../../components/NewRecyclingModal';
import RecyclingCard from '../../components/RecyclingCard';
import './UserHome.css'

interface RecyclingData {
    material: string;
    quantidade: string;
    localizacao: string;
}

export default function ProfilePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recyclingHistory, setRecyclingHistory] = useState<RecyclingData[]>([]);

    const handleAddRecycling = (newItem: RecyclingData) => {
        setRecyclingHistory((prev) => [...prev, newItem]);
    };

    return (
        <div className="profile-container">
            <h1>Perfil do Usuário</h1>

            <div className='usuario-info'>
                <img src="https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnRhJTIwdHJvcGljYWx8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" alt="" id="img" />
               
                <div className="bio">
                    <h1 className="big-text">Fulano de Tal </h1>
                    <h2>Hi, my names is Fulana! im developer sistems and i have 18 years old.</h2>
                </div>
            </div>

                <hr className='line'></hr>

            <div className='btn'>
                <button className="circle-button" onClick={() => setIsModalOpen(true)}>+</button>
                <span>Game bookings</span>
            </div>


            <div className="card-grid">
                {recyclingHistory.map((item, index) => (
                    <RecyclingCard
                        key={index}
                        material={item.material}
                        quantidade={item.quantidade}
                        localizacao={item.localizacao}
                    />
                ))}
            </div>

            <NewRecyclingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddRecycling}
            />
        </div>
    );
}
