'use client';
import PrivateLayout from '@/components/layouts/PrivateLayout';
import { Subscriber } from '@/components/subscriber'
import React from 'react'

export default function Subscribers() {
  return (
    <PrivateLayout>
      <Subscriber />
    </PrivateLayout>
  )
}

