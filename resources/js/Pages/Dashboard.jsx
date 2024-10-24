import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

import translation from "@/../lang/es.json";

export default function Dashboard({ auth }) {
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {translation["You're logged in!"]}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
