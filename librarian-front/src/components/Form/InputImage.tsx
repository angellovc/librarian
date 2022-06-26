import { Dispatch, SetStateAction } from "react";
import { Icon } from "react-materialize";
import Swal from "sweetalert2";

interface Inputparameters {
    picturePathHandler:Dispatch<SetStateAction<string>>,
    pictureFileHandler:Dispatch<SetStateAction<File>>|Dispatch<SetStateAction<undefined>>,
    style?:object,
    innerText:string
}

const InputImage = ({picturePathHandler, pictureFileHandler, style, innerText}:Inputparameters) => {


    const profilePictureHandle = (event:any) => {
        if (["image/jpg", "image/png", "image/gif", "image/jpeg"].includes(event?.target?.files[0].type)) {
            picturePathHandler(URL.createObjectURL(event?.target?.files[0]));
            pictureFileHandler(event?.target?.files[0]);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Format',
                text: 'Only images are allowed',
              })
        }
    }

    return (
        <div className="file-field input-field">
            <div className="btn" style={style}>
                <Icon left>
                    photo
                </Icon>
                <span>{innerText}</span>
                <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={profilePictureHandle} />
            </div>
            <div className="file-path-wrapper">
                <input hidden className="file-path validate" type="text" />
            </div>
        </div>
    );
}

export default InputImage;