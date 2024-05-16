import Layout from './Layout'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Welcome({auth}) {
  return (
    <AuthenticatedLayout user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hola Mundo</h2>} >
      <Head title="Welcome" />
      
      <div className='m-4 p-4 bg-white'>
        <h1>Welcome</h1>
        <p>Hello <strong>{auth.user.name}</strong>, welcome to your first Inertia app!</p>

        <p>Roles:</p>

        {auth.roles.map((rol) => ( <p key={rol} className='p-2 bg-slate-300 rounded-sm'>{rol}</p> ))}

        <p>Permisos:</p>
        {auth.permissions.map((permiso) => (
          <p key={permiso.name} className='p-2 bg-slate-300 rounded-sm'>{permiso.name}</p>
        ) )}

        {console.log(auth.permissions)}

      </div>
    </AuthenticatedLayout>
  )
}