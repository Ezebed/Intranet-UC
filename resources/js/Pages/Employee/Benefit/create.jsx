import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useTranslation } from "react-i18next";
import EmployeeRecordForm from "../components/Form";

export default function EmployeeBenefitCreate({ auth, time_units }) {
    const { t } = useTranslation(["common"]);

    const dataFormObject = {
        name: '',
        time_lapse:1,
        time_lapse_unit:1,
        time_between_use: 1,
        time_between_use_unit: 1,
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
        time_lapse:{
            name: 'Duración',
            hidden: false,
            inputType: 'number',
            sx:{
                m:1,
                maxWidth: 600
            }
        },
        time_lapse_unit:{
            name: 'Unidad de tiempo de duración',
            hidden: false,
            inputType: 'select',
            selectList: time_units,
            sx:{
                m:1,
                maxWidth: 600
            }
        },
        time_between_use: {
            name:'Tiempo entre usos',
            hidden: false,
            inputType: 'number',
            sx:{
                m:1,
                maxWidth: 150
            }
        },
        time_between_use_unit:{
            name:'Unidad de tiempo entre usos',
            hidden:false,
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
                title={t("button.create field", {
                    field: t("Beneficio", { count: 1 }),
                })}
            />

            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("button.create field", {
                        field: t("Beneficio", { count: 1 }),
                    })}
                </h2>
                <Link href={route("employee.benefit.index")}>
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
                routeName="employee.benefit.store"
                structureFormObject={structureFormObject}
            />
        </AdminLayout>
    );
}