export interface User {
    id: number
    name: string
    email: string
    cpf: string
    fotoPerfil?: string
}

export async function updateUser(userId: number, token: string, update: Partial<User>) {
    const response = await fetch(
        `http://localhost:3000/users/update/${userId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(update),
        }
    )

    if (!response.ok) {
        alert("Erro ao atualizar usuário")
        return
    }

    const data = await response.json()
    return data
}


export async function deleteUser(userId: number, token: string) {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            alert("Erro ao deletar usuário")
            return
        }
    }
    catch (e) {
        console.log(e)
    }

}