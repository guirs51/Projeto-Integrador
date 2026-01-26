export async function getAll() {
    try {
        const respose = await fetch('http://localhost:3000/delivery/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await respose.json()

        const parsed: Request[] = data.map((item: any) => ({
            id_request: item.id_request,
            recycling: item.recycling,
            status: item.status,
            quantity: item.quantity,
            user: {
                name: item.name,
                cpf: item.cpf,
                email: item.email,
            },
        }))

        // setRequests(parsed)
        if (!respose.ok) {
            alert("Erro na requesição")
            return
        }
        // setRequests([...data])

        return data
    } catch (e) {
        console.log(e)
    }
}


export async function getReject(id: string) {
    try {
        const response = await fetch(`http://localhost:3000/delivery/reject/${Number(id)}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            alert("Houve um Erro")
            return
        }

    } catch (e) {
        console.log(e)
    }
}


export async function getAccept(id: string) {
    try {
        const response = await fetch(`http://localhost:3000/delivery/accept/${Number(id)}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!response.ok) {
            alert("Houve um Erro")
            return
        }

    } catch (e) {
        console.log(e)
    }
}