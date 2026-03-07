'use client';
import PrivateLayout from '@/components/layouts/PrivateLayout';
import GetQrCode from '@/components/qrcode/GetQrCode'
import React from 'react'

export default function QrCode() {
    return (
        <PrivateLayout>
            <GetQrCode />
        </PrivateLayout>
    )
}
