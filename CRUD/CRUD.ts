class Client {
    private nameClient: string;
    private email: string;
    private cpf: string;
    private clientPassword: string;
    private metasClient: string;
    private idClient: number;
    private pointsClient: number;

    constructor(nameClient: string, email: string, cpf: string, clientPassword: string, metasClient: string, idClient: number, pointsClient: number) {
        this.nameClient = nameClient;
        this.email = email;
        this.cpf = cpf;
        this.clientPassword = clientPassword;
        this.metasClient = metasClient;
        this.idClient = idClient;
        this.pointsClient = pointsClient;
    }

    getNome(): string {
        return this.nameClient;
    }

    getEmail(): string {
        return this.email;
    }

    getCpf(): string {
        return this.cpf;
    }

    getPassword(): string {
        return this.clientPassword;
    }

    getMetas(): string {
        return this.metasClient;
    }

    getId(): number {
        return this.idClient;
    }

    getPoints(): number {
        return this.pointsClient;
    }

    setNome(text: string): void {
        this.nameClient = text;
    }

    setEmail(text: string): void {
        this.email = text;
    }

    setCpf(text: string): void {
        this.cpf = text;
    }

    setPassword(text: string): void {
        this.clientPassword = text;
    }

    setMetas(text: string): void {
        this.metasClient = text;
    }

    setId(num: number): void {
        this.idClient = num;
    }

    setPoints(num: number): void {
        this.pointsClient = num;
    }
}

class Address {
    idAddress: number;
    street: string;
    country: string;
    state: string;
    town: string;
    numberAddress: number;
    fkClient: number;
    fkCompany: number;

    constructor(street: string, country: string, state: string, town: string, numberAddress: number, fkClient: number, fkCompany: number, idAddress: number) {
        this.idAddress = idAddress;
        this.street = street;
        this.country = country;
        this.state = state;
        this.town = town;
        this.numberAddress = numberAddress;
        this.fkClient = fkClient;
        this.fkCompany = fkCompany;
    }

    getCountry(): string {
        return this.country;
    }

    getStreet(): string {
        return this.street;
    }

    getState(): string {
        return this.state;
    }

    getNumberAddress(): number {
        return this.numberAddress;
    }

    getTown(): string {
        return this.town;
    }

    getId(): number {
        return this.idAddress;
    }

    getFkClient(): number {
        return this.fkClient;
    }

    getFkCompany(): number {
        return this.fkCompany;
    }

    setCountry(text: string): void {
        this.country = text;
    }

    setStreet(text: string): void {
        this.street = text;
    }

    setState(text: string): void {
        this.state = text;
    }

    setNumberAddress(num: number): void {
        this.numberAddress = num;
    }

    setTown(text: string): void {
        this.town = text;
    }

    setId(num: number): void {
        this.idAddress = num;
    }

    setFkClient(num: number): void {
        this.fkClient = num;
    }

    setFkCompany(num: number): void {
        this.fkCompany = num;
    }
}

class Clients {
    Clientes: Client[] = [];
    Address: Address[] = [];

    addClient(client: Client): void {
        this.Clientes.push(client);
    }

    addAddress(address: Address): void {
        this.Address.push(address);
    }
}

// CREATE
const clients = new Clients();

function criarUser(name: string, email: string, cpf: string, password: string, metas: string): void {
    const id = clients.Clientes.length + 1;
    const points = 0;

    const newUser = new Client(name, email, cpf, password, metas, id, points);
    clients.addClient(newUser);

    console.log(newUser);
}

function criarAddress(street: string, country: string, state: string, town: string, numberAddress: number, fkClient: Client): void {
    const idEndereco = clients.Address.length + 1;
    const companyFk = 0;
    const Clientfk = fkClient.getId();

    const newAddress = new Address(street, country, state, town, numberAddress, Clientfk, companyFk, idEndereco);
    clients.addAddress(newAddress);
}

// Obter o primeiro cliente da lista
criarUser("Guilherme", "gui@", "000", "123", "ajudar o meio ambiente");
const primeiroCliente = clients.Clientes[0];

criarAddress("Maua", "brasil", "Rio Grande Do Sul", "São Leopoldo", 666, primeiroCliente);
const primeiroEndereco = clients.Address[0];

// READ
function getReadClient(client: Client): void {
    console.log("Nome:", client.getNome());
    console.log("Email:", client.getEmail());
    console.log("CPF:", client.getCpf());
    console.log("Senha:", client.getPassword());
    console.log("Metas:", client.getMetas());
    console.log("Pontos:", client.getPoints());
}

function getReadAddress(address: Address): void {
    console.log("Pais:", address.getCountry());
    console.log("Estado:", address.getState());
    console.log("Cidade:", address.getTown());
    console.log("Rua:", address.getStreet());
    console.log("Numero:", address.getNumberAddress());
}

getReadClient(primeiroCliente);

getReadAddress(primeiroEndereco);


// UPDATE
function updateUser(client: Client): void {
    client.setNome("gui");
    client.setEmail("guilherme@gmes");
    client.setPassword("12345");
    client.setCpf("0204");
    client.setMetas("ajudar as matas");
}

function updateAddress(address: Address): void {
    address.setCountry("Sao leopoldo");
    address.setState("Brasil");
    address.setTown("lua");
    address.setStreet("japao");
    address.setNumberAddress(555);
}

updateUser(primeiroCliente);

updateAddress(primeiroEndereco);

getReadClient(primeiroCliente);

getReadAddress(primeiroEndereco);


// DELETE
function deletarUser(client: Client): void {
    for (let i = 0; i < clients.Clientes.length; i++) {
        if (client.getId() === clients.Clientes[i].getId()) {
            clients.Clientes.splice(i, 1);
        }
    }
}

function deletarAddress(address: Address): void {
    for (let i = 0; i < clients.Address.length; i++) {
        if (address.getId() === clients.Address[i].getId()) {
            clients.Address.splice(i, 1);
        }
    }
}

deletarUser(primeiroCliente);
deletarAddress(primeiroEndereco);