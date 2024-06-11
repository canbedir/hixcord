import React, { ReactNode } from 'react'

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='bg-slate-700 h-screen'>
        {children}
    </div>
  )
}

export default AuthLayout