import React from "react";

import { useForm } from '@inertiajs/react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function Form({role,rolePermissions,permissions,routeName,method})
{
    const { data, setData, patch, post, processing, errors } = useForm({
        name: role?.name ?? '',
        permissions: rolePermissions?.map( permission => permission.id+'') ?? [],
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

        if(method === 'post'){
            post(route(routeName));
        }else{
            patch(route(routeName,role));
        }

    };

    return(
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
                { role ? 'Actualizar': 'Crear'}
            </Button>
        </Box>
    )
}