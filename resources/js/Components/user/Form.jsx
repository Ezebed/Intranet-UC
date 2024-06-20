import React, { useState } from "react";

import { useForm } from '@inertiajs/react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


export default function Form({user,userRoles,roles,routeName,method,passwordRequired=false})
{
    const [showPassword, setShowPassword] = useState(false)

    const { data, setData, patch, post, processing, errors } = useForm({
        name: user?.name ?? '',
        roles: userRoles ?? [],
        email: user?.email ?? '',
        password:'',
        remember: false,
    })

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setData(data => ({
                ...data,
                roles: [...data.roles, e.target.value],
            }))
        }else{
            setData(data => ({
                ...data,
                roles: data.roles.filter(permission => permission != e.target.value),
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
            patch(route(routeName,user));
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <Box
            component="form"
            sx={{ mt:2 }}
            onSubmit={handleSubmit}
            id="roleForm"
        >
            <FormGroup sx={{ display:"flex", gap:2 }}>
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
                    required
                    variant="outlined"
                    type="email"
                    id="email"
                    label="Correo Electronico"
                    defaultValue={data.email}
                    onChange={handleChange}
                    error={errors.email}
                    helperText={errors.email}
                    fullWidth
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <OutlinedInput
                        required={passwordRequired}
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        label="Contraseña"
                        onChange={handleChange}
                        error={errors.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        fullWidth
                    />
                    <FormHelperText id="password-helper-text" error={errors.password}>{errors.password}</FormHelperText>
                </FormControl>
            </FormGroup>
            <FormGroup sx={{ mt:2 }} >
                <FormLabel component="legend" >Roles</FormLabel>
                {roles.map(role => (
                    <FormControlLabel
                        key={role.id} 
                        control={
                            <Checkbox 
                                checked={data.roles.includes(role.name)} 
                                onChange={handleCheckboxChange} 
                                value={role.name} 
                                name={role.name} 
                            />
                        }
                        label={role.name}
                    />
                ))}
            </FormGroup>
            <Button variant="contained" type="submit" disabled={processing} sx={{mt:2}} >
                { user ? 'Actualizar': 'Crear'}
            </Button>
        </Box>
    )
}