import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Alert from "@/Components/Alert";

import Table from "@/Pages/Admin/User/componets/Table";

export default function UserIndex({ auth, users, flash }) {
    const alert = flash?.alert;

    return (
        <AdminLayout auth={auth}>
            <Head title="Usuarios" />
            {alert && (
                <Alert
                    key={alert.id}
                    message={alert.message}
                    severity={alert.severity}
                />
            )}
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">Lista de Usuarios</h2>
                <Link href={route("admin.user.create")}>
                    <Button variant="contained" startIcon={<AddRoundedIcon />}>
                        Crear Usuario
                    </Button>
                </Link>
            </div>

            <Table users={users} />
        </AdminLayout>
    );
}
