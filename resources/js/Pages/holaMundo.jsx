import Layout from './Layout'
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Welcome({auth}) {

  const isAdmin = auth.permissions.find(permission => permission.name === 'isAdmin' );

  return (
    <AdminLayout user={auth.user} >
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

        {isAdmin && ( <p className='font-bold text-xl' >Este usuarios es un admin</p> )}
        

      </div>
    </AdminLayout>
  )
}