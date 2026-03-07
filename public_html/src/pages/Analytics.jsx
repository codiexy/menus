import React from 'react'
import { PrivateLayout } from '../components/layouts'
import GetAnalytics from '../components/analytics/GetAnalytics'

export default function Analytics() {
  return (
    <PrivateLayout>
      <GetAnalytics />
    </PrivateLayout>
  )
}
