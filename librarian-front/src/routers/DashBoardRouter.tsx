import { useEffect } from 'react';
import { Col, Row } from 'react-materialize';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { cleanHttpStatus } from '../actions/uiActions';
import BookEditor from '../components/book/BookEditor';
import BookPreview from '../components/book/BookPreview';
import PostBook from '../components/book/PostBook';
import Footer from '../components/Footer';
import ProfileEditor from '../components/profile/main/ProfileEditor';
import Profile from '../components/profile/Profile';
import { AuthSession } from '../types/authTypes';
import { HttpStatus } from '../types/generalTypes';


export const DashboardRoutes = () => {

    const user:AuthSession = useSelector((state:any) => state.auth);
    const httpStatus = useSelector((state:any) => state.ui.httpStatus);
    const navigate = useNavigate();
    const dispatch = useDispatch();    

    useEffect(() => {
        if (httpStatus === HttpStatus.notFound) {
            navigate('/');
            dispatch(cleanHttpStatus());
        }
    }, [httpStatus, navigate, dispatch])

    return (
        <>
        <div style={{"marginBottom": "5rem"}}>
            <Row>
                <Col className='center' offset='m1 xl2' s={12} m={10} xl={8}>
                    <div className='container'>
                        <Routes>
                            <Route path="/" element={
                                <Profile name={user.name}  email={user.email} description={user.description} picture={user.picture} owner={true}/>
                            }/>
                            <Route path="/post-book" element={<PostBook />}/>
                            <Route path="/book-preview/:id" element={<BookPreview />} />
                            <Route path="/book-editor" element={<BookEditor />} />
                            <Route path="/profile-editor" element={<ProfileEditor name={user.name}  email={user.email} description={user.description} picture={user.picture} />}/>
                            <Route path='*' element={<Navigate to="/" />}/>
                        </Routes>
                    </div>
                </Col>
            </Row>
        </div>
        <Footer />
        </>
    )
}