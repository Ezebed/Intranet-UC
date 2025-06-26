import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useTranslation } from "react-i18next";
import EmployeeRecordForm from "../components/Form";

export default function EmployeeBenefitEdit({ auth, benefit, time_units }) {
    const { t } = useTranslation(["translation", "common"]);
    
    const dataFormObject = {
        name: benefit.name,
        time_lapse: benefit.time_lapse,
        time_lapse_unit: benefit.time_lapse_unit.id,
        time_between_use: benefit.time_between_use,
        time_between_use_unit: benefit.time_between_use_unit.id,
        id: benefit.id
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
        time_lapse: {
            name:'Duración',
            inputType: 'number',
            sx:{
                m:1,
                maxWidth: 150
            }
        },
        time_lapse_unit:{
            name:'Unidad de tiempo de duración',
            inputType: 'select',
            selectList: time_units,
            sx:{
                m:1,
                maxWidth:150
            }
        },
        time_between_use: {
            name:'Tiempo entre uso',
            inputType: 'number',
            sx:{
                m:1,
                maxWidth: 150
            }
        },
        time_between_use_unit:{
            name:'Unidad de tiempo entre uso',
            inputType: 'select',
            selectList: time_units,
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
                    resource: t("Beneficio", {
                        count: 1,
                        ns: "common",
                    }),
                })}
            />
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("Edit resource", {
                        resource: t("beneficio", {
                            count: 1,
                            ns: "common",
                        }),
                    })}
                </h2>
                <Link href={route("employee.benefit.index")}>
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
                routeName="employee.benefit.update"
                structureFormObject={structureFormObject}
                />
        </AdminLayout>
    );
}
