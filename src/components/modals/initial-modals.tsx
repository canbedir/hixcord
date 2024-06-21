"use client"

import{Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle}
from "@/components/ui/dialog"
import{Form,FormControl,FormField, FormItem, FormLabel, FormMessage}
from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import FileUpload from "../file-upload"
import axios from "axios"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name : z.string().min(1,{
        message:"Server name is required."
    }),
    imageUrl: z.string().min(1,{
        message:"Server image is required"
    })
})

export const InitialModal = () => {

    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter()

    useEffect(()=>{
        setIsMounted(true)
    },[])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
            imageUrl:"",
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        try {
            await axios.post("/api/servers",values)

            form.reset();
            router.refresh();
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    if(!isMounted){
        return null
    }

  return (
    <Dialog open>
        <DialogContent className="bg-white text-black dark:bg-[#313338] dark:text-white p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                    Customize your server
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
                    Give your server a personality with a name and an image. You can always change it later.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                 className="space-y-8"
                >
                  <div className="space-y-8 px-6">
                    <div className="flex items-center justify-center text-center">
                        <FormField control={form.control} name="imageUrl" render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <FileUpload endpoint="imageUploader" value={field.value} onChange={field.onChange}/>
                                </FormControl>
                            </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="name" render={({field})=>(
                        <FormItem>
                            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                Server name
                            </FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} placeholder="Enter server name" {...field} 
                                className="bg-zinc-300/50 dark:bg-zinc-700/75 dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                  </div>
                  <DialogFooter className="bg-gray-100 dark:bg-[#313338] px-6 py-4">
                    <Button variant={"primary"} disabled={isLoading}>
                        Create
                    </Button>
                  </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}
