import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useTranslation } from "react-i18next";
import EmployeeRecordForm from "../components/Form";

export default function EmployeeTeachingLevelCreate({ auth }) {
    const { t } = useTranslation(["common"]);

    const dataFormObject = {
        name: '',
    }

    const structureFormObject = {
        name:{
            name: 'Nombre',
            hidden: false,
            inputType: 'text',
            sx:{
                m:1,
                maxWidth: 600
            }
        },
    }
    
    return (
        <AdminLayout auth={auth}>
            <Head
                title={t("button.create field", {
                    field: t("Tipo de personal", { count: 1 }),
                })}
            />

            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("button.create field", {
                        field: t("Tipo de cargo", { count: 1 }),
                    })}
                </h2>
                <Link href={route("employee.staff.type.index")}>
                    <Tooltip title={t("button.go back")}>
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>

            <EmployeeRecordForm
                dataFormObject={dataFormObject}
                method="post"
                routeName="employee.staff.type.store"
                structureFormObject={structureFormObject}
            />
        </AdminLayout>
    );
}