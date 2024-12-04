import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function Dashboard({ auth }) {
    const { t } = useTranslation(["translation"]);

    return (
        <AdminLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-6 text-gray-900">{t("You're logged in!")}</div>
        </AdminLayout>
    );
}
