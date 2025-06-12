import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Form from "@/Pages/Admin/Role/components/Form";
import { useTranslation } from "react-i18next";

export default function StaffCreate({ auth, permissions }) {
    const { t } = useTranslation(["common"]);
    
    return (
        <AdminLayout auth={auth}>
            <Head
                title={t("button.create field", {
                    field: t("cargo", { count: 1 }),
                })}
            />

            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("button.create field", {
                        field: t("cargo", { count: 1 }),
                    })}
                </h2>
                <Link href={route("admin.role.index")}>
                    <Tooltip title={t("button.go back")}>
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>

            <Form
                permissions={permissions}
                method="post"
                routeName="admin.role.store"
            />
        </AdminLayout>
    );
}