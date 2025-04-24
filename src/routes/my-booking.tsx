import { createFileRoute } from '@tanstack/react-router'
import { AuthChecker } from '../components/AuthChecker'
import MyBookingPage from '../page/my-booking'

export const Route = createFileRoute('/my-booking')({
    component: () => (
        <AuthChecker requiredLogin={true}>
            <MyBookingPage />
        </AuthChecker>
    ),
    staticData: {
        label: 'My Booking'
    }
})