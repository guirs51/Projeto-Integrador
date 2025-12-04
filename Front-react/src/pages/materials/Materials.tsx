import React from "react";
import { materials,Material } from "./materialsTable";

export default function MaterialsTable() {
  return (
    <div className="">
    

      <div className="scale-90 ">
        <table className="w-full h-200 text-left  ">
          <thead className=" mt ">
            <tr >
              <th className="px-4 py-3 font-semibold">Material</th>
              <th className="px-4 py-3 font-semibold">Importância</th>
              <th className="px-4 py-3 font-semibold">Pontos</th>
            </tr>
          </thead>

          <tbody>
            {materials.map((item: Material, index: number) => (
              <tr
                key={index}
                className="border-b border-gray-500 dark:border-gray-200 hover:bg-green-500/300 dark:hover:bg-green-500/3 transition"
              >
                <td className="px-4 py-3">{item.name}</td>

                <td className="px-4 py-3">
                  {"⭐".repeat(item.importance)}
                </td>

                <td className="px-4 py-3 font-bold">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
