import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import TopBar from "@/_Partials/TopBar";
import DrawerLink from "@/Components/DrawerLink";
import { Link } from "@inertiajs/react";

export default function AsideDrawer({ auth, drawerWidth }) {
    const [isClosing, setIsClosing] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    // permission se utilizara para delimitar a que rutas puede acceder el ususario
    // permission es un array de objetos, cada objeto es un permiso
    const { user, permissions } = auth;

    // definicion de las rutas que se renderizaran en el drawer
    const drawerRoutesList = [
        {
            hasPermission: permissions.some(
                (permission) => permission.name === "isAdmin"
            ),
            subHeaderText: "Navegacion",
            routes: [
                {
                    linkText: "Dashboard",
                    routeName: "dashboard",
                },
                {
                    linkText: "Hola",
                    routeName: "hola",
                },
            ],
        },
        {
            hasPermission: permissions.some(
                (permission) => permission.name === "isAdmin"
            ),
            subHeaderText: "roles y permisos",
            routes: [
                {
                    linkText: "Roles",
                    routeName: "admin.role.index",
                },
                {
                    linkText: "Permisos",
                    routeName: "admin.permission.index",
                },
            ],
        },
        {
            hasPermission: permissions.some(
                (permission) => permission.name === "isAdmin"
            ),
            subHeaderText: "Usuarios",
            routes: [
                {
                    linkText: "Usuarios",
                    routeName: "admin.user.index",
                },
            ],
        },
    ];

    // definicion de las rutas que se renderizaran en el drawer

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            background: {
                default: "#1c232f",
                paper: "#1c232f",
            },
            text: {
                primary: "#ced4dc",
                secondary: "#ced4dc",
            },
        },
    });

    const drawer = (
        <div>
            <Box className="h-20 bg-[#161c25] grid place-content-center">
                <h1 className="text-bold text-3xl uppercase ">Intranet UC</h1>
            </Box>
            <Divider />
            <nav>
                {/* rutas del drawer */}
                {drawerRoutesList.map((drawerRoute, index) => {
                    if (drawerRoute.hasPermission) {
                        return (
                            <List
                                key={index}
                                // texto cabecera de las rutas en el drawer
                                subheader={
                                    <ListSubheader
                                        component="div"
                                        id="role-and-permission"
                                    >
                                        <span className="ml-2 text-[#7267ef] capitalize">
                                            {drawerRoute.subHeaderText}
                                        </span>
                                    </ListSubheader>
                                }
                            >
                                {/* lista debotones de cada ruta */}
                                {drawerRoute.routes.map((route, index) => (
                                    <DrawerLink
                                        key={index}
                                        primary={route.linkText}
                                        routeName={route.routeName}
                                    />
                                ))}
                            </List>
                        );
                    }
                })}

                {/* Profile's Links */}
                <List
                    sx={{ display: { xs: "block", sm: "none" } }}
                    subheader={
                        <ListSubheader component="div" id="role-and-permission">
                            <span className="ml-2 text-[#7267ef] capitalize">
                                {user.name}
                            </span>
                        </ListSubheader>
                    }
                >
                    <DrawerLink primary="Perfil" routeName="profile.edit" />

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full"
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Finalizar Sesión" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </nav>
        </div>
    );

    return (
        <>
            <TopBar
                drawerWidth={drawerWidth}
                user={user}
                handleDrawerToggle={handleDrawerToggle}
            />

            <ThemeProvider theme={darkTheme}>
                <Drawer
                    sx={{
                        display: { xs: "block", sm: "none" },

                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    anchor="left"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </ThemeProvider>
        </>
    );
}
