import PrimarySearchAppBar from "../PrimarySearchAppBar"
import MenuAppBar from '../MenuAppBar';
import MenuFooter from '../MenuFooter';
import { LoginPopup } from '../user';
import { AddReviewPopup } from '../review';
import { useRouter } from 'next/navigation'
import { useAuth } from "@/context/AuthContext";
import { getUserRole } from "@/helper";



const PublicLayout = ({ children, noHeader = false }: any) => {
    const { user } = useAuth();
    const router: any = useRouter();

    const urls = ["/login", "/signup"];

    const role = getUserRole(user);
    
    return (
        <main>
            {
                !noHeader ? (
                    <>
                        {
                            role == "admin" ? (
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
                !urls.includes(router.pathname) && user?.role != "admin" ? (
                    <AddReviewPopup />
                ) : ""
            }
            <LoginPopup />

        </main>
    );
}

export default PublicLayout;