import Layout from './Layout'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Welcome({auth}) {
  return (
    <AuthenticatedLayout user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hola Mundo</h2>} >
      <Head title="Welcome" />
      <h1>Welcome</h1>
      <p>Hello <strong>{auth.user.name}</strong>, welcome to your first Inertia app!</p>
    </AuthenticatedLayout>
  )
}