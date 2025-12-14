export interface Material {
  name: string
  importance: number
  points: number
}

export const materialsTable: Material[] = [
  { name: "Alumínio (latas)", importance: 5, points: 40 },
  { name: "Cobre", importance: 4, points: 30 },
  { name: "Plástico PET", importance: 4, points: 25 },
  { name: "Plástico PEAD", importance: 4, points: 25 },
  { name: "Papelão", importance: 3, points: 20 },
  { name: "Papéis mistos", importance: 3, points: 20 },
  { name: "Vidro", importance: 2, points: 15 },
  { name: "Plástico PP", importance: 2, points: 15 },
  { name: "Aço / Ferro", importance: 2, points: 10 },
  { name: "Eletrônicos (e-lixo)", importance: 5, points: 50 },
]
