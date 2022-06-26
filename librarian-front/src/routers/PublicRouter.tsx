import { Navigate } from 'react-router-dom';


export const PublicRoute = ({ isAuthenticated, children }:{isAuthenticated:boolean, children:any}) => {

    const lastPath = localStorage.getItem('lastPath') || '/';

    return isAuthenticated?
         <Navigate to={lastPath.includes('auth')? '/': lastPath}/>: 
         children
}