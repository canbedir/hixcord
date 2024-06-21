"use client"

import{Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle}
from "@/components/ui/dialog"
import{Form,FormControl,FormField, FormItem, FormLabel, FormMessage}
from "@/components/ui/form"
import { useForm } from "react-hook-form"
import qs from "query-string"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import FileUpload from "../file-upload"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useModal } from "../../../hooks/use-modal-store"

const formSchema = z.object({
    fileUrl: z.string().min(1,{
        message:"Attachment is required"
    })
})

export const MessageFileModal = () => {

    const {isOpen, onClose, type, data} = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type === "messageFile";
    const {apiUrl, query} = data

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            fileUrl:"",
        }
    })

    const handleClose = () =>{
        form.reset();
        onClose();
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })

            await axios.post(url,{
                ...values,
                content: values.fileUrl,
            })

            router.refresh();
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
        <DialogContent className="bg-white text-black dark:text-white dark:bg-[#313338] p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                    Add an attachment
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
                    Send a file as a message
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                 className="space-y-8"
                >
                  <div className="space-y-8 px-6">
                    <div className="flex items-center justify-center text-center">
                        <FormField control={form.control} name="fileUrl" render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <FileUpload endpoint="messageFile" value={field.value} onChange={field.onChange}/>
                                </FormControl>
                            </FormItem>
                        )} />
                    </div>
                    
                  </div>
                  <DialogFooter className="bg-gray-100 dark:bg-[#313338] px-6 py-4">
                    <Button variant={"primary"} disabled={isLoading}>
                        Send
                    </Button>
                  </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}
