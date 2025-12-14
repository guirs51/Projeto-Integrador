import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Button} from "@/components/ui/button"

export default function UserInfo() {
  return (
    <div className="w-full bg-neutral-900 border-1 border-neutral-700 rounded-3xl">
      <div className="flex items-center gap-6 p-6">

        {/* FOTO */}
        <img
          className="w-32 h-32 rounded-full object-cover"
          src="https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2019%2F02%2F15%2F13%2FLogo-253101_25301_135901956_795631266.jpg"
          alt="foto"
          id="img"
        />

        {/* INFO */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-white scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Tata Gás</h1>

          <p className="text-neutral-300 max-w-xl text-sm leading-7 [&:not(:first-child)]:mt-4">
            O gás que leva tranquilidade e sabor para sua cozinha. Segurança em primeiro lugar.
          </p>

          <span className="text-neutral-400 text-sm">
            Rua Tal, 123
          </span>
        </div>
     <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
      </div>
      
    </div>
  );
}

