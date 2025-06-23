import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Form from "./components/Form";
import { useTranslation } from "react-i18next";

export default function ThesisStudentCreate({ auth, roles }) {
    const { t } = useTranslation(["common"]);
    return (
        <AdminLayout auth={auth}>
            <Head
                title={t("Crear Tesista")}
            />
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {("Crear Tesista")}
                </h2>
                <Link href={route("thesisStudent.index")}>
                    <Tooltip title={t("button.go back")}>
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>

            <Form
                passwordRequired={true}
                method="post"
                routeName="thesisStudent.store"
            />
        </AdminLayout>
    );
}
