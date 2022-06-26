import './footer.css';
import { Col, Icon, NavItem, Row } from "react-materialize"
import { useDispatch } from 'react-redux';
import { logoutMiddleware } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const exitHandler = (event:any) => {
        dispatch(logoutMiddleware());
    }

    const menuHandler = (url:string) => {
        return (e:any) => {
            e.preventDefault();
            navigate(url);}
    }

    return (
        <footer className='center' style={{"zIndex": "1"}}>
            <Row  style={{"margin": 0}}>
                <Col  s={12} m={10} xl={6} offset="m1 xl3" >

                    <div
                        className='white z-depth-3 p-1 navigation-bar'
                        id="mobile-nav"
                    >
                      <NavItem className="waves-effect waves-gray btn-flat" onClick={menuHandler('/')}>
                            <Icon>
                                home
                            </Icon>
                      </NavItem>
                      <NavItem className="waves-effect waves-gray btn-flat" onClick={menuHandler('/post-book')}>
                            <Icon>
                                add_box
                            </Icon>
                      </NavItem>
                      <NavItem onClick={exitHandler}>
                          <Icon>
                              exit_to_app
                          </Icon>
                      </NavItem>
                    </div>

                </Col>
            </Row>

        </footer>
    )
}

export default Footer;


// <div className='navigation-bar z-depth-3 white'>
// <div className='d-flex no-wrap'>
//     <Button
//         className='nav-button'
//         flat
//         node="button"
//         waves="light"
//     >
//         <Icon>
//             home
//         </Icon>
//        Home
//     </Button>
//     <Button
//         className='nav-button'
//         flat
//         node="button"
//         waves="light"
//     >
//         <Icon >
//             settings
//         </Icon>
//         Settings
//     </Button>
//     <Button
//         className='nav-button'
//         flat
//         node="button"
//         waves="light"
//     >
//         <Icon >
//             search
//         </Icon>
//         Search
//     </Button>
// </div >
// <a className='white'>
//     <Icon medium>
//         add_boxa
//     </Icon>
// </a>
// <div className='d-flex no-wrap'>
//     <Button
//         className='nav-button'
//         flat
//         node="button"
//         waves="light"
//     >
//         <Icon>
//             email
//         </Icon>
//         Messages
//     </Button>
//     <Button
//         className='nav-button'
//         flat
//         node="button"
//         waves="light"
//     >
//         <Icon>
//             people
//         </Icon>
//         Friends
//     </Button>
//     <Button
//         className='nav-button'
//         flat
//         node="button"
//         waves="light"
//     >
//         <Icon>
//             exit_to_app
//         </Icon>
//         Exit
//     </Button>
// </div>
// </div>