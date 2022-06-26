import { useEffect, useState } from "react";
import { Button, Col, Icon, Preloader, Row, TextInput } from "react-materialize";
import { useSelector } from "react-redux";
import useForm from '../../hooks/useForm';
import { httpRequest } from "../../utils/requests/httpRequest";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { finishLoadingAction, startLoadingAction } from "../../actions/uiActions";
import Swal from "sweetalert2";


// Email regex checker
const regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

const RestorePassword = () => {
    const {loading} = useSelector((state:any) => state?.ui);
    const [availableRequest, setAvailableRequest] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formHandler = async (event:any) =>  {
        event.preventDefault();
        dispatch(startLoadingAction());
        const response = await httpRequest(process.env.REACT_APP_BACKEND+'/auth/recovery','POST', {email});
        dispatch(finishLoadingAction());
        if (response !== null) {
            Swal.fire({
                icon: 'success',
                text: `Password recovery email was sent successfully to ${email}`,
                showConfirmButton: true,
              })
            navigate('/auth/login');
        }
    }

    const [formState, setFormState] = useForm({email: ""}, formHandler);
    const {email} = formState;


    useEffect(() => {
        if(regex.test(email))
            setAvailableRequest(false);
        else
            setAvailableRequest(true);
    }, [email]);




    return (
        <Row className="d-flex flex-column flex-center" style={{"height": "90vh"}}>
            <Col className="z-depth-1" s={12} m={8} l={6}  >
                <form className="d-flex flex-column p-2" onSubmit={formHandler}>
                    <TextInput
                        icon="email"
                        email
                        error="Not a valid email"
                        id="TextInput-70"
                        name="email"
                        validate={true}
                        onChange={setFormState}
                        value={email}
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
                            send
                        </Icon>
                        {
                            loading?
                                <Preloader
                                    active
                                    size="small"
                                    color="green"
                                />:
                                "Restore" 
                        }
                    </Button>
                </form>
                <Row>
                    <Col  className="center" s={6}>
                        <a className='link' href='/auth/login'>
                            Login
                        </a>
                    </Col>
                    <Col className="center" s={6}>
                        <a className='link' href='/auth/create-user'>
                            Create account
                        </a>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default RestorePassword;