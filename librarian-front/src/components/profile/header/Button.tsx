import { Button, Icon } from "react-materialize";

interface ButtonParameters {
    className?:string,
    icon?:string,
    innertText:string,
    onClick?:() => void,
    disable?:boolean
}

const ButtonCustom = ({className, icon = "", innertText, onClick, disable = false}:ButtonParameters) => {

    return (
        <Button
        onClick={onClick}
        className={`${className} lighten-2`}
        node="button"
        style={{
            marginRight: '5px'
        }}
        disabled={disable}
        waves="light"
    >
        <Icon left center>
            {icon}
        </Icon>
        {innertText}
    </Button>

    );
}

export default ButtonCustom