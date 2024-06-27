import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import Alert from "@/Components/Alert";

import Table from '@/Components/Role/Table'

export default function RoleIndex({auth,roles,flash})
{
    const alert = flash?.alert;
    
    return(
        <AdminLayout user={auth.user} >
            <Head title="Roles" />
            {alert && <Alert key={alert.id} message={alert.message} severity={alert.severity} />}
            <div className="m-4 p-4 bg-white">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-gray-500">Lista de Roles</h2>
                    <Link href={route('admin.role.create')}>
                        <Button variant="contained" startIcon={ <AddRoundedIcon/> } >
                            Crear Rol
                        </Button>
                    </Link>
                </div>

                <Table roles={roles} />
            </div>
        </AdminLayout>
    )
}

