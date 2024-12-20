import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import UserDropdown from "@/Components/user/UserDropdown";

export default function TopBar({ drawerWidth, handleDrawerToggle, user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        React.useState(false);

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                background: "white",
            }}
        >
            <Toolbar className="bg-white h-20 flex justify-between">
                <div className="flex items-center">
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <p className="text-black text-lg font-bold">Tool Bar</p>
                </div>
                <nav>
                    <UserDropdown user={user} />
                </nav>
            </Toolbar>
        </AppBar>
    );
}
