export async function getUser(userId: number, token: string) {
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

        return data

    } catch (error) {
        console.error("Erro de rede:", error);
    }
}

export async function createDelivery(local: string, materialType: string, quantidade: number, token: string, userId: string) {
    try {
        const response = await fetch("http://localhost:3000/users/create/delivery", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ deliveryLocal: local, materialType: materialType, quantidade: Number(quantidade), user: { id: Number(userId) } })
        })

        const data = await response.json()

        if (!response.ok) {
            alert("Houve um erro ao adicionar uma reciclagem. Erro: " + data?.mensagem)
            return
        }

        // alert("reciclagem criada com sucesso")
        return data

    } catch (e) {
        console.log("Houve um erro: ", e);
        alert("Erro na conexão com o servidor.");
    }
}