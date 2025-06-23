import React from "react";
import { Link } from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

export default function DeleteThesisStudentDialog({ thesisStudent }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { t } = useTranslation(["translation", "common"]);

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                size="small"
                color="error"
                onClick={handleClickOpen}
            >
                {t("Delete")}
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                        {t("¿Desea eliminar el tesista?", {
                            statusName: thesisStudent.name,
                        })}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t("Esta acción es irreversible. ¿Esta seguro que desea eliminar?")}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} autofocus>
                        {t("Cancel")}
                    </Button>
                    <Link
                        href={route("thesisStudent.destroy", thesisStudent)}
                        method="delete"
                        as="button"
                    >
                        <Button
                            component="div"
                            variant="text"
                            color="error"
                            onClick={handleClose}
                        >
                            {t("Delete")}
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    );
}
