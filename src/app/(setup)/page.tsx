import React from 'react'
import { initialProfile } from '@/lib/initial-profile'
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Profile } from '@prisma/client';
import { InitialModal } from '@/components/modals/initial-modals';

let profile: Profile

const SetupPage = async() => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where:{
        members:{
            some:{
                profileId: (profile as Profile).id
            }
        }
    }
  })

  if(server){
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal/>
}

export default SetupPage