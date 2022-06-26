import { useEffect, useState } from "react";
import { Button, Col, Icon, Preloader, Row, TextInput } from "react-materialize";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { finishLoadingAction, startLoadingAction } from "../../actions/uiActions";
import useForm from '../../hooks/useForm';
import { httpRequest } from "../../utils/requests/httpRequest";

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {loading} = useSelector((state:any) => state?.ui);
    const [validPassword, setValidPassword] = useState(false);
    const [availableRequest, setAvailableRequest] = useState(true);
    const {token} = useParams();
    const formHandler = async (event:any) =>  {
        event.preventDefault();
        dispatch(startLoadingAction());
        const response = await httpRequest(process.env.REACT_APP_BACKEND+'/auth/change-password', 'POST', {token, newPassword: password});
        dispatch(finishLoadingAction());
        if (response !== null) {
            Swal.fire({
                icon: 'success',
                text: `Password was changed successfully`,
                showConfirmButton: true,
              })
            navigate('/auth/login');
        }
    }

    const [formState, setFormState] = useForm({password:"", confirmPassword: ""}, formHandler);
    const {password, confirmPassword} = formState;

    useEffect(() => {

        if(password.length > 3 && password === confirmPassword)
            setAvailableRequest(false);
        else
            setAvailableRequest(true);

        if (password.length > 3 && confirmPassword.length >= 1 && password !== confirmPassword ) {
            setValidPassword(false);
        }
        else {
            setValidPassword(true);
        }

    }, [password, confirmPassword, setValidPassword, setAvailableRequest]);


    return (
        <Row className="d-flex flex-center flex-column" style={{"minHeight": "90vh"}}>
            <Col className="z-depth-1" s={12} m={8} l={6}  >
                <form className="d-flex p-2 flex-column" onSubmit={formHandler}>
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
                        className="d-flex f-column flex-center"
                        disabled={loading||availableRequest}
                    >
                        <Icon left>
                            send
                        </Icon>
                        {
                            loading?
                                <Preloader
                                    active
                                    size="small"
                                    color="green"
                                />:
                                "Change Password" 
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
                        <a className='link' href='/auth/create-user'>
                            Create User
                        </a>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ChangePassword;