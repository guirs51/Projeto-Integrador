import React, { useEffect, useState } from "react";
import NewRecyclingModal from "../../components/NewRecyclingModal";
import RecyclingCard from "../../components/RecyclingCard";
import "./UserHome.css";
import "../../global.css";
import PointsChart from "../../components/PointsChart";

import {
  ArchiveRestore,
  PlusCircle,
  Sun,
  Moon
} from "lucide-react";

import { useLocation } from "react-router";

export default function UserHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recyclingHistory, setRecyclingHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const location = useLocation();
  const { id, mensagem } = location.state || {};
  console.log("Voce " + mensagem + " um " + id);

 
  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));

    if (savedMode) {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    document.body.classList.toggle("dark", newMode);

    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };


  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        });

        const data = await response.json();

        if (!response.ok) {
          alert(
            "Erro ao buscar dados do usuário: " +
              response.status +
              " " +
              data.mensagem
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

  // ----------------------------
  // 🔥 ADICIONAR RECICLAGEM
  // ----------------------------
  const handleAddRecycling = (newItem) => {
    setRecyclingHistory((prev) => [...prev, newItem]);
  };

  const points = recyclingHistory.length * 10;

  return (
    <div className="container">

      {/* MODAL */}
      <NewRecyclingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRecycling}
      />

      {/* USUÁRIO */}
      <div className="usuario-info">
        <img
          src="https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&q=60&w=3000"
          alt="foto"
          id="img"
        />

        <div className="bio">
          <h1 className="big-text">{user?.name || "Usuário"}</h1>
          <h2>
            Hi, my name is Fulana! I'm a system developer and I am 18 years
            old.
          </h2>
          <h3>Rua Tal, 123</h3>
        </div>
      </div>

    
      <hr className="line" />

      {/* BOTÃO DE ADICIONAR */}
      <div className="btn flex items-center gap-2">
        <PlusCircle
          onClick={() => setIsModalOpen(true)}
          size={20}
          color="black"
        />
        <span>Adicionar reciclagem</span>
      </div>

      {/* ÁREA DOS REGISTROS */}
      <div className="container_area_registers">
        <div className="registers_area">
          <div className="registers_title">
            <ArchiveRestore />
            <h1>Área dos Registros Pendentes</h1>
          </div>

          <div className="registers_log sem-scrollbar">
            {recyclingHistory.length === 0 ? (
              <div className="nothing_registers">
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

        {/* PONTUAÇÃO */}
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
