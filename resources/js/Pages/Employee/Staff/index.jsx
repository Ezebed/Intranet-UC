import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Dropdown from "@/Components/Dropdown";
import { useTranslation } from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGripLines } from "@fortawesome/free-solid-svg-icons";


export default function StaffIndex({ auth, staffs, created_at }) {
    const isAdmin = auth.permissions.find(
        (permission) => permission.name === "isAdmin"
    );
    const paperElevation = 5;
    const { t } = useTranslation(["common"]);

    const dropDownSpanStyle = {
        fontSize:'40px',
        color:'#7267EF'
    }

    const dropDownContentStyle = {
        fontSize: '20px'
    }

    return (
        <AdminLayout auth={auth}>
            <Head title="Cargos" />

            <Dropdown>
                <Dropdown.Trigger>
                    <span style={dropDownSpanStyle}>
                        <FontAwesomeIcon icon={faGripLines}  />
                    </span>
                </Dropdown.Trigger>

                <Dropdown.Content align="left" style={dropDownContentStyle}>
                    <Dropdown.Link
                        href={route("profile.edit")}
                    >
                        {t("Tipología de cargos")}
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        {t("Beneficios")}
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        {t("Niveles de docencia")}
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
            <div className="flex justify-between items-center mt-5">
                <h2 className="text-xl text-gray-500"></h2>
                <Link href={route("employee.staff.create")}>
                    <Button variant="contained" startIcon={<AddRoundedIcon />}>
                        {t("button.create field", {
                            field: t("cargo", { count: 1 }),
                        })}
                    </Button>
                </Link>
            </div>

            <TableContainer
                component={Paper}
                elevation={paperElevation}
                sx={{ mt: 2 }}
            >
                <Table
                    sx={{ minWidth: { xs: 300, sm: 650 } }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Cargo</TableCell>
                            <TableCell align="center">Tipo</TableCell>
                            <TableCell align="center">Nro. puestos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffs.map((staff) => (
                            <TableRow
                                key={staff.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="left">
                                    <Link
                                        className="bg-[#02182B] text-white inline-block p-2 rounded"
                                        href={route(
                                            "staff.show",
                                            staff,
                                            created_at[staff.id]
                                        )}
                                    >
                                        {staff.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">
                                    {staff.type.name}
                                </TableCell>
                                <TableCell align="left">
                                    {staff.places_number}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
}
