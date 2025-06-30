
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useTranslation } from "react-i18next";
import EmployeeDropdownMenu from "../components/Dropdown";
import EmployeeRecordsTable from "../components/Table";


export default function EmployeeTeachingLevelIndex({ auth, levels, model, flash }) {
    const isAdmin = auth.permissions.find(
        (permission) => permission.name === "isAdmin"
    );
    const { t } = useTranslation(["common"]);

    const links = [
        {route:'employee.staff.type.index',title:'Tipología de cargos'},
        {route:'employee.staff.index',title:'Cargos'},
        {route:'employee.benefit.index',title:'Beneficios'},
        {route:'employee.teaching.level.index',title:'Niveles de docencia'}
    ]

    const tableHeaders = ['Nombre','Duración', 'Nivel Previo']
    const tableRows = levels.map( level => {
        return {
            id:level.id,
            name:level.name,
            time:`${level.time} ${level.time_unit.name}`,
            previous_level: level.previous_level?.name
        }
    } )

    return (
        <AdminLayout auth={auth}>
            <Head title="Niveles de docencia" />

            <EmployeeDropdownMenu links={links} auth={auth} model={'employee.teaching.level'} />

            <div className="flex justify-between items-center mt-5">
                <h2 className="text-xl text-gray-500"></h2>
                <Link href={route("employee.teaching.level.create")}>
                    <Button variant="contained" startIcon={<AddRoundedIcon />}>
                        {t("button.create field", {
                            field: t("Nivel de docencia", { count: 1 }),
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
