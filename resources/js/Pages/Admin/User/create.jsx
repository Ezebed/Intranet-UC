import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Form from "@/Pages/Admin/User/componets/Form";
import { useTranslation } from "react-i18next";

export default function UserCreate({ auth, roles }) {
    const { t } = useTranslation(["common"]);
    return (
        <AdminLayout auth={auth}>
            <Head
                title={t("button.create field", {
                    field: t("user", { count: 1 }),
                })}
            />
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("button.create field", {
                        field: t("user", { count: 1 }),
                    })}
                </h2>
                <Link href={route("admin.user.index")}>
                    <Tooltip title={t("button.go back")}>
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>

            <Form
                roles={roles}
                passwordRequired={true}
                method="post"
                routeName="admin.user.store"
            />
        </AdminLayout>
    );
}
