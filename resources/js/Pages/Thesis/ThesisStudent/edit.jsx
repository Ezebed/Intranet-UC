import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Form from "@/Pages/Thesis/StudentStatuses/components/Form";

import { useTranslation } from "react-i18next";

export default function thesisStudentEdit({ auth, thesisStudent }) {
    const { t } = useTranslation(["translation", "common"]);
    return (
        <AdminLayout auth={auth}>
            <Head
                title={t("Edit resource", {
                    resource: t("thesis student", {
                        count: 1,
                        ns: "common",
                    }),
                })}
            />
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("Edit resource", {
                        resource: t("thesis student", {
                            count: 1,
                            ns: "common",
                        }),
                    })}
                </h2>
                <Link href={route("thesisStudent.index")}>
                    <Tooltip title={t("button.go back", { ns: "common" })}>
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>

            <Form
                thesisStudent={thesisStudent}
                method="patch"
                routeName="thesisStudent.update"
            />
        </AdminLayout>
    );
}
