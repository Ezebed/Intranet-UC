import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function DrawerLink({primary, secondary, routeName='dashboard'})
{
    return(
        <ListItem disablePadding>
            <ListItemButton component="a" href={route(routeName)} selected={route().current(routeName)}>
                <ListItemText primary={primary} secondary={secondary}/>
            </ListItemButton>
        </ListItem>
    )
}