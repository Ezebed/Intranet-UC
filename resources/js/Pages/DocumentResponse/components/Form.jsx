import { useForm } from '@inertiajs/react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


export default function Form({response, routeName, method, users})
{

    const { data, setData, patch, post, processing, errors } = useForm({
        serial_number: response?.serial_number ?? '',
        applicant: response?.applicant?.id ?? '',
        directed_to: response?.directed_to?.id ?? '',
        description: response?.description ?? ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if(method === 'post'){
            post(route(routeName));
        }else{
            patch(route(routeName,response));
        }
    };

    const handleChange = (e) => {
        const key   = e.target.name;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value
        }))
    }

    return(
        <Box
            component="form"
            sx={{ mt:2 }}
            onSubmit={handleSubmit}
            id="responseForm"
        >
            <FormGroup sx={{ display:"flex", gap:2 }}>

                <TextField
                    required
                    variant="outlined"
                    type="text"
                    id="serial_number"
                    name="serial_number"
                    label="Codigo"
                    defaultValue={data.serial_number ? data.serial_number : ""}
                    onChange={handleChange}
                    error={errors.serial_number}
                    helperText={errors.serial_number}
                    fullWidth
                />

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


            </FormGroup>

            <Button variant="contained" type="submit" disabled={processing} sx={{mt:2}} >
                { response ? 'Actualizar': 'Crear'}
            </Button>
        </Box>
    )
}