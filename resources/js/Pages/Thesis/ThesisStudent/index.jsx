import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Alert from "@/Components/Alert";
import Table from "@/Pages/Thesis/thesisStudent/components/Table";

// import Table from "@/Pages/Admin/User/componets/Table";
import { useTranslation } from "react-i18next";
import File from "./components/File";


export default function ThesisStudentIndex({ auth, thesisStudent, flash }) {
    const alert = flash?.alert;

    const { t } = useTranslation("common");

    return (
        <AdminLayout auth={auth}>
            <Head title={("Tesistas")} />
            {alert && (
                <Alert
                    key={alert.id}
                    message={alert.message}
                    severity={alert.severity}
                />
            )}
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500 capitalize">
                    {t("Listado De Tesistas")}
                </h2>
                                <div className="flex items-center space-x-2"> {/* O space-x-0 si no quieres espacio */}
                    <File />
                    <Link href={route("thesisStudent.create")}>
                        <Button variant="contained" startIcon={<AddRoundedIcon />}>
                            {"Agregar tesista"}
                        </Button>
                    </Link>
                </div>

            </div>
            <Table thesisStudent={thesisStudent} />
        </AdminLayout>
    );
}
