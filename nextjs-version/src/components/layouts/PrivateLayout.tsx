// "use client";
import PublicLayout from "@/components/layouts/PublicLayout";
import { useAuth } from '@/context/AuthContext';
import { getUserRole } from "@/helper";
import { redirect } from 'next/navigation';

const PrivateLayout = ({ children }: any) => {
    const { user, tenantSlug } = useAuth();

    console.log(user, 'user')
    const role = getUserRole(user);
    // If user is not logged in or user not a tenant owner
    if (!user || role != "admin") {
        redirect(`/${tenantSlug}/menu`);
    }

    return (
        <PublicLayout>
            {children}
        </PublicLayout>
    );

};

export default PrivateLayout;