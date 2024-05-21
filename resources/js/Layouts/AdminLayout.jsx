import React from 'react';

export default function AdminLayout({children})
{
    return(
        <div className='min-h-screen bg-gray-100'>


            <main>{children}</main>

        </div>
    )
}