import React, { useState } from "react";
import "./PointsPage.css";
import {Home, Inbox, BookOpen, CheckSquare, Users, Settings, LogOut, Sun, Moon} from 'lucide-react'

export default function PointsPage() {

    const [dark, setDark] = useState(false);
  return (
    <div className="layout">

   
      <div className="sidebar-container">
                <aside className="sidebar">


                    <nav className="nav">
                        <a className="nav-item ">
                            <Home size={18} /> Home
                        </a>
                        <a className="nav-item active">
                            <Inbox size={18} /> Bonificações
                        </a>
                        <a className="nav-item">
                            <BookOpen size={18} /> Materias
                        </a>
                        <a className="nav-item">
                            <CheckSquare size={18} /> Reciclagens
                        </a>
                        <a className="nav-item">
                            <Users size={18} /> Localização
                        </a>
                    </nav>

                    <div className="bottom">
                        <div className="section-title">CONFIGURAÇÕES</div>

                        <a className="nav-item">
                            <Settings size={18} /> Configurações
                        </a>

                        <a className="nav-item logout">
                            <LogOut size={18} /> Sair

                        </a>
                        <div className="theme-toggle" onClick={() => setDark(!dark)}>
                            {dark ? <Sun size={20} /> : <Moon size={20} />}
                            
                        </div>

                    </div>
                </aside>
            </div>

    
      <main className="content">
        <h1 className="title">Pontos por Material</h1>
        <p className="subtitle">
          Cada material reciclado gera uma quantidade específica de pontos dentro do Recicle+.
        </p>

        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Papel</td>
                <td>10 pontos / unidade</td>
              </tr>
              <tr>
                <td>Plástico</td>
                <td>15 pontos / unidade</td>
              </tr>
              <tr>
                <td>Vidro</td>
                <td>12 pontos / unidade</td>
              </tr>
              <tr>
                <td>Metal</td>
                <td>20 pontos / unidade</td>
              </tr>
              <tr>
                <td>Eletrônicos</td>
                <td>40 pontos / unidade</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
