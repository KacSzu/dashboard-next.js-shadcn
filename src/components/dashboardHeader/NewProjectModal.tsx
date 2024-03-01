import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewProjectForm from "./NewProjectForm";
import { useState } from "react";

export default function NewProjectModal() {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add new order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new order</DialogTitle>
          <DialogDescription>Make sure to fill every inputs.</DialogDescription>
        </DialogHeader>

        <NewProjectForm onClose={handleOpen} />
      </DialogContent>
    </Dialog>
  );
}
