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

export default function thesisStudentTable({ thesisStudent }) {
    const paperElevation = 5;
    console.log(thesisStudent);
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
                        <TableCell align="left">{t("Name")}</TableCell>
                        <TableCell align="left">{t("Email")}</TableCell>
                        <TableCell align="left">{t("Tesis")}</TableCell> 

                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {thesisStudent.map((student) => (
                        <TableRow
                            key={student.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {student.id}
                            </TableCell>
                            <TableCell align="left">{student.name}</TableCell>
                            <TableCell align="left">{student.email}</TableCell>
                            <TableCell align="left">
                            {student.theses && student.theses.length > 0
                                ? student.theses.map(t => t.title).join(', ')
                                : <span style={{ color: '#aaa' }}>Sin tesis</span>
                            }
                            </TableCell>

                            <TableCell align="right">
                                <div className="flex justify-end flex-col sm:flex-row gap-2">
                                    <Link href={route("thesisStudent.edit", student)}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={<EditIcon />}
                                        >
                                            {t("Edit")}
                                        </Button>
                                    </Link>
                                    <DeleteDialog thesisStudent={student} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
