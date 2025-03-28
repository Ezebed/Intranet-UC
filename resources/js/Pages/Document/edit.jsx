import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function DocumentEdit({ auth, roles, user }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Crear Usuario" />

            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">Editar Documento</h2>
            </div>
        </AdminLayout>
    );
}
