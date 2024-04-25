import { Link } from '@inertiajs/react'
import React from 'react'

export default function Layout({ children }) {
  return (
    <main>
      <header>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </header>
      <article>{children}</article>
    </main>
  )
}