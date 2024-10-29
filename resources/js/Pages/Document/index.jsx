import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export default function DocumentIndex({auth, documents, created_at}) {

  const isAdmin = auth.permissions.find(permission => permission.name === 'isAdmin' );
  const paperElevation = 5;

  return (
    <AdminLayout user={auth.user} >
      <Head title="Oficios" /> 
      <div className="m-4 p-4 bg-white">
        <div className="flex justify-between items-center">
            <h2 className="text-xl text-gray-500">Documentos</h2>
            <Link href="#">
                <Button variant="contained" startIcon={ <AddRoundedIcon/> } >
                    Crear
                </Button>
            </Link>
        </div>

        <TableContainer component={Paper} elevation={paperElevation} sx={{ mt:2 }} >
            <Table sx={{ minWidth: { xs:300 ,sm:650} }} aria-label="simple table">
                <TableHead>
                <TableRow >
                    <TableCell align="left">Serial</TableCell>
                    <TableCell align="left">Dirigido A</TableCell>
                    <TableCell align="left">Título</TableCell>
                    <TableCell align="left">Fecha de Creación</TableCell>
                    <TableCell align="left">Fecha de Aprobación</TableCell>
                    <TableCell align="left">Fecha de Envío</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {documents.map((document) => (
                        <TableRow
                        key={document.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left"><Link className="bg-[#02182B] text-white inline-block p-2 rounded" href={route('document.show', document, created_at[document.id])}>{document.serial_number}</Link></TableCell>
                            <TableCell align="left">{document.directed_to.name}</TableCell>
                            <TableCell align="left">{document.title}</TableCell>
                            <TableCell align="left">{created_at[document.id]}</TableCell>
                            <TableCell align="left">{document.approved_at}</TableCell>
                            <TableCell align="left">{document.sent_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  )
}