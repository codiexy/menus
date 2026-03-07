import React from 'react'
import { PrivateLayout } from '../components/layouts'
import GetFeedback from '../components/feedback/GetFeedback'

export default function Feedback() {
  return (
    <PrivateLayout>
      <GetFeedback />
    </PrivateLayout>
  )
}
