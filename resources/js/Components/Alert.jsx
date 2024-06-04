import React from "react";

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function AutoHideAlert({message,severity})
{
    const [open, setOpen] = React.useState(true);
  
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
  
        setOpen(false);
    };

    return(
        <Snackbar
            open={open}
            anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert variant="filled" severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )

}