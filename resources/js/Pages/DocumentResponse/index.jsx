import DocumentLayout from "@/Layouts/DocumentLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { React, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteDialog from "@/Pages/DocumentResponse/components/DeleteDialog";
import { useTranslation } from "react-i18next";
import Alert from "@/Components/Alert";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";


export default function DocumentResponseIndex({ auth, responses, created_at, flash }) {
    const paperElevation = 5;
    const { t } = useTranslation("common");
    const alert = flash?.alert;


    const isDirector = auth.permissions.find(
        (permission) => permission.name === "isDirector"
    );



    return (
        <DocumentLayout auth={auth}>
            <Head title="Oficios" />
            {alert && (
                <Alert
                    key={alert.id}
                    message={alert.message}
                    severity={alert.severity}
                />
            )}
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">Respuestas de Oficios</h2>
                <Link href={route("response.create")}>
                    <Button variant="contained" startIcon={<AddRoundedIcon />}>
                        {t("button.create field", {
                            field: t("document_response", { count: 1 }),
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
                            <TableCell align="left">Serial</TableCell>
                            <TableCell align="left">Solicitante</TableCell>
                            <TableCell align="left">Dirigido A</TableCell>
                            <TableCell align="left">Fecha de Creación</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {responses.map((response) => (
                            <TableRow
                                key={response.id}
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
                                            "response.show",
                                            response
                                        )}
                                    >
                                        {response.serial_number}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">
                                    {response.applicant.name}
                                </TableCell>
                                <TableCell align="left">
                                    {response.directed_to.name}
                                </TableCell>
                                <TableCell align="left">
                                    {created_at[response.id]}
                                </TableCell>
                                {isDirector && (

                                    <TableCell align="right">
                                    <div className="flex justify-end flex-col sm:flex-row gap-2">
                                        <DeleteDialog response={response} />
                                    </div>
                                    </TableCell>

                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DocumentLayout>
    );
}
