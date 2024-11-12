import Layout from "./Layout";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

import { ErrorBoundary } from "@/utilities/ErrorBaundary";
import TestErrorComponent from "@/Components/TestErrorComponent";
import { GenericErrorFallBack } from "@/Components/fallbackErrors";

import { useTranslation } from "react-i18next";

export default function Welcome({ auth }) {
    const isAdmin = auth.permissions.find(
        (permission) => permission.name === "isAdmin"
    );

    const { t } = useTranslation();

    return (
        <AdminLayout auth={auth}>
            <Head title="Welcome" />

            <section className="mb-4">
                <h1 className="text-xl font-bold">Welcome</h1>
                <p>
                    Hello <strong>{auth.user.name}</strong>, welcome to your
                    first Inertia app!
                </p>

                <p>Roles:</p>

                <div>
                    {auth.roles.map((rol) => (
                        <p
                            key={rol}
                            className="p-2 bg-slate-300 first:rounded-t-lg last:rounded-b-lg"
                        >
                            {rol}
                        </p>
                    ))}
                </div>

                <p>Permisos:</p>

                <div>
                    {auth.permissions.map((permiso) => (
                        <p
                            key={permiso.name}
                            className="p-2 bg-slate-300 first:rounded-t-lg last:rounded-b-lg"
                        >
                            {permiso.name}
                        </p>
                    ))}
                </div>

                {isAdmin && (
                    <p className="font-bold text-xl">
                        Este usuarios es un admin
                    </p>
                )}
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-bold">errorBaundary test</h2>

                <ErrorBoundary fallBackComponent={<GenericErrorFallBack />}>
                    <TestErrorComponent />
                </ErrorBoundary>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-bold">i18n tests</h2>
                <br />
                <h3>test with key:</h3>
                <p>{t("resource Details", { resource: "hola mundo" })}</p>
                <br />
                <h3>test without key:</h3>
                <p>
                    {t(
                        "An unexpected error occurred and we have notified our support team. Please try again later."
                    )}
                </p>
                <p>{t("hola")}</p>
            </section>
        </AdminLayout>
    );
}
