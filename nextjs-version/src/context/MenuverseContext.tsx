'use client';
import SnackbarOpen from '@/components/miscellaneous/SnackBar';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface MenuverseProps {
    setSnackbar: (status: boolean, message: string) => void;
    siteLoading: boolean;
}

const MenuverseContext = createContext<MenuverseProps>({
    setSnackbar: (status = false, message = "") => { },
    siteLoading: true
});

const MenuverseProvider = ({ children }: any) => {
    const [snackbar, setSnackbar] = useState({ status: false, type: "", message: "" });
    const pathname = usePathname();

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const handleStart = (url: string) => (url !== pathname) && setLoading(true);
    //     const handleComplete = (url: string) => (url === pathname) && setLoading(false);

    //     Router.events.on('routeChangeStart', handleStart)
    //     router.events.on('routeChangeComplete', handleComplete)
    //     router.events.on('routeChangeError', handleComplete)

    //     return () => {
    //         router.events.off('routeChangeStart', handleStart)
    //         router.events.off('routeChangeComplete', handleComplete)
    //         router.events.off('routeChangeError', handleComplete)
    //     }
    // })

    const handleSnackbar = (status: boolean = false, message: string = "Something went wrong!") => {
        setSnackbar({
            status: true,
            type: status ? "success" : "error",
            message
        });
    }

    return (
        <MenuverseContext.Provider
            value={{
                setSnackbar: handleSnackbar,
                siteLoading: loading
            }}
        >
            {children}
            {
                snackbar.status ?
                    <SnackbarOpen
                        message={snackbar.message}
                        useOpen={() => [snackbar, setSnackbar]}
                        color={snackbar.type}
                    /> :
                    ""
            }
        </MenuverseContext.Provider>
    );
};

export const useMenuverse = () => {
    return useContext(MenuverseContext);
};

export default MenuverseProvider;