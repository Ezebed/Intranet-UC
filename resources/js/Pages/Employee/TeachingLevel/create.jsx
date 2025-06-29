import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useTranslation } from "react-i18next";
import EmployeeRecordForm from "../components/Form";

export default function EmployeeTeachingLevelCreate({ auth, time_units, levels }) {
    const { t } = useTranslation(["common"]);

    const dataFormObject = {
        name: '',
        time:1,
        time_unit:1,
        previous_level:0
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
        time:{
            name: 'Duración',
            hidden: false,
            inputType: 'number',
            sx:{
                m:1,
                maxWidth: 600
            }
        },
        time_unit:{
            name: 'Unidad de tiempo',
            hidden: false,
            inputType: 'select',
            selectList: time_units,
            sx:{
                m:1,
                maxWidth: 600
            }
        },
        previous_level:{
            name: 'Nivel Previo',
            hidden: false,
            inputType: 'select',
            selectList: [...[{id:0,name:""}],...levels],
            sx:{
                m:1,
                maxWidth: 600
            }
        }
    }
    
    return (
        <AdminLayout auth={auth}>
            <Head
                title={t("button.create field", {
                    field: t("Nivel de docencia", { count: 1 }),
                })}
            />

            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("button.create field", {
                        field: t("Nivel de docencia", { count: 1 }),
                    })}
                </h2>
                <Link href={route("employee.teaching.level.index")}>
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
                routeName="employee.teaching.level.store"
                structureFormObject={structureFormObject}
            />
        </AdminLayout>
    );
}