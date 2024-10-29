import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import AsideDrawer from "@/_Partials/AsideDrawer/AsideDrawer";
import Toolbar from "@mui/material/Toolbar";

export default function AdminLayout({ auth, children }) {
    const drawerWidth = 280;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AsideDrawer auth={auth} drawerWidth={drawerWidth} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
                className="min-h-screen bg-gray-100"
            >
                <Toolbar />

                <div className="m-4 p-4 bg-white max-w-[1200px]">
                    {children}
                </div>
            </Box>
        </Box>
    );
}
