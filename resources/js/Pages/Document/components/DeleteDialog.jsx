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

export default function DeleteDialog({ document }) {
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
                    {t("delete resource?", {
                        resource: t("document", { count: 1, ns: "common" }),
                        resourceName: document.serial_number,
                        ns: "common",
                    })}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t("do you want delete resource?", {
                            resource: t("document", { count: 1, ns: "common" }),
                            ns: "common",
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} autofocus>
                        {t("Cancel")}
                    </Button>
                    <Link
                        href={route("document.destroy", document)}
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
