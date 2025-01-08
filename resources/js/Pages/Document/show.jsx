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
import SignModal from '@/Pages/Document/components/SignModal';
import ArticleIcon from '@mui/icons-material/Article';
import Badge from "@/Pages/Document/components/Badge";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Alert from "@/Components/Alert";


export default function DocumentShow({ auth, document, created_at, flash }) {

    const alert = flash?.alert;

    const isDirector = auth.permissions.find(
        (permission) => permission.name === "isDirector"
    );

    const paperElevation = 5;
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImageUpload = (file) => {
        setImage(URL.createObjectURL(file));
    };

    const { data, setData, patch } = useForm({
        status: document?.status ?? '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("document.changeStatus",document.id));
        
    };

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
                <div className="flex gap-x-2" >

                    {(isDirector && document.status === 'PENDIENTE') && (
                        <Button variant="contained" startIcon={<CheckCircleIcon />} onClick={handleSubmit}>
                            Aprobar
                        </Button>
                    )}


                    {(document.status === 'PENDIENTE' || isDirector) && (
                        <Link href={route("document.edit", document)}>
                            <Button variant="contained" startIcon={<EditIcon />}>
                                Editar
                            </Button>
                        </Link>
                    )}


                    {(isDirector && document.status === 'APROBADO') && (
                        <Button variant="contained" color="error" onClick={handleOpen} startIcon={<ArticleIcon />}>
                            Generar PDF
                        </Button>
                    )}

                    <SignModal 
                        open={open} 
                        handleClose={handleClose}
                        serial_number={document.serial_number} 
                        created_at={created_at} 
                        directed_to={document.directed_to.name} 
                        applicant={document.applicant.name} 
                        description={document.description}
                        directedToIP={document.directed_to.internal_position}
                        applicantToIp={document.applicant.internal_position}
                        onImageUpload={handleImageUpload}
                    />
                </div>
            </div>
            <div>
                <Badge textContent={document.status}/>
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
                            key={2}
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
                                {document.description}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </DocumentLayout>
    );
}
