import React from "react";
import { Link } from "@inertiajs/react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

import DeleteDialog from "./DeleteDialog";
import { useTranslation } from "react-i18next";

export default function ThesisTable({ thesis }) {
    const paperElevation = 5;
    console.log(thesis);
    const { t } = useTranslation(["translation"]);

    return (
        <TableContainer
            component={Paper}
            elevation={paperElevation}
            sx={{ mt: 2 }}
        >
            <Table
                sx={{ minWidth: { xs: 300, sm: 650 } }}
                aria-label="simple table"
            >
               <TableHead>
    <TableRow>
        <TableCell fontWeight="700">{t("ID")}</TableCell>
        <TableCell align="left">{t("Title")}</TableCell>
        <TableCell align="left">{t("Date")}</TableCell>
        <TableCell align="left">{t("Estudiantes")}</TableCell>
        <TableCell align="left"></TableCell>
    </TableRow>
</TableHead>
<TableBody>
    {thesis.map((thesisItem) => (
        <TableRow key={thesisItem.id}>
            <TableCell component="th" scope="row">
                {thesisItem.id}
            </TableCell>
            <TableCell align="left">{thesisItem.title}</TableCell>
            <TableCell align="left">{thesisItem.date}</TableCell>
            <TableCell align="left">
                {thesisItem.students && thesisItem.students.length > 0
                    ? thesisItem.students.map(s => `${s.name} (${s.id_uc})`).join(', ')
                    : <span style={{ color: '#aaa' }}>Sin estudiantes</span>
                }
            </TableCell>
            <TableCell align="right">
                <div className="flex justify-end flex-col sm:flex-row gap-2">
                    <Link href={route("Thesis.edit", thesisItem)}>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditIcon />}
                        >
                            {t("Edit")}
                        </Button>
                    </Link>
                    <DeleteDialog thesis={thesisItem} />
                </div>
            </TableCell>
        </TableRow>
    ))}
</TableBody>
            </Table>
        </TableContainer>
    );
}
