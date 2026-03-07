'use client';
import { Menus } from "@/components/dish";
import PublicLayout from "@/components/layouts/PublicLayout";


export default function Recommendations() {
    return (
        <PublicLayout redirect={false}>
            <Menus recommendation={true} />
        </PublicLayout>
    );
}