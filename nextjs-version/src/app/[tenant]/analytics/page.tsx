'use client';
import GetAnalytics from '@/components/analytics/GetAnalytics'
import PrivateLayout from '@/components/layouts/PrivateLayout';
import React from 'react'

export default function Analytics() {
    return (
        <PrivateLayout>
            <GetAnalytics />
        </PrivateLayout>
    )
}
