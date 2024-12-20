import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Alert from "@/Components/Alert";

import Table from "@/Pages/Admin/Role/components/Table";

import { useTranslation } from "react-i18next";

export default function RoleIndex({ auth, roles, flash }) {
    const alert = flash?.alert;

    const { t } = useTranslation(["common"]);

    return (
        <AdminLayout auth={auth}>
            <Head title={t("role", { count: 2 })} />
            {alert && (
                <Alert
                    key={alert.id}
                    message={alert.message}
                    severity={alert.severity}
                />
            )}

            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500 capitalize">
                    {t("list of field", { field: t("role", { count: 2 }) })}
                </h2>
                <Link href={route("admin.role.create")}>
                    <Button variant="contained" startIcon={<AddRoundedIcon />}>
                        {t("button.create field", {
                            field: t("role", { count: 1 }),
                        })}
                    </Button>
                </Link>
            </div>

            <Table roles={roles} />
        </AdminLayout>
    );
}
