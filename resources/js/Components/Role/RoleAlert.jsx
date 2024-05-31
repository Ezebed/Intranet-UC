import React from "react";

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function RoleAlert({message,severity})
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
            anchorOrigin={{ vertical:'top', horizontal:'right' }}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert variant="filled" severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )

}