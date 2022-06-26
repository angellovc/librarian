import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({
    isAuthenticated,
    children
}:{isAuthenticated:boolean, children:any}) => {

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search );


    return (
        isAuthenticated?
            children:
            <Navigate to="/auth"/>
    )
}

export default PrivateRoute
