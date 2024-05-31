import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from '@inertiajs/react';
import React from "react";

import { useForm, Link } from '@inertiajs/react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function RoleEdit({auth,role,rolePermissions,permissions})
{
    
    const { data, setData, patch, processing, errors } = useForm({
        name: role.name,
        permissions: rolePermissions.map( permission => permission.id+''),
        remember: false,
    })
    
    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setData(data => ({
                ...data,
                permissions: [...data.permissions, e.target.value],
            }))
        }else{
            setData(data => ({
                ...data,
                permissions: data.permissions.filter(permission => permission != e.target.value),
            }))
        }
    }
    const handleChange = (e) => {
        const key   = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.role.update',role));
    };

    return( 
        <AdminLayout user={auth.user}>
            <Head title="Editar Rol" />
            <div className="m-4 p-4 bg-white">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-gray-500">Editar Rol</h2>
                    <Link href={route('admin.role.index')}>
                        <Tooltip title="Regresar">
                            <IconButton size="large">
                                <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>
                
                <Box
                    component="form"
                    sx={{ mt:2 }}
                    onSubmit={handleSubmit}
                    id="roleForm"
                >
                    <TextField
                        required
                        variant="outlined"
                        type="text"
                        id="name"
                        label="Nombre"
                        defaultValue={data.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name}
                        fullWidth
                    />

                    <FormGroup sx={{ mt:2 }} >
                        <FormLabel component="legend" >Permisos</FormLabel>
                        {permissions.map(permission => (
                            <FormControlLabel
                                key={permission.id} 
                                control={
                                    <Checkbox 
                                        checked={data.permissions.includes(permission.id+'')} 
                                        onChange={handleCheckboxChange} 
                                        value={permission.id} 
                                        name={permission.name} 
                                    />
                                }
                                label={permission.name}
                            />
                        ))}
                    </FormGroup>

                    <Button variant="contained" type="submit" disabled={processing} sx={{mt:2}} >
                        Actualizar
                    </Button>
                </Box>

            </div>
        </AdminLayout>
    )
}