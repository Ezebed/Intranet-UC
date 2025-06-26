import React from "react";
import { Link } from "@inertiajs/react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EmployeeRecordDeleteDialog from "./DeleteDialog";
import Alert from "@/Components/Alert";


export default function EmployeeRecordsTable({ headers, rows, model, canDelete, alert }) {
    const paperElevation = 5;

    const { t } = useTranslation(["translation"]);

    return (
        <>
            {alert && (
                <Alert
                    key={alert.id}
                    message={alert.message}
                    severity={alert.severity}
                />
            )}

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
                            {
                                headers.map( (header,index) => (
                                    <TableCell 
                                        fontWeight="700"
                                        key={index}
                                    >
                                        {header}
                                    </TableCell>
                                )  )
                            }
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map( row => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                {
                                    Object.keys(row).filter( k => k != 'id')
                                    .map( (k,index) => (
                                        <TableCell 
                                            align={ isNaN(row[k]) ? 'left' : 'right'  }
                                            key={index}
                                            >
                                                {
                                                    k == 'name'
                                                    ? (
                                                        <Link
                                                            href={route(`${model}.show`,row.id)}
                                                        >
                                                            {row[k]}
                                                        </Link>
                                                    )
                                                    : row[k]
                                                }
                                            
                                        </TableCell>
                                    ) )
                                }
                                <TableCell align="right">
                                    <div className="flex justify-end flex-col sm:flex-row gap-2">
                                        <Link href={route(`${model}.edit`, row)}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                startIcon={<EditIcon />}
                                            >
                                                {t("Edit")}
                                            </Button>
                                        </Link>
                                        {
                                            canDelete && (
                                                <EmployeeRecordDeleteDialog record={row.id} model={`${model}.destroy`} recordName={row.name ? row.name : ''} />
                                            )
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}