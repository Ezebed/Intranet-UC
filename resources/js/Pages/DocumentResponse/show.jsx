import DocumentLayout from "@/Layouts/DocumentLayout";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import {React, useState} from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Alert from "@/Components/Alert";

export default function DocumentResponseShow({ auth, response, created_at, flash }) {

    const alert = flash?.alert;

    const isDirector = auth.permissions.find(
        (permission) => permission.name === "isDirector"
    );

    const paperElevation = 5;

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
                <Link href={route("response.index")}>
                    <Tooltip title="Regresar">
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {response.serial_number}
                </h2>
                <div className="flex gap-x-2" >


                    {(
                        <Link href={route("response.edit", response)}>
                            <Button variant="contained" startIcon={<EditIcon />}>
                                Editar
                            </Button>
                        </Link>
                    )}


                </div>
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
                            key={1}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="left">
                                <span className="font-bold">Solicitante: </span>
                                {response.applicant.name}
                            </TableCell>
                            <TableCell align="left">
                                <span className="font-bold">
                                    Fecha de Creación:{" "}
                                </span>
                                {created_at}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            key={2}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="left">
                                <span className="font-bold">Dirigido A: </span>
                                {response.directed_to.name}
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
                            key={4}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="left">
                                <span className="font-bold">Descripción: </span>
                                {response.description}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </DocumentLayout>
    );
}
