import React from 'react'

export default function Layout({ children }) {
  return (
    <main>
      <header className='flex gap-x-2'>
        <a className="px-4 py-2 bg-indigo-100 hover:bg-indigo-400 transition-all rounded-md" href="/">Home</a>
        <a className="px-4 py-2 bg-indigo-100 hover:bg-indigo-400 transition-all rounded-md" href="/about">About</a>
        <a className="px-4 py-2 bg-indigo-100 hover:bg-indigo-400 transition-all rounded-md" href="/contact">Contact</a>
      </header>
      <article>{children}</article>
    </main>
  )
}