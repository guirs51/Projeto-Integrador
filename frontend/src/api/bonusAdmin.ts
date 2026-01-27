export async function postBonus(name: string, points: number, descricao: string) {
    try {
        const respose = await fetch("http://localhost:3000/prize/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ namePrize: name, prizePoints: points, descricao: descricao })
        })
    } catch (e) {
        console.log(e)
    }
}


export async function getBonus() {
    try {
        const respose = await fetch("http://localhost:3000/prize/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        return respose.json()
    } catch (e) {
        console.log(e)
    }
}