import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useTranslation } from "react-i18next";
import EmployeeRecordForm from "../components/Form";

export default function StaffCreate({ auth, types, benefits, teaching_levels }) {
    const { t } = useTranslation(["common"]);

    const dataFormObject = {
        name: '',
        places_number: 1,
        type: 1,
        teaching_levels: [],
        benefits: []
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
        places_number: {
            name:'Nro. puestos',
            hidden: false,
            inputType: 'number',
            sx:{
                m:1,
                maxWidth: 150
            }
        },
        type:{
            name:'Tipo',
            hidden:false,
            inputType: 'select',
            selectList: types,
            sx:{
                m:1,
                maxWidth:150
            }
        },
        teaching_levels:{
            name: 'Niveles de docencia',
            hidden:false,
            inputType: 'checkbox',
            selectList: teaching_levels,
            sx: {
                m:1,
                maxWidth: 250
            }
        },
        benefits: {
            name: 'Beneficios',
            hidden:false,
            inputType: 'checkbox',
            selectList: benefits,
            sx: {
                m:1,
                maxWidth: 250
            }
        }

    }
    
    return (
        <AdminLayout auth={auth}>
            <Head
                title={t("button.create field", {
                    field: t("Cargo", { count: 1 }),
                })}
            />

            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("button.create field", {
                        field: t("Cargo", { count: 1 }),
                    })}
                </h2>
                <Link href={route("employee.staff.index")}>
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
                routeName="employee.staff.store"
                structureFormObject={structureFormObject}
            />
        </AdminLayout>
    );
}