import React from "react";
import { useForm } from '@inertiajs/react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

export default function EmployeeRecordForm({dataFormObject,structureFormObject,routeName,method})
{
    const { data, setData, patch, post, processing, errors } = useForm(dataFormObject)

    const handleChange = (e) => {
        const key   = e.target.id;
        const value = isNaN(e.target.value) ? e.target.value.trim() : Number(e.target.value);

        setData(prevData => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSelectChange = (e) => {
        const key   = e.target.name;
        const value = Number(e.target.value);

        setData(prevData => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(method === 'post') post(route(routeName));
        else patch(route(routeName,dataFormObject.id));

    };

    return(
        <Box
            component="form"
            sx={{ mt:2 }}
            onSubmit={handleSubmit}
        >
            
            <FormGroup sx={{ mt:2 }} >
                {Object.keys(dataFormObject).map((key, index) => (
                    <React.Fragment key={key}>
                        {
                            ['text','number'].includes(structureFormObject[key].inputType) && (
                                <TextField
                                    required
                                    variant="outlined"
                                    type={structureFormObject[key].inputType}
                                    id={key}
                                    label={structureFormObject[key].name}
                                    defaultValue={data[key]}
                                    onChange={handleChange}
                                    error={errors.name}
                                    helperText={errors.name}
                                    sx={structureFormObject[key].sx}
                                />
                            )
                        }

                        {
                            structureFormObject[key].inputType == 'select' && (
                                <>
                                    <FormControl id={key}>
                                        <InputLabel id={`${structureFormObject[key].name}-label`}>{structureFormObject[key].name}</InputLabel>
                                        <Select
                                            value={data[key]}
                                            onChange={handleSelectChange}
                                            labelId={`${structureFormObject[key].name}-label`}
                                            id={key}
                                            name={key}
                                            sx={structureFormObject[key].sx} 
                                            >
                                            {
                                                structureFormObject[key].selectList.map( (sv,_index) => (
                                                    <MenuItem 
                                                        key={_index}
                                                        value={sv.id}
                                                        >
                                                            {sv.name}
                                                    </MenuItem>
                                                ) )
                                            }
                                        </Select>
                                    </FormControl>
                                </>
                            )
                        }
                    </React.Fragment>
                ))}
            </FormGroup>
            <Button 
                variant="contained" 
                type="submit" 
                disabled={processing} 
                sx={{mt:2}} 
            >
                { dataFormObject.name.length > 0 ? 'Actualizar': 'Crear'}
            </Button>
        </Box>
    )
}