import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from '@inertiajs/react';
import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from '@inertiajs/react';

export default function RoleIndex({auth,roles})
{
    const paperElevation = 5;

    return(
        <AdminLayout user={auth.user} >
            <Head title="Roles" />
            <div className="m-4 p-4 bg-white">
                <h2 className="text-xl mb-4 text-gray-500">Lista de Roles</h2>

                <TableContainer component={Paper} elevation={paperElevation}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell fontWeight="700" >ID</TableCell>
                            <TableCell align="left">Nombre</TableCell>
                            <TableCell align="left"></TableCell>
                            
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow
                                key={role.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{role.id}</TableCell>
                                    <TableCell align="left">{role.name}</TableCell>
                                    <TableCell align="right">
                                        <div className="space-x-2">
                                            <Link href={route('admin.role.edit',role)}>
                                                <Button variant="contained" size="small">
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Link href={route('admin.role.destroy',role)}>
                                                <Button variant="outlined" startIcon={<DeleteIcon />} size="small" color="error">
                                                    Eliminar
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </div>
        </AdminLayout>
    )
}