import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { materialsTable } from "./materialsTable"

interface Material {
  name: string
  importance: number
  points: number
}

export default function Materials() {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="scale-95">
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Material</TableHead>
            <TableHead className="font-semibold">Importância</TableHead>
            <TableHead className="font-semibold">Pontos</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {materialsTable.map((item: Material, index: number) => (
            <TableRow
              key={index}
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
