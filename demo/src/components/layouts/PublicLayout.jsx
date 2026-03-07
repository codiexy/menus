import { UserAuth } from '../../context/AuthContext';
import PrimarySearchAppBar from "../PrimarySearchAppBar"
import MenuAppBar from '../MenuAppBar';
import MenuFooter from '../MenuFooter';
import { AddReviewPopup } from '../review';
import { LoginPopup } from '../user';
import { useLocation } from 'react-router-dom';



const PublicLayout = ({ children, noHeader = false }) => {
    const { user } = UserAuth();
    const location = useLocation();

    const urls = ["/login", "/signup"];

    return (
        <>
            {
                !noHeader ? (
                    <>
                        {
                            user && user.isAdmin ? (
                                <PrimarySearchAppBar />
                            ) : (
                                <MenuAppBar />
                            )
                        }
                    </>
                ) : ""
            }
            <div className="manuverse-content">
                {children}
            </div>
            <MenuFooter />
            {
                !urls.includes(location.pathname) && !user?.isAdmin ? (
                    <AddReviewPopup />
                ) : ""
            }
            <LoginPopup />

        </>
    );
}

export default PublicLayout;