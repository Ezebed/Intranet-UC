import React, { useState } from "react";
import { useForm } from '@inertiajs/react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// ... (otros imports de MUI que ya tienes, no los repito para brevedad)
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

export default function Form({ studentStatus, routeName, method }) {
    console.log(studentStatus);
    const { data, setData, patch, post, processing, errors } = useForm({
        name: studentStatus?.name ?? '',
        description: studentStatus?.description ?? '',
        remember: false,
    });



    const handleChange = (e) => {
        const key = e.target.id || e.target.name; 
        const value = e.target.value;
        setData(currentData => ({
            ...currentData,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (method === 'post') {
            post(route(routeName));
        } else {
            patch(route(routeName, studentStatus));
        }
    };


    return (
        <Box
            component="form"
            sx={{
                mt: 2,

            }}
            onSubmit={handleSubmit}
            id="studentStatusForm" 
        >
            <FormGroup
                sx={{
                    display: "flex",
                    flexDirection: "row", 
                    flexWrap: "wrap",     
                    gap: 2,              
                    mb: 2,               
                }}
            >
                <TextField
                    required
                    variant="outlined"
                    type="text"
                    id="name"
                    name="name" 
                    label="Nombre"
                    value={data.name} 
                    onChange={handleChange}
                    error={!!errors.name} 
                    helperText={errors.name}
                    sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' } }} // Responsive
                />
                <TextField
                    required
                    variant="outlined"
                    type="text"
                    id="description"
                    name="description" 
                    label="Descripción"
                    value={data.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' } }} // Responsive
                />
          
            </FormGroup>

  
            <Button variant="contained" type="submit" disabled={processing}>
                {studentStatus ? 'Actualizar' : 'Crear'}
            </Button>
        </Box>
    );
}