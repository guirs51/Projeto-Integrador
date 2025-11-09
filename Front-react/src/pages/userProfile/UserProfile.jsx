import React from "react";
import "./UserProfile.css";
import DataField from "../../components/DataField";
import DataPasswordField from "../../components/DataPasswordField";
import HistoricCard from "../../components/HistoricCard";
import jsonData from './testHistorico.json'

export default function UserProfile() {

    const historic = jsonData["Atividades"];



    return (


        <div id="default">
            <section id="user-head">
                <img src="https://plus.unsplash.com/premium_photo-1663962158765-982d6ad0d006?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnRhJTIwdHJvcGljYWx8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" alt="" id="img" />
                <div className="bio">
                    <h1 className="big-text">Fulano de </h1>
                    <h2>Hi, my names is Fulana! im developer sistems and i have 18 years old.</h2>
                </div>
            </section>

            <section id="user-info">
                <div id="personal-info">
                    <div id="info-header">
                        <h2>Informações</h2>
                        <button id="edit-btn">Editar</button>
                    </div>
                    <hr id="line" />
                    <div id="info-data">
                        <DataField title={"Nome"} info={"Nome"} />
                        <DataField title={"Sobrenome"} info={"Sobrenome"} />
                        <DataField title={"Email"} info={"Email"} />
                        <DataPasswordField title={"Senha"} info={"Senha"} />
                    </div>
                </div>

                <div id="personal-info">

                    <div id="info-header">
                        <h2>Historico</h2>
                        <button id="more-info-btn">Mais Informações</button>
                    </div>

                    <hr id="line" />

                    <div id="info-historic">

                        {historic.map((item, index) => (
                            <HistoricCard
                                key={index}
                                historicTitle={item.Titulo}
                                historicDate={item.Data}
                            />
                        ))}

                    </div>
                </div>


            </section>

            <div id="delete">
                <button id="delete-btn">
                    Deletar conta
                </button>
            </div>

        </div>

    );
}
