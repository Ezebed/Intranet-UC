import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Form from "@/Components/user/Form";

export default function UserEdit({ auth, roles, user, userRoles }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Crear Usuario" />
            <div className="m-4 p-4 bg-white">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-gray-500">Editar Usuario</h2>
                    <Link href={route("admin.user.index")}>
                        <Tooltip title="Regresar">
                            <IconButton size="large">
                                <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>

                <Form
                    user={user}
                    userRoles={userRoles}
                    roles={roles}
                    method="patch"
                    routeName="admin.user.update"
                />
            </div>
        </AdminLayout>
    );
}
