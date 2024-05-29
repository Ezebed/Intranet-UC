import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from '@inertiajs/react';
import React from "react";
import { useState } from "react";

import { useForm } from '@inertiajs/react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function RoleEdit({auth,role})
{
    const { data, setData, post, processing, errors } = useForm({
        name: role.name,
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
        e.preventDefault();
        console.log(data.name);

        // post('ruta');
    };

    return( 
        <AdminLayout user={auth.user}>
            <Head title="Editar Rol" />
            <div className="m-4 p-4 bg-white">
                <h2 className="text-xl mb-4 text-gray-500">Editar Rol</h2>
                
                <Box
                    component="form"
                    sx={{  }}
                    onSubmit={handleSubmit}
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
                    <Button variant="contained" type="submit" disabled={processing} sx={{mt:2}} >
                        Actualizar
                    </Button>
                </Box>

            </div>
        </AdminLayout>
    )
}