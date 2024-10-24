import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Form from "@/Pages/Admin/Role/components/Form";

export default function RoleEdit({ auth, role, rolePermissions, permissions }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Editar Rol" />
            <div className="m-4 p-4 bg-white">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-gray-500">Editar Rol</h2>
                    <Link href={route("admin.role.index")}>
                        <Tooltip title="Regresar">
                            <IconButton size="large">
                                <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>

                <Form
                    role={role}
                    rolePermissions={rolePermissions}
                    permissions={permissions}
                    method="patch"
                    routeName="admin.role.update"
                />
            </div>
        </AdminLayout>
    );
}
