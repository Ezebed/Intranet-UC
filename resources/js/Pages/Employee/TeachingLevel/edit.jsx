import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useTranslation } from "react-i18next";
import EmployeeRecordForm from "../components/Form";

export default function EmployeeTeachingLevelEdit({ auth, level, time_units, levels }) {
    const { t } = useTranslation(["translation", "common"]);
    
    const dataFormObject = {
        name: level.name,
        time: level.time,
        time_unit: level.time_unit.id,
        previous_level: level.previous_level?.id || 0,
        id: level.id
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
        time: {
            name:'Duración',
            inputType: 'number',
            sx:{
                m:1,
                maxWidth: 150
            }
        },
        time_unit:{
            name:'Unidad de tiempo de duración',
            inputType: 'select',
            selectList: time_units,
            sx:{
                m:1,
                maxWidth:150
            }
        },
        previous_level:{
            name:'Nivel Previo',
            inputType: 'select',
            selectList: [...[{id:0,name:""}],...levels],
            sx:{
                m:1,
                maxWidth:150
            }
        }

    }


    return (
        <AdminLayout auth={auth}>
            <Head
                title={t("Edit resource", {
                    resource: t("Nivel de docencia", {
                        count: 1,
                        ns: "common",
                    }),
                })}
            />
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("Edit resource", {
                        resource: t("nivel de docencia", {
                            count: 1,
                            ns: "common",
                        }),
                    })}
                </h2>
                <Link href={route("employee.teaching.level.index")}>
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
                routeName="employee.teaching.level.update"
                structureFormObject={structureFormObject}
                />
        </AdminLayout>
    );
}
