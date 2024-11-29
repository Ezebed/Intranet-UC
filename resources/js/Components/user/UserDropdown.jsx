import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Link } from "@inertiajs/react";

import { useTranslation } from "react-i18next";

export default function UserDropdown({ user }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { t } = useTranslation(["translation"]);

    return (
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
                id="userDropdown"
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                {user.name}
            </Button>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "user-menu",
                }}
            >
                <Link href={route("profile.edit")}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText>{t("Profile")}</ListItemText>
                    </MenuItem>
                </Link>
                <Link href={route("logout")} method="post" as="button">
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>{t("Log Out")}</ListItemText>
                    </MenuItem>
                </Link>
            </Menu>
        </Box>
    );
}
