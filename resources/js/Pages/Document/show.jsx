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
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

export default function DocumentShow({ auth, document, created_at }) {
    const isAdmin = auth.permissions.find(
        (permission) => permission.name === "isAdmin"
    );
    const paperElevation = 5;

    return (
        <AdminLayout auth={auth}>
            <Head title="Oficios" />

            <div class="items-right">
                <Link href={route("document.index")}>
                    <Tooltip title="Regresar">
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {document.serial_number}
                </h2>
                <Link href={route("document.edit", document)}>
                    <Button variant="contained" startIcon={<EditIcon />}>
                        Editar
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
                    <TableBody>
                        <TableRow
                            key={document.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="left">
                                <span className="font-bold">Solicitante: </span>
                                {document.applicant.name}
                            </TableCell>
                            <TableCell align="left">
                                <span className="font-bold">
                                    Fecha de Creación:{" "}
                                </span>
                                {created_at}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            key={document.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="left">
                                <span className="font-bold">Dirigido A: </span>
                                {document.directed_to.name}
                            </TableCell>
                            <TableCell align="left">
                                <span className="font-bold">
                                    Fecha de Aprobación:{" "}
                                </span>
                                {document.approved_at}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            key={document.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="left">
                                <span className="font-bold">Titulo: </span>
                                {document.title}
                            </TableCell>
                            <TableCell align="left">
                                <span className="font-bold">
                                    Fecha de Envío:{" "}
                                </span>
                                {document.sent_at}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table
                    sx={{ minWidth: { xs: 300, sm: 650 } }}
                    aria-label="simple table"
                >
                    <TableBody>
                        <TableRow
                            key={document.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="left">
                                <span className="font-bold">Descripción: </span>
                                {document.description}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
}
