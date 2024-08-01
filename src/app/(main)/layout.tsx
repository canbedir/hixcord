import NavigationSidebar from '@/components/navigation/navigation-sidebar'
import React from 'react'

interface MainLayoutProps{
    children: React.ReactNode
}

const MainLayout = async({children}:MainLayoutProps) => {
  return (
    <div className='h-screen'>
            {children}
    </div>
  )
}

export default MainLayout