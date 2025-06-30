import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useTranslation } from "react-i18next";
import EmployeeRecordForm from "../components/Form";

export default function EmployeeStaffEdit({ auth, staff, types, benefits, teaching_levels }) {
    const { t } = useTranslation(["translation", "common"]);
    
    const dataFormObject = {
        name: staff.name,
        places_number: staff.places_number,
        type: staff.type.id,
        id: staff.id,
        teaching_levels: staff.teaching_levels.map(tl => tl.id),
        benefits: staff.benefits.map(tl => tl.id),
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
        places_number: {
            name:'Nro. puestos',
            inputType: 'number',
            sx:{
                m:1,
                maxWidth: 150
            }
        },
        type:{
            name:'Tipo',
            inputType: 'select',
            selectList: types,
            sx:{
                m:1,
                maxWidth:150
            }
        },
        teaching_levels: {
            name:'Niveles de docencia',
            inputType: 'checkbox',
            selectList: teaching_levels,
            sx:{
                m:1,
                maxWidth:150
            }
        },
        benefits: {
            name:'Beneficios',
            inputType: 'checkbox',
            selectList: benefits,
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
                    resource: t("cargo", {
                        count: 1,
                        ns: "common",
                    }),
                })}
            />
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("Edit resource", {
                        resource: t("cargo", {
                            count: 1,
                            ns: "common",
                        }),
                    })}
                </h2>
                <Link href={route("employee.staff.index")}>
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
                routeName="employee.staff.update"
                structureFormObject={structureFormObject}
                />
        </AdminLayout>
    );
}
