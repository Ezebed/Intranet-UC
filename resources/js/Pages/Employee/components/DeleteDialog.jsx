import React from "react";
import { Link } from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

export default function EmployeeRecordDeleteDialog({ record, model, recordName }) {
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
                        resource: t("registro", { count: 1, ns: "common" }),
                        resourceName: recordName,
                        ns: "common",
                    })}
                </DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>
                        {t("Cancel")}
                    </Button>
                    <Link
                        href={route(model, record)}
                        method="delete"
                        as="button"
                    >
                        <Button
                            component="div"
                            variant="text"
                            color=""
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
