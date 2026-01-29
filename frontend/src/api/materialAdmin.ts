export async function getMaterial() {
    try {
        const response = await fetch("http://localhost:3000/material/", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        return response.json()
    } catch (e) {

    }
}

export async function postMaterial(nomeMaterial: string, pontos: string, importancia: string) {
    try {
        const response = await fetch("http://localhost:3000/material/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: nomeMaterial, points: Number(pontos), importance: Number(importancia) })
        })

        const data = response.json()

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }
        
        return data
    } catch (e) {
        console.log(e)
    }
}

export async function deleteMaterial(id: number) {
    try {
        const response = await fetch(`http://localhost:3000/material/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
    } catch (e) {
        console.log(e)
    }
}