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

export default function UserTable({ users }) {
    const paperElevation = 5;

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
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {user.id}
                            </TableCell>
                            <TableCell align="left">{user.name}</TableCell>
                            <TableCell align="right">
                                <div className="flex justify-end flex-col sm:flex-row gap-2">
                                    <Link href={route("admin.user.edit", user)}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={<EditIcon />}
                                        >
                                            {t("Edit")}
                                        </Button>
                                    </Link>
                                    <DeleteDialog user={user} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
