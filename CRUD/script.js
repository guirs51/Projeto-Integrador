    // script.js
    import { Client } from './model.js';
    import { Company } from './model.js';
    import { Address } from './model.js';

    const clients = []; // Array para armazenar os clientes
    const address = []; // Array para armazenar os endereços
    const company = []; // Array para armazenar as empresas

    // Captura o formulário usuario  e adiciona um evento de submit
    document.getElementById('clientForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os valores dos inputs
        const nameClient = document.getElementById('nameClient').value;
        const email = document.getElementById('email').value;
        const cpf = document.getElementById('cpf').value;
        const clientPassword = document.getElementById('clientPassword').value;
        const country = document.getElementById('coutry').value;
        const state = document.getElementById('state').value;
        const town = document.getElementById('town').value;
        const street = document.getElementById('street').value;
        const numberAddress = document.getElementById('numberAddres');

        //variavel para endereço do usuario  não ter um ID de empresa
        const notCompany = "";

        // Cria uma nova instância de Client
        const newClient = new Client(nameClient, email, cpf, clientPassword, null, clients);

        // Criar um nova instância de Address
        const newAddress = new Address(country, state, town, street, numberAddress, clients, notCompany, address);

        // Adiciona o novo cliente ao array
        clients.push(newClient);

        address.push(newAddress)

        // Exibe os  no console 
        console.log(clients);
        console.log(newAddress);

        // Limpa o formulário após o cadastro
        document.getElementById('clientForm').reset();

        // Exibe uma mensagem de sucesso
        alert('Cliente cadastrado com sucesso!');
    });

// Função VerUsuarios
function VerUsuarios() {
    // Seleciona o elemento onde o conteúdo será exibido
    const conteudoDiv = document.getElementById("conteudo");

    // Cria uma lista de clientes cadastrados
    const clientesHTML = clients.map(cliente => `
        <div>
            <h3>${cliente.nameClient}</h3>
            <p>Email: ${cliente.email}</p>
            <p>CPF: ${cliente.cpf}</p>
        </div>
    `).join('');

    // Altera o conteúdo do elemento
    conteudoDiv.innerHTML = `
        <h1>Clientes Cadastrados</h1>
        ${clientesHTML}
    `;
}

// Função para exibir o formulário de edição
function EditarCliente() {
    const editarForm = document.getElementById('editarClienteForm');
    editarForm.style.display = 'block'; // Exibe o formulário
}

// Captura o formulário de edição e adiciona um evento de submit
document.getElementById('formEditarCliente').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos inputs
    const cpf = document.getElementById('editarCpf').value;
    const novoNome = document.getElementById('editarNome').value;
    const novoEmail = document.getElementById('editarEmail').value;

    // Validação básica dos campos
    if (!cpf || !novoNome || !novoEmail) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Encontra o cliente no array pelo CPF
    const clienteIndex = clients.findIndex(cliente => cliente.cpf === cpf);

    if (clienteIndex === -1) {
        alert('Cliente não encontrado.');
        return;
    }

    // Atualiza os dados do cliente
    clients[clienteIndex].nameClient = novoNome;
    clients[clienteIndex].email = novoEmail;

    // Exibe uma mensagem de sucesso
    alert('Cliente atualizado com sucesso!');

    // Atualiza a exibição dos clientes
    VerUsuarios();

    // Limpa o formulário de edição
    document.getElementById('formEditarCliente').reset();

    // Oculta o formulário de edição
    document.getElementById('editarClienteForm').style.display = 'none';
});

// Torna a função VerUsuarios acessível globalmente
window.VerUsuarios = VerUsuarios;
window.EditarCliente = EditarCliente;




/*
// Captura o formulário de empresa e adiciona um evento de submit
document.getElementById('formEmpresa').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    //captura os valores dos inputs
    const nameCompany = document.getElementById('nomeEmpresa').value;
    const cnpj = document.getElementById('cnpj').value;
    const country = document.getElementById('coutryEmpresa').value;
    const state = document.getElementById('stateEmpresa').value;
    const town = document.getElementById('townEmpresa').value;
    const street = document.getElementById('streetEmpresa').value;
    const numberAddress = document.getElementById('numberAddresEmpresa');

    //variavel que mantes sempre o mesmo numero do fkClient
    const notCliet = "";

    // Cria uma nova instância de Client
    const newCompany = new Company(nameCompany, cnpj, company);

    // Criar um nova instância de Address
    const newAddress = new Address(country, state, town, street, numberAddress, notCliet, company, address)

    // Adiciona a nova empresa ao array
    clients.push(newCompany);

    address.push(newAddress);

    // Exibe os  no console 
    console.log(company);
    console.log(newAddress);

    // Limpa o formulário após o cadastro
    document.getElementById('formEmpresa').reset();

    // Exibe uma mensagem de sucesso
    alert('Empresa cadastrada com sucesso!');
});
*/
