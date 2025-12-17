import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { materialsTable } from "./materialsTable"
import { useEffect, useState } from "react"

interface Material {
  id: number
  name: string
  importance: number
  points: number
}

export default function Materials() {

  const [material, setMaterial] = useState<Material[]>([])

  useEffect(() => {
    const getMaterial = async () => {
      try {
        const response = await fetch("http://localhost:3000/material/", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        })

        const data = await response.json()
        if (!response.ok) {
          alert("Houve um Erro")
          return
        }
        setMaterial(data)

      } catch (e) {
        console.log(e)
      }
    }

    getMaterial()

  }, [])
  return (
    <div className="h-full w-full overflow-x-auto p-20 ">
      <Table className="scale-95">
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Material</TableHead>
            <TableHead className="font-semibold">Importância</TableHead>
            <TableHead className="font-semibold">Pontos</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {material.map((item: Material) => (
            <TableRow
              key={item.id}
              className="border-b hover:bg-green-500/10 dark:hover:bg-green-500/20 transition"
            >
              <TableCell>{item.name}</TableCell>

              <TableCell>
                {Array.from({ length: item.importance }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </TableCell>

              <TableCell className="font-bold">{item.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
