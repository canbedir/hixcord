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
import qs from "query-string"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export const DeleteChannelModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter()

  const isModalOpen = isOpen && type === "deleteChannel";
  const { server,channel } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async()=>{
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url:`/api/channels/${channel?.id}`,
        query:{
          serverId: server?.id
        }
      })

      await axios.delete(url)

      onClose()
      router.refresh()
      window.location.reload();
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
            <span>Delete &apos;{channel?.name}&apos; </span>
          </DialogTitle>
          <DialogDescription className="text-slate-200/95 text-start text-1xl" >
            Are you sure you want to delete <span className="font-semibold text-white text-1xl">#{channel?.name}</span>? This action connot be undone.
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
            Delete Channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
