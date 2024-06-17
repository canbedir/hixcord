"use client"

import { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

export const QueryProvider = ({children}:{children: React.ReactNode}) => {

    const [queryClient] = useState(()=> new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}
