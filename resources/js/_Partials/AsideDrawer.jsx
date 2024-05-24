import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';

import TopBar from '@/_Partials/TopBar';

import DrawerLink from '@/Components/DrawerLink';

export default function AsideDrawer({user,drawerWidth})
{
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

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: '#1c232f',
                paper: '#1c232f',
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
                <h1 className='text-bold text-3xl uppercase '>Intranet UC</h1>
            </Box>
            <Divider />
            <nav>                            
                <List 
                    subheader={
                        <ListSubheader component="div" id="navigation">
                            <span className='ml-2 text-[#7267ef] capitalize'>Navegacion</span>
                        </ListSubheader>
                    }
                >
                    <DrawerLink primary='Dashboard' routeName='dashboard' />
                    <DrawerLink primary='Hola'      routeName='hola' />
                </List>

                <List
                    subheader={
                        <ListSubheader component="div" id="role-and-permission">
                            <span className='ml-2 text-[#7267ef] capitalize'>roles y permisos</span>
                        </ListSubheader>
                    }
                >
                    <DrawerLink primary='Dashboard' routeName='dashboard' />
                    <DrawerLink primary='Hola'      routeName='hola' />
                </List>
            </nav>
        </div>
    )

    return(
        <>
            <TopBar drawerWidth={drawerWidth} user={user} handleDrawerToggle={handleDrawerToggle} />

            <ThemeProvider theme={darkTheme}>
                <Drawer
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
                        display: { xs: 'none', sm: 'block' },
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                    >
                        {drawer}
                </Drawer>
            </ThemeProvider>
        </>
    )
}