import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Grid from '@mui/material/Grid'; 
import { styled } from '@mui/material/styles';

// Estilo para el input de archivo oculto
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export default function File({ auth, errors: serverErrors }) {
    const [openManualAddDialog, setOpenManualAddDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");


    // Formulario para la subida de Excel
    const { post: postExcel, processing: processingExcel, errors: excelErrors, reset: resetExcelForm, setData } = useForm({
    excel_file: null,
    });


    const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setSelectedFile(file);
        setFileName(file.name);
        setData('excel_file', file); 

    } else {
        setSelectedFile(null);
        setFileName("");
        setData('excel_file', null); // <--- usa setData aquí
    }
};

    const handleExcelUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
        alert("Por favor, selecciona un archivo Excel.");
        return;
    }
    postExcel(route('thesisStudent.importExcel'), {
        onSuccess: () => {
            setSelectedFile(null);
            setFileName("");
            resetExcelForm('excel_file');
        },
        onError: (errors) => {
            console.error("Error al importar Excel:", errors);
        }
    });
};


    return (

                  
                        <Box component="form" onSubmit={handleExcelUpload} noValidate >
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{ mr: 2,  }}
                            >
                                Seleccionar Archivo
                                <VisuallyHiddenInput type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
                            </Button>
                            {fileName && <Typography variant="caption" display="block" gutterBottom sx={{mt:1}}>{fileName}</Typography>}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!selectedFile || processingExcel}
                            >
                                {processingExcel ? 'Procesando...' : 'Procesar Excel'}
                            </Button>
                            {excelErrors.excel_file && <Typography color="error" >{excelErrors.excel_file}</Typography>}
                        </Box>

            

    );
}