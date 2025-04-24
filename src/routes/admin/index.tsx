import { createFileRoute } from '@tanstack/react-router'
import { AuthChecker } from '../../components/AuthChecker'
import AdminDashboardPage from '../../page/admin/dashboard'

export const Route = createFileRoute('/admin/')({
    component: () => (
        <AuthChecker requiredLogin={true} requireAdmin={true}>
            <AdminDashboardPage />
        </AuthChecker>
    ),
    staticData: {
        label: 'Dashboard'
    }
})
