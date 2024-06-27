import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import Alert from "@/Components/Alert";

import Table from '@/Components/user/Table'

export default function UserIndex({auth,users,flash})
{
    const alert = flash?.alert;
    
    return(
        <AdminLayout user={auth.user} >
            <Head title="Usuarios" />
            {alert && <Alert key={alert.id} message={alert.message} severity={alert.severity} />}
            <div className="m-4 p-4 bg-white">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-gray-500">Lista de Usuarios</h2>
                    <Link href={route('admin.user.create')}>
                        <Button variant="contained" startIcon={ <AddRoundedIcon/> } >
                            Crear Usuario
                        </Button>
                    </Link>
                </div>

                <Table users={users} />
            </div>
        </AdminLayout>
    )
}
