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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Alert from "@/Components/Alert";

export default function UserIndex({auth,users,flash})
{
    const alert = flash?.alert;
    
    const paperElevation = 5;

    return(
        <AdminLayout user={auth.user} >
            <Head title="Usuarios" />
            {alert && <Alert key={alert.id} message={alert.message} severity={alert.severity} />}
            <div className="m-4 p-4 bg-white">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-gray-500">Lista de Usuarios</h2>
                    <Link href={route('admin.user.create')}>
                        <Button variant="contained" startIcon={ <AddRoundedIcon/> } >
                            Crear Usuario
                        </Button>
                    </Link>
                </div>

                <TableContainer component={Paper} elevation={paperElevation} sx={{ mt:2 }} >
                    <Table sx={{ minWidth: { xs:300 ,sm:650} }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell fontWeight="700" >ID</TableCell>
                            <TableCell align="left">Nombre</TableCell>
                            <TableCell align="left"></TableCell>
                            
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{user.id}</TableCell>
                                    <TableCell align="left">{user.name}</TableCell>
                                    <TableCell align="right">
                                        <div className="space-y-2 md:space-y-0 md:space-x-2">
                                            <Link href={route('admin.user.edit',user)}>
                                                <Button variant="contained" size="small" startIcon={<EditIcon/>}>
                                                    Editar
                                                </Button>
                                            </Link>
                                            <DeleteDialog user={user} />
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

function DeleteDialog({user})
{
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <Button 
                variant="outlined" 
                startIcon={<DeleteIcon />} 
                size="small" 
                color="error"
                onClick={handleClickOpen}
            >
                Eliminar
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Eliminar el Rol "+user.name+"?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Estas a punto de eliminar un usuario, esta accion es irreversible.
                        <br></br>
                        ¿Estas seguro de eliminar el usuario?.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} autofocus>Cancelar</Button>
                    <Link href={route('admin.user.destroy',user)} method="delete" as="button" >
                        <Button component="div" variant="text" color="error" onClick={handleClose}>
                            Eliminar
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    )
}