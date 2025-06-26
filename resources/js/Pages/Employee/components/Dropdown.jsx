import Dropdown from "@/Components/Dropdown";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGripLines } from "@fortawesome/free-solid-svg-icons";

export default function EmployeeDropdownMenu({ auth, links }) {
    const isAdmin = auth.permissions.find(
        (permission) => permission.name === "isAdmin"
    );

    const dropDownSpanStyle = {
        fontSize:'40px',
        color:'#7267EF',
        cursor:'cursor'
    }

    const dropDownContentStyle = {
        fontSize: '20px'
    }

    return (
            <Dropdown>
                <Dropdown.Trigger>
                    <span style={dropDownSpanStyle}>
                        <FontAwesomeIcon icon={faGripLines}  />
                    </span>
                </Dropdown.Trigger>

                <Dropdown.Content align="left" style={dropDownContentStyle}>
                    {
                        links.map( (_link,index) => (
                            <Dropdown.Link
                                href={route(`${_link.route}`)}
                                key={index}
                            >
                                {`${_link.title}`}
                            </Dropdown.Link>
                        ) )
                    }
                </Dropdown.Content>
            </Dropdown>
    );
}