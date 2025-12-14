import { Input } from "@/components/ui/input"

interface DataPasswordFieldProps {
  title: string
  info?: string
}

export default function DataPasswordField({ title, info }: DataPasswordFieldProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <label className="text-sm text-muted-foreground">
        {title}
      </label>

      <Input
        type="password"
        disabled
        value={info ?? ""}
        placeholder={info}
        className="h-8 text-center disabled:opacity-100 disabled:text-foreground"
      />
    </div>
  )
}
