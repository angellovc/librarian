import { Divider, Dropdown, Icon } from "react-materialize";
import { useNavigate } from "react-router-dom";
import './dropDownOptions.css'

const DropDownOptions = () => {


    const navigate = useNavigate();

    const navigateHandler = (path:string) => {
        return (event:any) => {
            event.preventDefault();
            navigate(path);
        }
    }

    return (
        <Dropdown
            id="Dropdown_8"
            options={{
                alignment: 'right',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                container: null,
                coverTrigger: false,
                hover: false,
                inDuration: 150,
                outDuration: 250
            }}
            trigger={<button className="btn-flat waves-effect waves-light white " ><Icon large style={{"color": "black"}}>menu</Icon></button>}
        >
            <Divider />
            <div className="p-y-1 d-flex" onClick={navigateHandler('/profile-editor')}>
                <div className="w-100 d-flex flex-center">
                    <Icon center>
                        settings
                    </Icon>
                </div>
                <div className="w-100 d-flex flex-center">
                Profile
                </div>
            </div>
            <Divider />
            <div className="p-y-1 d-flex" onClick={navigateHandler('/profile-editor')}>
                <div className="w-100 d-flex flex-center">
                    <Icon>
                        add
                    </Icon>
                </div>
                <div className="w-100 d-flex flex-center">
                    Post Book
                </div>
            </div>
</Dropdown>

    );
}

export default DropDownOptions;