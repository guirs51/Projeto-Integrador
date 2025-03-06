// Client.js
export class Client {
    constructor(nameClient, email, cpf, clientPassword, metasClient, clientsArray) {
        this.idClient = clientsArray.length + 1; // Gera o ID com base no número de clientes no array
        this.nameClient = nameClient;
        this.email = email;
        this.cpf = cpf;
        this.clientPassword = clientPassword;
        this.metasClient = null ;
        this.pointsClient = 0;
    }
};

export class Company {
    constructor(nameCompany, cnpj, companyArray){
        this.idCompany = companyArray.length + 1; // Gera o ID com base no número de empresas  no array
        this.nameCompany = nameCompany;
        this.cnpj = cnpj; 
    }
}

export class Address {
    constructor(country, state, town, street , numberAddress, clientsArray, companyArray,addressArray){
        this.idAddress = addressArray.length + 1; // Gera o ID com base no número de endereços no array
        this.street = street;
        this.country = country;
        this.state = state;
        this.town = town; 
        this.numberAddress = numberAddress;
        this.fkClient = clientsArray.length + 1 || clientsArray;
        this.fkCompany = companyArray.length + 1 || companyArray;
    }
}