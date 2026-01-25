
import { useState } from "react"
import { cn } from "@/lib/utils" // padrão do shadcn

type RecycleBinProps = {
  label: string
  color: string
  size?: "sm" | "md" | "lg"
}

const sizes = {
  sm: {
    lid: "w-14 h-2",
    body: "w-24 h-28 text-sm",
  },
  md: {
    lid: "w-30 h-6",
    body: "w-30 h-30",
  },
  lg: {
    lid: "w-44 h-7",
    body: "w-34 h-38 text-lg",
  },
}

export function RecycleBin({
  label,
  color,
  size = "md",
}: RecycleBinProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      {/* Tampa */}
      <div
        className={cn(
          "rounded-t-lg origin-left transition-transform duration-300",
          sizes[size].lid,
          color,
          open ? "-rotate-45" : "rotate-0"
        )}
      />

      {/* Corpo */}
      <div
        className={cn(
          "rounded-b-xl flex items-center justify-center text-white font-semibold",
          sizes[size].body,
          color
        )}
      >
        {label}
      </div>
    </div>
  )
}
