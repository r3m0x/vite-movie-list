import { createFileRoute } from '@tanstack/react-router'

import AdminDashboardPage from '../../page/admin/dashboard'
import { AuthChecker } from '../../components/common/AuthChecker'

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
