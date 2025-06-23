import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Alert from "@/Components/Alert";

import { useTranslation } from "react-i18next";
import Table from "@/Pages/Thesis/StudentStatuses/components/Table";

export default function StudentStatusesIndex({ auth, studentStatuses, flash }) {
    const alert = flash?.alert;

    const { t } = useTranslation("common");

    return (
        <AdminLayout auth={auth}>
            <Head title={("Estatus")} />
            {alert && (
                <Alert
                    key={alert.id}
                    message={alert.message}
                    severity={alert.severity}
                />
            )}
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500 capitalize">
                    {t("Lista De Estatus de Tesistas")}
                </h2>

               
                    <Link href={route("studentStatuses.create")}>
                        <Button variant="contained" startIcon={<AddRoundedIcon />}>
                            {"Agregar"}
                        </Button>
                    </Link>

            </div>
            <Table studentStatuses={studentStatuses} />

        </AdminLayout>
    );
}
