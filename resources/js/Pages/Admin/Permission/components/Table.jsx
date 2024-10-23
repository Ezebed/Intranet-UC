import React from "react"
import { Link } from '@inertiajs/react';

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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PermissionTable({permissions}){
    const paperElevation = 5;

    return(
        <TableContainer component={Paper} elevation={paperElevation} sx={{ mt:2 }} >
            <Table sx={{ minWidth: { xs:300 ,sm:650} }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell fontWeight="700" >ID</TableCell>
                    <TableCell align="left">Nombre</TableCell>
                    <TableCell align="left">Descripcion</TableCell>
                    <TableCell align="right"></TableCell>
                    
                </TableRow>
                </TableHead>
                <TableBody>
                    {permissions.map((permission) => (
                        <TableRow
                        key={permission.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{permission.id}</TableCell>
                            <TableCell align="left">{permission.name}</TableCell>
                            <TableCell align="left">{permission.description}</TableCell>
                            <TableCell align="right">
                                <div className="flex justify-end flex-col sm:flex-row gap-2">
                                    <Link href={route('admin.permission.edit',permission)}>
                                        <Button variant="contained" size="small" startIcon={<EditIcon/>}>
                                            Editar
                                        </Button>
                                    </Link>
                                    <DeleteDialog permission={permission} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function DeleteDialog({permission})
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
                    {"¿Eliminar el Permiso "+permission.name+"?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Estas a punto de eliminar un permiso, esta accion es irreversible.
                        <br></br>
                        ¿Estas seguro de eliminar el permiso?.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} autofocus>Cancelar</Button>
                    <Link href={route('admin.permission.destroy',permission)} method="delete" as="button" >
                        <Button component="div" variant="text" color="error" onClick={handleClose}>
                            Eliminar
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    )
}