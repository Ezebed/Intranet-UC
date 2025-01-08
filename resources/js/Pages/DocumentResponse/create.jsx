import DocumentLayout from "@/Layouts/DocumentLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { Link } from "@inertiajs/react";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Form from "@/Pages/DocumentResponse/components/Form";
import { useTranslation } from "react-i18next";

export default function DocumentResponseCreate({ auth, users }) {
    const { t } = useTranslation(["common"]);
    return (
        <DocumentLayout auth={auth}>
            <Head
                title={t("button.create field", {
                    field: t("document_response", { count: 1 }),
                })}
            />
            <div>
                <Link href={route("response.index")}>
                    <Tooltip title={t("button.go back")}>
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("button.create field", {
                        field: t("document_response", { count: 1 }),
                    })}
                </h2>
            </div>
            <Form
                method="post"
                routeName="response.store"
                users={users}
            />
        </DocumentLayout>
    );
}
