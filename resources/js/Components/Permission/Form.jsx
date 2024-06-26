import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useForm } from "@inertiajs/react";

export default function Form({permission,method,routeName})
{
    const { data, setData, patch, post, processing, errors } = useForm({
        name: permission?.name ?? '',
        description: permission?.description ?? '',
        remember: false,
    })

    const handleChange = (e) => {
        const key   = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(method === 'post'){
            post(route(routeName));
        }else{
            patch(route(routeName,permission));
        }
    }

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
            <TextField
                sx={{ mt: 2 }} 
                required
                variant="outlined"
                type="text"
                id="description"
                label="Descripcion"
                defaultValue={data.description}
                onChange={handleChange}
                error={errors.description}
                helperText={errors.description}
                fullWidth
            />

            <Button variant="contained" type="submit" disabled={processing} sx={{mt:2}} >
                { permission ? 'Actualizar': 'Crear'}
            </Button>
        </Box>
    )
}