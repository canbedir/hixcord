"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useModal } from "../../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export const DeleteServerModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter()

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async()=>{
    try {
      setIsLoading(true)

      await axios.delete(`/api/servers/${server?.id}`)

      onClose()
      router.refresh()
      router.push("/")
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-start font-bold">
            <span>Delete '{server?.name}' </span>
          </DialogTitle>
          <DialogDescription className="text-slate-200/95 text-start text-1xl" >
            Are you sure you want to delete <span className="font-semibold text-white text-1xl">{server?.name}</span>? This action connot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="p-3 flex items-center">
          <Button variant={"link"} className="text-white"
           disabled={isLoading}
           onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant={"default"} size={"default"} className="bg-red-500 text-white hover:bg-red-500/80"
           disabled={isLoading}
           onClick={onClick}
          >
            Delete Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
