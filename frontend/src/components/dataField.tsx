import { Input } from "@/components/ui/input"

interface DataFieldProps {
  title: string
  info?: string
}

export default function DataField({ title, info }: DataFieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-muted-foreground">
        {title}
      </label>

      <Input
        disabled
        value={info ?? ""}
        placeholder={info}
        className="h-8 disabled:opacity-100 disabled:text-foreground"
      />
    </div>
  )
}
