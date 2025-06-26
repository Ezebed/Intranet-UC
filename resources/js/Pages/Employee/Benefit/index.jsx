
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useTranslation } from "react-i18next";
import EmployeeDropdownMenu from "../components/Dropdown";
import EmployeeRecordsTable from "../components/Table";


export default function EmployeeBenefitIndex({ auth, benefits, model, flash }) {
    const isAdmin = auth.permissions.find(
        (permission) => permission.name === "isAdmin"
    );
    const { t } = useTranslation(["common"]);

    const links = [
        {route:'employee.staff.type.index',title:'Tipología de cargos'},
        {route:'employee.staff.index',title:'Cargos'},
        {route:'employee.teaching.level.index',title:'Niveles de docencia'}
    ]

    const tableHeaders = ['Nombre','Duración','Tiempo entre uso']
    const tableRows = benefits.map( benefit => {
        return {
            id:benefit.id,
            name:benefit.name,
            time_lapse:`${benefit.time_lapse} ${benefit.time_lapse_unit.name}`,
            time_between_use:`${benefit.time_between_use} ${benefit.time_between_use_unit.name}`,
        }
    } )

    return (
        <AdminLayout auth={auth}>
            <Head title="Beneficios" />

            <EmployeeDropdownMenu links={links} auth={auth} model={'employee.benefit'} />

            <div className="flex justify-between items-center mt-5">
                <h2 className="text-xl text-gray-500"></h2>
                <Link href={route("employee.benefit.create")}>
                    <Button variant="contained" startIcon={<AddRoundedIcon />}>
                        {t("button.create field", {
                            field: t("Beneficio", { count: 1 }),
                        })}
                    </Button>
                </Link>
            </div>

            <EmployeeRecordsTable 
                headers={tableHeaders} 
                rows={tableRows} 
                model={model} 
                canDelete={true} 
                alert={flash?.alert}
                />
           
        </AdminLayout>
    );
}
