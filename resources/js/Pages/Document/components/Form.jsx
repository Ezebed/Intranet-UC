import { useForm } from '@inertiajs/react'
import {React} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function Form({document, routeName, method, users, responses})
{

    const { data, setData, patch, post, processing, errors } = useForm({
        applicant: document?.applicant?.id ?? '',
        directed_to: document?.directed_to?.id ?? '',
        description: document?.description ?? '',
        has_response: document?.has_response ?? false,
        response_id: document?.response_id?.id ?? ''
    })

    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(method === 'post'){
            post(route(routeName));
        }else{
            patch(route(routeName,document));
        }
    };

    const handleChange = (e) => {
        const key   = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    return(
        <Box
            component="form"
            sx={{ mt:2 }}
            onSubmit={handleSubmit}
            id="documentForm"
        >
            <FormGroup sx={{ display:"flex", gap:2 }}>
                <FormControl fullWidth error={!!errors.applicant}>
                    <InputLabel id="applicant-label">Solicitante</InputLabel>
                    <Select
                        labelId="applicant-label"
                        name="applicant"
                        id="applicant"
                        defaultValue={data.applicant ? data.applicant : ""}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Selecciona un solicitante</MenuItem>
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.applicant && <div className="error">{errors.applicant}</div>}
                </FormControl>

                <FormControl fullWidth error={!!errors.directed_to}>
                    <InputLabel id="directed_to-label">Dirigido A</InputLabel>
                    <Select
                        labelId="directed_to-label"
                        name="directed_to"
                        id="directed_to"
                        defaultValue={data.directed_to ? data.directed_to : ""}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Selecciona un Destinatario</MenuItem>
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.directed_to && <div className="error">{errors.directed_to}</div>}
                </FormControl>

                <TextField
                    required
                    variant="outlined"
                    type="text"
                    id="description"
                    name="description"
                    label="Descripcion"
                    defaultValue={data.description ? data.description : ""}
                    onChange={handleChange}
                    error={errors.description}
                    helperText={errors.description}
                    fullWidth
                    multiline
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            name="has_response"
                            checked={data.has_response}
                            onChange={handleChange}
                        />
                    }
                    label="Requiere Respuesta"
                />

                <FormControl fullWidth error={!!errors.response_id}>
                    <InputLabel id="response_id-label">Respuestas a Oficio</InputLabel>
                    <Select
                        labelId="response_id-label"
                        name="response_id"
                        id="response_id"
                        defaultValue={data.response_id ? data.response_id : ""}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Selecciona una Respuesta</MenuItem>
                        {responses.map((response) => (
                            <MenuItem key={response.id} value={response.id}>
                                {response.serial_number}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.response_id && <div className="error">{errors.response_id}</div>}
                </FormControl>


            </FormGroup>

            <Button variant="contained" type="submit" disabled={processing} sx={{mt:2}} >
                { document ? 'Actualizar': 'Crear'}
            </Button>
        </Box>
    )
}