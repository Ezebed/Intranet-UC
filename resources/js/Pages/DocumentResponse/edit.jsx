import DocumentLayout from "@/Layouts/DocumentLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { Link } from "@inertiajs/react";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Form from "@/Pages/DocumentResponse/components/Form";
import { useTranslation } from "react-i18next";


export default function DocumentResponseEdit({ auth, response, created_at, users}) {
    const { t } = useTranslation(["translation", "common"]);
    return (
        <DocumentLayout auth={auth}>
            <Head
                title={t("Edit resource", {
                    resource: t("document_response", {
                        count: 1,
                        ns: "common",
                    }),
                })}
            />

            <div>
                <Link href={route("response.show", response, created_at)}>
                    <Tooltip title={t("button.go back", { ns: "common" })}>
                        <IconButton size="large">
                            <ArrowCircleLeftRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-gray-500">
                    {t("Edit resource", {
                        resource: t("document_response", {
                            count: 1,
                            ns: "common",
                        }),
                    })}
                </h2>
            </div>

            <Form
                response={response}
                method="patch"
                routeName="response.update"
                users={users}
            />
        </DocumentLayout>
    );
}
