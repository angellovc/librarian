import { Row, Col } from 'react-materialize';
import { useNavigate } from 'react-router-dom';
import DropDown from '../../dropDown/DropDown';
import DropDownOpstion from '../../dropDown/DropDownOption';
import { ProfilePicture } from '../../ProfilePicture';
import ButtonCustom from './Button';


const Header = ({description, name, profilePicture, email, owner = false}:{description:string, name:string, profilePicture:string, email:string, owner?:boolean}) => {

    const navigate = useNavigate();

    const navigateHandler = (path:string) => {
        return (event:any) => {
            event.preventDefault();
            navigate(path);
        }
    }


    return (
        <header>
        <Row>
            <div className="navbar z-depth-1 border-bottom-round-1">
                {
                    owner && 
                    <div className='w-100 d-flex' style={{"justifyContent": "right"}}>
                        <DropDown id="header-options">
                            <DropDownOpstion innerText='Profile' icon='settings' onClick={navigateHandler('/profile-editor')}/>
                            <DropDownOpstion innerText='Add Book' icon='add' onClick={navigateHandler('/post-book')}/>
                        </DropDown>
                    </div>
                }
                <ProfilePicture name={name} profilePicture={process.env.REACT_APP_BACKEND+"/"+profilePicture}/>
                <h6 className='capitalize grey-text text-darken-0'>{email}</h6>
                <Row>
                <h2 className='m-x-1 capitalize grey-text text-darken-2'>{name}</h2>
                    <Col offset="s1" s={10} className='description' >
                        <p>
                            {description}
                        </p>
                    </Col>
                    {
                            !owner && <>
                                <Col s={6} style={{"marginBlock": "3rem"}}>
                                    <ButtonCustom className='brown' icon='person_add' innertText='Add Friend'/>
                                </Col>
                                <Col s={6} style={{"marginBlock": "3rem"}}>
                                    <ButtonCustom className='brown' icon='mail' innertText='Send Message'/>
                                </Col>
                            </>
                    }
                </Row>
            </div>
        </Row>

        </header>
    )
}

export default Header;