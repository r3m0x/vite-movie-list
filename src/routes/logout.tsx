import { createFileRoute } from '@tanstack/react-router'
import LogoutPage from '../page/logout'

export const Route = createFileRoute('/logout')({
    component: LogoutPage,
    staticData: {
        label: 'Logout'
    }
})