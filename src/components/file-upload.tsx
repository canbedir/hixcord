"use client"
import React from 'react'
import { UploadDropzone } from '@/app/api/uploadthing/uploadthing'
import "@uploadthing/react/styles.css"
import { X } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps{
    onChange: (url?:string)=> void
    value:string
    endpoint: "imageUploader"
}

const FileUpload = ({endpoint,onChange,value}:FileUploadProps) => {

    const fileType = value?.split(".").pop();
    if(value && fileType !== "pdf"){
        return(
            <div className='relative h-24 w-24'>
                <Image fill src={value} alt='Upload' className='rounded-full' />
                <button onClick={()=> onChange("")} type='button' 
                 className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
                >
                    <X className='h-4 w-4'/>
                </button>
            </div>
        )
    }

  return (
    <UploadDropzone endpoint={endpoint} onClientUploadComplete={(res)=>{
        onChange(res?.[0].url)
    }}
    onUploadError={(error:Error)=>{
        console.log(error)
    }}
    />   
  )
}

export default FileUpload