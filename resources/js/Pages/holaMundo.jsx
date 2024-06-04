import Layout from './Layout'
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Welcome({auth}) {

  const isAdmin = auth.permissions.find(permission => permission.name === 'isAdmin' );

  return (
    <AdminLayout user={auth.user} >
      <Head title="Welcome" />
      
      <div className='m-4 p-4 bg-white space-y-4'>
        <h1 className='text-xl font-bold'>Welcome</h1>
        <p >Hello <strong>{auth.user.name}</strong>, welcome to your first Inertia app!</p>

        <p>Roles:</p>

        <div>
          {auth.roles.map((rol) => ( <p key={rol} className='p-2 bg-slate-300 first:rounded-t-lg last:rounded-b-lg'>{rol}</p> ))}
        </div>


        <p>Permisos:</p>

        <div>
          {auth.permissions.map((permiso) => (
            <p key={permiso.name} className='p-2 bg-slate-300 first:rounded-t-lg last:rounded-b-lg'>{permiso.name}</p>
          ) )}
        </div>

        {isAdmin && ( <p className='font-bold text-xl' >Este usuarios es un admin</p> )}
        

      </div>
    </AdminLayout>
  )
}