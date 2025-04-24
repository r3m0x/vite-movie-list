import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import { AuthChecker } from '../components/AuthChecker';
import HomePage from '../page/home';
import { Movie } from '../types/movie';

export const Route = createFileRoute('/')({
    component: () => (
        <AuthChecker requiredLogin={true}>
            <HomePage />
        </AuthChecker>
    ),
    loader: async () => {
        try {
            const response = await axios.get<Movie[]>('http://localhost:8080/api/getMoviesList');
            return response.data;
        } catch (error) {
            console.error('Movie data loading error:', error);
            return [];
        }
    },
    staticData: {
        label: 'Home'
    }
})


