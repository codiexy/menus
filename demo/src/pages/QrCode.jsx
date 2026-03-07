import React from 'react'
import { PrivateLayout } from '../components/layouts'
import GetQrCode from '../components/qrcode/GetQrCode'

export default function QrCode() {
  return (
    <PrivateLayout>
      <GetQrCode />
    </PrivateLayout>
  )
}
