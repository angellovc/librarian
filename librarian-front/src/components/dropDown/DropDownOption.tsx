import { Divider, Icon } from "react-materialize";

interface DropDownOptionProps {
    onClick?: (event:any) => void
    icon?:string
    innerText?:string
}

const DropDownOpstion = ({onClick, icon, innerText}:DropDownOptionProps) => {
    return (
        <>
            <Divider />
            <div className="p-y-1 d-flex" onClick={onClick}>
                <div className="w-100 d-flex flex-center">
                    <Icon center>
                        {icon}
                    </Icon>
                </div>
                <div className="w-100 d-flex flex-center">
                    {innerText}
                </div>
            </div>
            <Divider />
        </>
    );
}

export default DropDownOpstion;