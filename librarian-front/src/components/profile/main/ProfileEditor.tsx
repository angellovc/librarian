import { useEffect, useState } from "react";
import { Button, Col, Icon, Row, Textarea, TextInput } from "react-materialize";
import InputImage from "../../Form/InputImage";
import { ProfilePicture } from "../../ProfilePicture";
import ButtonCustom from "../header/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserMiddleware } from "../../../actions/userActions";
import { finishLoadingAction, startLoadingAction } from "../../../actions/uiActions";
import { useSelector } from "react-redux";

const ProfileEditor = ({name, description, email, picture}:{name:string, description:string, email:string, picture:string}) => {

    const {loading} = useSelector((state:any) => state.ui);
    const [isDisable, setIsDisable] = useState(false);

    const [picturePath, setPicturePath] =  useState('');
    const [pictureFile, setPictureFile] = useState(undefined);
    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);
    const navigate = useNavigate();
    const dispath = useDispatch();    

    const nameHandler = (event:any) => setNewName(event.target.value);
    const descriptionHandler = (event:any) => setNewDescription(event.target.value);
    const discardPictureHandler = () => {
        setPicturePath('');
        setPictureFile(undefined);
    }
    const saveProfileChanges = () => {
        dispath(startLoadingAction());
        dispath(updateUserMiddleware({name:newName, description:newDescription, pictureFile:pictureFile, oldPicture:picture}));
        dispath(finishLoadingAction());
        navigate('/');
    }
    const discardProfileChanges = () => navigate('/')

    useEffect(() => {
        if (newName.length > 3)
            setIsDisable(false);
        else
            setIsDisable(true)
    }, [newName]); 


    return (
        <Row>
            <div className="navbar z-depth-1 border-bottom-round-1">
                <ProfilePicture name={name} profilePicture={picturePath === ''? process.env.REACT_APP_BACKEND+"/"+picture: picturePath}/>
                <h6 className='capitalize grey-text text-darken-0'>{email}</h6>
                <Row >
                    <Col  s={12} >
                    <div className='d-flex flex-center' style={{"width": "100%"}}>
                        <Button flat={true} onClick={discardPictureHandler} icon={<Icon>cancel</Icon>}/>
                        <InputImage style={{"width": "100%"}} innerText="Profile Picture" pictureFileHandler={setPictureFile} picturePathHandler={setPicturePath}/>
                    </div>
                    </Col>
                    <Col s={10}  offset="s1 m2">
                        <TextInput s={12} m={8}   icon="person" inputClassName="center" label="User Name" name="name" value={newName} onChange={nameHandler}/>
                    </Col>
                    <Col s={10}  offset="s1 m2">
                        <Textarea s={12} m={8}  icon={<Icon >description</Icon>} data-length={150} id="description" label="Description" onChange={descriptionHandler} value={newDescription}/>

                    </Col>
                    <Col className='d-flex flex-center j-between' style={{"width": "100%"}}>
                        <ButtonCustom innertText="Discard" onClick={discardProfileChanges}/>
                        <ButtonCustom innertText="Save" disable={loading||isDisable} onClick={saveProfileChanges}/>
                    </Col>
                </Row>
            </div>
        </Row>
    );
}


export default ProfileEditor;