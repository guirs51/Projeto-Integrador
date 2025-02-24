/* RECICLE+: */

CREATE TABLE Client (
    id_client INT PRIMARY KEY,
    name_client Varchar(80),
    email_client Varchar(100),
    CPF Varchar(11),
    client_password Varchar(30),
    Metas_Client INT,
    Points_client INT
);

CREATE TABLE Company (
    id_company INT PRIMARY KEY,
    name_company Varchar(80),
    CNPJ Varchar(80)
);

CREATE TABLE Dump_register (
    id_dump INT PRIMARY KEY,
    qtd_recycle INT,
    bonus INT,
    Type_recicle Varchar(80),
    location Varchar(80),
    fk_client INT,
    fk_Company INT
);

CREATE TABLE Prize (
    id_prize INT PRIMARY KEY,
    prize_points INT,
    name_prize Varchar(80),
    fk_client INT,
    fk_Company INT,
    fk_points_quantity INT
);

CREATE TABLE Address (
    id_Address INT PRIMARY KEY,
    street Varchar(80),
    country Varchar(80),
    state Varchar(80),
    town Varchar(80),
    number_Address INT,
    fk_client INT,
    fk_company INT
);

CREATE TABLE Activity (
    id_activity INT PRIMARY KEY,
    type_activity Varchar(80),
    duration_activity Time,
    fk_client INT
);

CREATE TABLE Points_quantity (
    id_Points INT PRIMARY KEY,
    quantity INT,
    fk_client INT,
    fk_Category INT
);

CREATE TABLE Category (
    id_category INT PRIMARY KEY,
    type_category Varchar(80),
    fk_Acativity INT
);
 
ALTER TABLE Dump_register ADD CONSTRAINT FK_Dump_register_2
    FOREIGN KEY (fk_client)
    REFERENCES Client (id_client)
    ON DELETE RESTRICT;
 
ALTER TABLE Dump_register ADD CONSTRAINT FK_Dump_register_3
    FOREIGN KEY (fk_Company)
    REFERENCES Company (id_company)
    ON DELETE RESTRICT;
 
ALTER TABLE Prize ADD CONSTRAINT FK_Prize_2
    FOREIGN KEY (fk_client)
    REFERENCES Client (id_client)
    ON DELETE RESTRICT;
 
ALTER TABLE Prize ADD CONSTRAINT FK_Prize_3
    FOREIGN KEY (fk_Company)
    REFERENCES Company (id_company)
    ON DELETE RESTRICT;
 
ALTER TABLE Prize ADD CONSTRAINT FK_Prize_4
    FOREIGN KEY (fk_points_quantity)
    REFERENCES Points_quantity (id_Points);
 
ALTER TABLE Address ADD CONSTRAINT FK_Address_2
    FOREIGN KEY (fk_company)
    REFERENCES Company (id_company);
 
ALTER TABLE Address ADD CONSTRAINT FK_Address_3
    FOREIGN KEY (fk_client)
    REFERENCES Client (id_client);
 
ALTER TABLE Activity ADD CONSTRAINT FK_Activity_2
    FOREIGN KEY (fk_client)
    REFERENCES Client (id_client);
 
ALTER TABLE Points_quantity ADD CONSTRAINT FK_Points_quantity_2
    FOREIGN KEY (fk_client)
    REFERENCES Client (id_client);
 
ALTER TABLE Points_quantity ADD CONSTRAINT FK_Points_quantity_3
    FOREIGN KEY (fk_Category)
    REFERENCES Category (id_category);
 
ALTER TABLE Category ADD CONSTRAINT FK_Category_2
    FOREIGN KEY (fk_Acativity)
    REFERENCES Activity (id_activity); 


select * from  client
insert into Client (id_client,name_client,email_client,cpf,client_password,metas_client,points_client)
values 
(1,'Ana julia','anajulia123@gmail.com','123456789','1234432',15,0),
(2,'Adão','adao@gmail.com',1,'adaoPaidetodos',1,999),
(3,'Monsalve','MonsalveGremio@gmail.com',04973053059,'12346786213567',37,200),
(4,'Daniel','danielDokarate@gmail.com','4000307589',34674343676,50,320),
(5,'Luiza','luizaão@gmail.com',3204255308,357737246372749,60,550)

select * from Company
insert into Company(id_company,name_company,cnpj)
values
(1,'jeromel','098764332121'),
(2,'McDonalds',12345687),
(3,'Ford',50505050505),
(4,'BurgerKing',30303030303030),
(5,'Audi',10101010101010)
select * from Dump_register

insert into Dump_register (id_dump,qtd_recycle,bonus,type_recicle,location,fk_client,fk_company)
values
(1,1500,60,'Metal','Orlando',1,1),
(2,6000,50,'Organico','Esteio city',2,2),
(3,7000,90,'Papel','toquio',3,3),
(4,3000,60,'Plastico','Londres',4,4),
(5,6700,30,'Vidro','Xique-Xique',5,5)

select * from activity

insert into activity (id_activity,type_activity,duration_activity,fk_client)
values
(1,'Recolher lixo','00:10:00',1),
(2,'Andar de bmx','02:00:00',2),
(3,'Usar paines solares','24:00:00',3),
(4,'Plantar Arvores','01:30:00',4),
(5,'Catar o lixo na rua','02:00:00',5)

insert into category (id_category,type_category,fk_acativity)
values
(1,'Reciclagem',1),
(2,'Transporte',2),
(3,'Sustentabilidade',3),
(4,'Plantio',4),
(5,'Reciclagem',5)

select * from Category
 select nome_usuario,nome_compensacao from Usuario 
 join compensacao
 on Usuario.id_usuario = compensacao.fk_usuario_id_usuario
	