import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Dropdown from '@/Components/Dropdown';

import translation from '@/../lang/es.json'

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


const drawerWidth = 280;

export default function AdminLayout({user, children})
{
    return(
        
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar className="bg-white h-20 flex justify-between">
                    <p className='text-black text-lg font-bold'>Tool Bar</p>
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name}

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>{translation['Profile']}</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        {translation['Log Out']}
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

            <ThemeProvider theme={darkTheme}>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Box className="h-20 bg-[#161c25] grid place-content-center">
                        <h1 className='text-bold text-3xl uppercase '>Intranet UC</h1>
                    </Box>
                    <Divider />
                    <nav>                            
                        <List 
                            subheader={
                                <ListSubheader component="div" id="role-and-permission">
                                    <span className='ml-2 text-[#7267ef] capitalize'>Navegacion</span>
                                </ListSubheader>
                            }
                        >
                            <ListItem disablePadding>
                                <ListItemButton component="a" href={route('dashboard')} selected={route().current('dashboard')}>
                                    <ListItemText primary="Dashboard"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href={route('hola')} selected={route().current('hola')}>
                                    <ListItemText primary="Hola"/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <List
                            subheader={
                                <ListSubheader component="div" id="role-and-permission">
                                    <span className='ml-2 text-[#7267ef] capitalize'>roles y permisos</span>
                                </ListSubheader>
                            }
                        >
                            <ListItem disablePadding>
                                <ListItemButton component="a" href={route('dashboard')} selected={route().current('dashboard')}>
                                    <ListItemText primary="Dashboard"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href={route('hola')} selected={route().current('hola')}>
                                    <ListItemText primary="Hola"/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Drawer>
            </ThemeProvider>
            
            <Box
                component="main"
                className='p-3 grow'
            >
                <Toolbar />

                {children}
                {children}
                {children}
            </Box>
        </Box>
    )
}