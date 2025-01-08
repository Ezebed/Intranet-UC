import {React, useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PDF from "@/template/pdfDocumentTemplate";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ArticleIcon from '@mui/icons-material/Article';


const CustomModal = ({ open, handleClose,serial_number, created_at, directed_to, directedToIP, applicantToIp, applicant, description, onImageUpload  }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (open) {
            setImage(null);  // Restablecer la imagen a null cuando el modal se abre
        }
    }, [open]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));  // Convertir la imagen a URL de datos
            onImageUpload(file);  // Pasar la imagen cargada al componente principal
        }
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Modal: Firma del Oficio</DialogTitle>
            <DialogContent>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: '10px' }}
            />
            {image && <img src={image} alt="Vista previa" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />}
            </DialogContent>
            <DialogActions>
                {image && (
                    <Button variant="contained" onClick={handleClose} startIcon={<ArticleIcon />} color="error">
                    <PDFDownloadLink document={
                                <PDF 
                                    serial_number={serial_number} 
                                    created_at={created_at} 
                                    directed_to={directed_to} 
                                    applicant={applicant} 
                                    description={description}
                                    directedToIP={directedToIP}
                                    applicantToIp={applicantToIp}
                                    image={image}
                                />
                            } fileName={`Oficio_${serial_number}.pdf`}>
                        {
                            ({ blob, url, loading, error }) =>
                                loading ? 'Cargando...' : 'Descargar'
                            
                        }
                    </PDFDownloadLink>
                </Button>
            )}
                <Button onClick={handleClose} color="primary">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomModal;