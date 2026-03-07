
import { useTenant } from "@/context/TenantContext";
import { trim } from "@/helper";
import Link from "next/link";


const TenantLink = ({ children, href, ...props }: any) => {
    const { tenantSlug }: any = useTenant();
    href = trim(href, "/");
    
    return (
        <Link
            href={`/${tenantSlug}/${href}`}
            {...props}
        >
            {children}
        </Link>
    )
}

export default TenantLink;