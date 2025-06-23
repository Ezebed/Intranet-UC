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

export default function Form({ thesisStudent, routeName, method }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: thesisStudent?.name ?? '',
        email: thesisStudent?.email ?? '',
        id_uc: thesisStudent?.id_uc ?? '',
        ci: thesisStudent?.ci ?? '',
        remember: false,
    });


    const handleChange = (e) => {
        const key = e.target.id || e.target.name; // Usar id o name
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
            patch(route(routeName, thesisStudent));
        }
    };


    return (
        <Box
            component="form"
            sx={{
                mt: 2,

            }}
            onSubmit={handleSubmit}
            id="thesisStudentForm" 
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
                    type="email"
                    id="email"
                    name="email" 
                    label="Correo Electronico"
                    value={data.email}
                    onChange={handleChange}
                    error={!!errors.email} 
                    helperText={errors.email}
                    sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' } }} // Responsive
                />
                <TextField
                    variant="outlined"
                    type="text"
                    id="id_uc"
                    name="id_uc"
                    label="ID UC"
                    value={data.id_uc}
                    onChange={handleChange}
                    error={!!errors.id_uc} 
                    helperText={errors.id_uc}
                    sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' } }} // Responsive
                />
                <TextField
                    variant="outlined"
                    type="text"
                    id="ci"
                    name="ci" 
                    label="Cedula"
                    value={data.ci} 
                    onChange={handleChange}
                    error={!!errors.ci} 
                    helperText={errors.ci}
                    sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' } }} // Responsive
                />
            </FormGroup>

         

            <Button variant="contained" type="submit" disabled={processing}>
                {thesisStudent ? 'Actualizar' : 'Crear'}
            </Button>
        </Box>
    );
}