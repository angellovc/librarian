import { useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import PrivateRoute from './PrivateRouter';
import { PublicRoute } from './PublicRouter';
import { DashboardRoutes } from './DashBoardRouter';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { checkForValidStoredToken } from '../actions/authActions';
import { AuthRouter } from './AuthRouter';
import { AuthSession } from '../types/authTypes';


const AppRouter = () => {
    const auth:AuthSession = useSelector((state:any) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.id === undefined) {
            dispatch(checkForValidStoredToken());
        }
    }, [dispatch, auth.id])


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={ 
                        <PrivateRoute isAuthenticated={!!auth.id} >
                            <DashboardRoutes/>
                        </PrivateRoute>
                    } 
                />
                <Route path="/auth/*" element={
                    <PublicRoute isAuthenticated={!!auth.id}>
                        <AuthRouter/>
                    </PublicRoute>
                } 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter