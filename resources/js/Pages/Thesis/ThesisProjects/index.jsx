import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Alert from "@/Components/Alert";
import Table from "@/Pages/Thesis/ThesisProjects/components/Table";

// import Table from "@/Pages/Admin/User/componets/Table";
import { useTranslation } from "react-i18next";


export default function ThesisProjectIndex({ auth, thesis, flash }) {
    const alert = flash?.alert;

    const { t } = useTranslation("common");

    return (
        <AdminLayout auth={auth}>
            <Head title={("Proyectos de Tesis")} />
            {alert && (
                <Alert
                    key={alert.id}
                    message={alert.message}
                    severity={alert.severity}
                />
            )}
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500 capitalize">
                    {t("Listado De Proyectos De Tesis")}
                </h2>
                                <div className="flex items-center space-x-2"> {/* O space-x-0 si no quieres espacio */}
                    <Link href={route("Thesis.create")}>
                        <Button variant="contained" startIcon={<AddRoundedIcon />}>
                            {"Agregar proyecto de tesis"}
                        </Button>
                    </Link>
                </div>

            </div>
            <Table thesis={thesis} />
        </AdminLayout>
    );
}
