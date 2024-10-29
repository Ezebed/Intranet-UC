import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";

export default function LinkList({ subHeaderText, children }) {
    return (
        <List
            // texto cabecera de las rutas en el drawer
            subheader={
                <ListSubheader component="div" id="role-and-permission">
                    <span className="ml-2 text-[#7267ef] capitalize">
                        {subHeaderText}
                    </span>
                </ListSubheader>
            }
        >
            {children}
        </List>
    );
}
