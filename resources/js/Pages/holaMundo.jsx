import Layout from './Layout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Welcome() {
  return (
    <Layout>
      <Head title="Welcome" />
      <h1>Welcome</h1>
      <p>Hello World, welcome to your first Inertia app!</p>
    </Layout>
  )
}