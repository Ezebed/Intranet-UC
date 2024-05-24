import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Link } from '@inertiajs/react';

export default function UserDropdown({user})
{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <Box sx={{ display:{ xs: 'none', sm: 'block' } }}>
            <Button
                id='userDropdown'
                aria-controls={open ? 'user-menu': undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true': undefined}
                onClick={handleClick}
            >
                {user.name}
            </Button>
            <Menu
                id='user-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'user-menu',
                }}
            >
                <Link href={route('profile.edit')}>
                    <MenuItem onClick={handleClose}>
                        Perfil
                    </MenuItem>
                </Link>
                <Link href={route('logout')} method="post" as="button" >
                    <MenuItem onClick={handleClose}>
                        Finalizar Sesión
                    </MenuItem>
                </Link>
            </Menu>
        </Box>
    )
}