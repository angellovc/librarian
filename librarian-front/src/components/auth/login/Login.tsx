import './login.css';
import { useEffect, useState } from "react";
import { Button, Col, Icon, Preloader, Row, TextInput } from "react-materialize";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginMiddleware } from "../../../actions/authActions";
import useForm from "../../../hooks/useForm";

// Email regex checker
const regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

const Login = () => {
    const {loading} = useSelector((state:any) => state?.ui);
    const [availableRequest, setAvailableRequest] = useState(true);


    const formHandler = async (e:any) =>  {
        e.preventDefault()
        dispatch(loginMiddleware(email, password));
    }

    const [formState, setFormState] = useForm({password:"", email: ""}, formHandler);
    const {password, email} = formState;
    const dispatch = useDispatch()


    useEffect(() => {
        if(regex.test(email) && password.length > 3)
            setAvailableRequest(false);
        else
            setAvailableRequest(true);
    }, [password, email]);




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
                    <TextInput
                        validate={true}
                        icon="password"
                        id="TextInput-59"
                        name="password"
                        password
                        onChange={setFormState}
                        value={password}
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
                                "Login" 
                        }
                    </Button>
                </form>
                <Row>
                    <Col className="center" s={6}>
                        <a className='link' href='/auth/create-user'>
                            Create account
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

export default Login;