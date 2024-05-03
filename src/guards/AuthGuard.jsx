import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';
import { USER_INFO } from './constants';

const AuthGuard = ({ component }) => {
    const [userInfo] = useSessionStorage(USER_INFO, null);

    useEffect(() => {
        console.log("Auth Guard");
    }, []);

    if (!userInfo) return <Navigate to="/login" replace={true} />

    return <>{component}</>
}

export default AuthGuard;