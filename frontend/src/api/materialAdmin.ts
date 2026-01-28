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

export async function postMaterial(nomeMaterial: string, pontos: number, importancia: string) {
    try {
        const response = await fetch("http://localhost:3000/material/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: nomeMaterial, points: pontos, importance: Number(importancia) })
        })
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