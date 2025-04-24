import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../page/login'

export const Route = createFileRoute('/login')({
    component: LoginPage,
    staticData: {
        label: 'Login'
    }
})