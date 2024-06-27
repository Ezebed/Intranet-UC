import React from 'react';
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

export default function UserTable({users}){

    const paperElevation = 5;

    return(
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
                                <div className="flex justify-end flex-col sm:flex-row gap-2">
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