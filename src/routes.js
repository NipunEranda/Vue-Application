import Home from './components/Home.vue';
import Job from './components/Job.vue';
export const  routes = [
    {
        path: '',
        name: 'home',
        component: Home
    },
    {
        path: '/job/:id',
        name: 'job',
        component: Job
    }
];