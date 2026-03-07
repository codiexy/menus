"use client";
import { useTenant } from '@/context/TenantContext';
import { redirect } from 'next/navigation'


export default function TenantDashboard() {
  const { tenantSlug } = useTenant();

  redirect(`/${tenantSlug}/dashboard`);

  return (
    <main>
      {`${tenantSlug}/dashboard`}
    </main>
  )
}
