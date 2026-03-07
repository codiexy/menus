import { Navigate } from 'react-router-dom';

import PublicLayout from './PublicLayout';
import { UserAuth } from '../../context/AuthContext';
import useIsServer from '../miscellaneous/UseIsServer';
import SiteLoader from '../miscellaneous/SiteLoader';

const PrivateLayout = ({ children, redirect = true }) => {
    const { user } = UserAuth();
    const isServer = useIsServer();


    // If user is not logged in
    if (!isServer && !user) {
        return <Navigate to="/login" />
    }

    // If user is not admin
    if (!isServer && redirect && !user?.isAdmin) {
        return <Navigate to="/hot-dog-kings/menu" />
    }

    if (isServer) {
        return <SiteLoader />
    }

    return (
        <PublicLayout>
            {children}
        </PublicLayout>
    );

};

export default PrivateLayout;