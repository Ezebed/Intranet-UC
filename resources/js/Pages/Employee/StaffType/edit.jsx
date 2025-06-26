import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useTranslation } from "react-i18next";
import EmployeeRecordForm from "../components/Form";

export default function EmployeeStaffTypeEdit({ auth, type }) {
    const { t } = useTranslation(["translation", "common"]);
    
    const dataFormObject = {
        id: type.id,
        name: type.name
    }

    const structureFormObject = {
        id:{
            name:'id',
            inputType: 'hidden',
            sx:{}
        },
        name:{
            name: 'Nombre',
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
                title={t("Edit resource", {
                    resource: t("Tipo de cargo", {
                        count: 1,
                        ns: "common",
                    }),
                })}
            />
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("Edit resource", {
                        resource: t("Tipo de cargo", {
                            count: 1,
                            ns: "common",
                        }),
                    })}
                </h2>
                <Link href={route("employee.staff.type.index")}>
                    <Tooltip title={t("button.go back", { ns: "common" })}>
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>

            <EmployeeRecordForm 
                dataFormObject={dataFormObject}
                method="patch"
                routeName="employee.staff.type.update"
                structureFormObject={structureFormObject}
                />
        </AdminLayout>
    );
}
