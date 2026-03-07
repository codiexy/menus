'use client';
import GetFeedback from '@/components/feedback/GetFeedback'
import PrivateLayout from '@/components/layouts/PrivateLayout';

export default function Feedback() {
  return (
    <PrivateLayout>
      <GetFeedback />
    </PrivateLayout>
  )
}
