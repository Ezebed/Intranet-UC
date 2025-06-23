import React from "react";
import { useForm } from '@inertiajs/react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';

export default function Form({ thesis, routeName, students, method }) {
    const { data, setData, post, patch, processing, errors } = useForm({
        title: thesis?.title ?? '',
        date: thesis?.date ?? '',
        student_ids: thesis?.students?.map(s => s.id) ?? [],
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
        console.log(data.student_ids);
        e.preventDefault();
        if (method === 'post') {
            post(route(routeName));
        } else {
            patch(route(routeName, thesis));
        }
    };

    const handleStudentsChange = (event, value) => {
        setData('student_ids', value.map(s => s.id));
    };

    return (
        <Box
            component="form"
            sx={{ mt: 2 }}
            onSubmit={handleSubmit}
            id="thesisForm"
        >
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="title"
                        name="title"
                        label="Título"
                        value={data.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        type="date"
                        id="date"
                        name="date"
                        label="Fecha"
                        value={data.date}
                        onChange={handleChange}
                        error={!!errors.date}
                        helperText={errors.date}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Autocomplete
                        multiple
                        id="student_ids"
                        options={students}
                        getOptionLabel={(option) => `${option.name} (${option.id_uc})`}
                        value={students.filter(s => data.student_ids.includes(s.id))}
                        onChange={handleStudentsChange}
                        filterSelectedOptions
                        disableCloseOnSelect
                        limitTags={2}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                   {...params}
                                    label="Tesistas"
                                    error={Boolean(errors.student_ids)}
                                    helperText={errors.student_ids || ''}
                            />
                        )}
                        getOptionDisabled={(option) =>
                            data.student_ids.length >= 2 && !data.student_ids.includes(option.id)
                        }
                    />
                </Grid>
            </Grid>
            <Button variant="contained" type="submit" disabled={processing}>
                {thesis ? 'Actualizar' : 'Crear'}
            </Button>
        </Box>
    );
}