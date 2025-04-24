import { createFileRoute } from '@tanstack/react-router';
import { AuthChecker } from '../components/AuthChecker';
import HomePage from '../page/home';


export const Route = createFileRoute('/')({
    component: () => (
        <AuthChecker requiredLogin={true}>
            <HomePage />
        </AuthChecker>
    ),
    staticData: {
        label: 'Home'
    }
})


