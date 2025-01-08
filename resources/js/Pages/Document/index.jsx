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
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteDialog from "@/Pages/Document/components/DeleteDialog";
import { useTranslation } from "react-i18next";
import Badge from "@/Pages/Document/components/Badge";
import Alert from "@/Components/Alert";


export default function DocumentIndex({ auth, documents, created_at, flash }) {
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
                <h2 className="text-xl text-gray-500">Oficios</h2>
                <Link href={route("document.create")}>
                    <Button variant="contained" startIcon={<AddRoundedIcon />}>
                        {t("button.create field", {
                            field: t("document", { count: 1 }),
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
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Respuesta</TableCell>
                            <TableCell align="left">Serial Respuesta</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((document) => (
                            <TableRow
                                key={document.id}
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
                                            "document.show",
                                            document,
                                            created_at[document.id]
                                        )}
                                    >
                                        {document.serial_number}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">
                                    {document.applicant.name}
                                </TableCell>
                                <TableCell align="left">
                                    {document.directed_to.name}
                                </TableCell>
                                <TableCell align="left">
                                    {created_at[document.id]}
                                </TableCell>
                                <TableCell>
                                    <Badge textContent={document.status}/>
                                </TableCell>
                                <TableCell>
                                    {document.has_response ? "REQUERIDA" : "NO REQUERIDA"}
                                </TableCell>
                                <TableCell>
                                    {document.response_id ? document.response_id.serial_number : null}
                                </TableCell>
                                {isDirector && (

                                    <TableCell align="right">
                                    <div className="flex justify-end flex-col sm:flex-row gap-2">
                                        <DeleteDialog document={document} />
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
