
import { Routes, Route } from 'react-router-dom';
import ChangePassword from '../components/auth/ChangePassword';
import CreateUser from '../components/auth/CreateUser';
import Login from '../components/auth/login/Login';
import RestorePassword from '../components/auth/RestorePassword';

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/create-user" element={<CreateUser/>} />
            <Route path="/restore-password" element={<RestorePassword/>} />
            <Route path="/change-password/:token" element={<ChangePassword />} />
            <Route path="/" element={<Login/>}/>
        </Routes>
    )
}