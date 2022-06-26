import { useEffect, useState } from "react";
import { Button, Col, Icon, Preloader, Row, TextInput } from "react-materialize";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createUserMiddleware } from "../../actions/userActions";
import useForm from '../../hooks/useForm';
import { ProfilePicture } from "../ProfilePicture";

// Email regex checker
const regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

const CreateUser = () => {
    const dispatch = useDispatch()
    const {loading} = useSelector((state:any) => state?.ui);
    const [validPassword, setValidPassword] = useState(false);
    const [validDescription, setValidDescription] = useState(false);
    const [availableRequest, setAvailableRequest] = useState(true);
    const [profilePicture, setProfilePicture] = useState("");
    const [pictureFile, setPictureFile] = useState(undefined);
    const formHandler = async (e:any) =>  {
        e.preventDefault();
        dispatch(createUserMiddleware(name, description, email, password, pictureFile));
    }

    const [formState, setFormState] = useForm({password:"", email: "", name: "", confirmPassword: "", description: ""}, formHandler);
    const {password, confirmPassword, email, name, description} = formState;

    useEffect(() => {
        if(regex.test(email) && password.length > 3 && password === confirmPassword && name.length  > 3 && description.length < 200)
            setAvailableRequest(false);
        else
            setAvailableRequest(true);

        if (password.length > 3 && confirmPassword.length >= 1 && password !== confirmPassword )
            setValidPassword(false);
        else 
            setValidPassword(true);

        if (description.length >= 200) {
            setValidDescription(false);
        } else {
            setValidDescription(true);
        }

    }, [password, email, confirmPassword, name, setValidPassword, validDescription, setValidDescription, description]);

    const profilePictureHandle = (event:any) => {
        if (["image/jpg", "image/png", "image/gif", "image/jpeg"].includes(event?.target?.files[0].type)) {
            setProfilePicture(URL.createObjectURL(event?.target?.files[0]));
            setPictureFile(event?.target?.files[0]);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        }
    }

    return (
        <Row className="d-flex flex-column flex-center" style={{"minHeight": "90vh"}}>
            <Col className="z-depth-1" s={12} m={8} l={6}  >
                <ProfilePicture profilePicture={profilePicture} name={name} />
                <form className="d-flex flex-column p-2" onSubmit={formHandler}>
                    <div className="file-field input-field">
                        <div className="btn">
                            <Icon left>
                                photo
                            </Icon>
                            <span>Profile Picture</span>
                            <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={profilePictureHandle} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <TextInput
                        placeholder="* Name of the user"
                        icon="person"
                        id="TextInput-70"
                        name="name"
                        onChange={setFormState}
                        value={name}
                    />
                    <TextInput
                        inputClassName={validDescription? 'valid': 'invalid'}
                        error='Should be less than 200 characteres long'
                        placeholder="Add any description of yourself"
                        icon="art_track"
                        id="TextInput-70"
                        name="description"
                        validate={true}
                        onChange={setFormState}
                        value={description}
                    />
                    <TextInput
                        placeholder="* Email"
                        icon="email"
                        email
                        error="Not a valid email"
                        id="TextInput-70"
                        name="email"
                        validate={true}
                        onChange={setFormState}
                        value={email}
                    />
                    <TextInput
                        placeholder="Password"
                        validate={true}
                        icon="password"
                        id="TextInput-59"
                        name="password"
                        password
                        inputClassName={validPassword? 'valid': 'invalid'}
                        onChange={setFormState}
                        value={password}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        validate={true}
                        icon="password"
                        id="TextInput-59"
                        name="confirmPassword"
                        password
                        inputClassName={validPassword? 'valid': 'invalid'}
                        error="Should be identical"
                        onChange={setFormState}
                        value={confirmPassword}
                    />
                     <input type="submit" hidden disabled={loading||availableRequest}/>
                    <Button
                        onClick={formHandler}
                        large
                        node="a"
                        waves="light"
                        className="d-flex flex-center"
                        disabled={loading||availableRequest}
                    >
                        <Icon left>
                            person_add
                        </Icon>
                        {
                            loading?
                                <Preloader
                                    active
                                    size="small"
                                    color="green"
                                />:
                                "Create" 
                        }
                    </Button>
                </form>
                <Row>
                    <Col className="center" s={6}>
                        <a className='link' href='/auth/login'>
                            Login
                        </a>
                    </Col>
                    <Col  className="center" s={6}>
                        <a className='link' href='/auth/restore-password'>
                            Restore Password
                        </a>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default CreateUser;