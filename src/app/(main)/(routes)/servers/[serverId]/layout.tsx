import ServerSidebar from '@/components/server/server-sidebar'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { RedirectToSignIn } from '@clerk/nextjs'
import { redirectToSignIn } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

interface ServerIdLayoutProps{
    children: React.ReactNode
    params: {serverId:string}
}



const ServerIdLayout = async({children,params}:ServerIdLayoutProps) => {

    const profile = await currentProfile()

    if(!profile){
        return <RedirectToSignIn/>
    }

    const server = await db.server.findUnique({
        where:{
            id:params.serverId,
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    if(!server){
        return redirect("/")
    }

  return (
    <div className='h-screen'>
        <div className='hidden md:flex h-screen w-60 z-20 flex-col fixed inset-y-0'>
            <ServerSidebar serverId={params.serverId}/>
        </div>

        <main className='h-screen md:pl-60'>
            {children}
        </main>
    </div>
  )
}

export default ServerIdLayout