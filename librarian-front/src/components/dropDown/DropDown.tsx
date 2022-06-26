import { Dropdown, Icon } from "react-materialize";
import './dropDownOptions.css';

interface DropDownProps {
    id?:string;
    icon?:string;
    children:any;
}

const DropDown = ({id, children, icon = 'menu'}:DropDownProps) => {

    return (
        <Dropdown
            id={id}
            options={{
                alignment: 'right',
                closeOnClick: true,
                autoTrigger: false,
                constrainWidth: true,
                container: null,
                coverTrigger: false,
                hover: false,
                inDuration: 150,
                outDuration: 250
            }}
            trigger={  <button className="btn-flat waves-effect waves-light white "  ><Icon large style={{"color": "black"}}>{icon}</Icon></button>}
        >
            {children}
        </Dropdown>

    );
}

export default DropDown;