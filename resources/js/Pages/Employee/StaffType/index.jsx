import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "react-i18next";
import EmployeeDropdownMenu from "../components/Dropdown";
import EmployeeRecordsTable from "../components/Table";


export default function StaffTypeIndex({ auth, types, flash }) {
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

    const tableHeaders = ['Nombre']
    const tableRows = types.map( type => {
        return {
            id:type.id,
            name:type.name,
        }
    } )

    return (
        <AdminLayout auth={auth}>
            <Head title="Tipologia de cargos" />

            <EmployeeDropdownMenu links={links} auth={auth} />

            {/* <div className="flex justify-between items-center mt-5">
                <h2 className="text-xl text-gray-500"></h2>
                <Link href={route("employee.staff.type.create")}>
                    <Button variant="contained" startIcon={<AddRoundedIcon />}>
                        {t("button.create field", {
                            field: t("Tipologia de cargos", { count: 1 }),
                        })}
                    </Button>
                </Link>
            </div> */}
            
            <EmployeeRecordsTable 
                headers={tableHeaders} 
                rows={tableRows} 
                model={'employee.staff.type'} 
                canDelete={false} 
                alert={flash?.alert} 
                />
            
        </AdminLayout>
    );
}
