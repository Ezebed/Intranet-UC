import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Form from "@/Pages/Admin/Permission/components/Form";

export default function PermissionEdit({ auth, permission }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Editar Rol" />
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">Editar Permiso</h2>
                <Link href={route("admin.permission.index")}>
                    <Tooltip title="Regresar">
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>

            <Form
                permission={permission}
                method="patch"
                routeName="admin.permission.update"
            />
        </AdminLayout>
    );
}
