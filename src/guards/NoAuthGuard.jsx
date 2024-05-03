import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';
import { USER_INFO } from './constants';

const NoAuthGuard = ({ component }) => {
    const [userInfo] = useSessionStorage(USER_INFO, null);

    useEffect(() => {
        console.log("NoAuth Guard");
    }, []);

    if (userInfo) return <Navigate to="/" replace={true} />

    return <>{component}</>
}

export default NoAuthGuard;