import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
    {
        name : 'Home',
        path : '/',
        component: Home,
        meta : {
            title : 'Groupomania'
        }
    },
    {
        name : 'Login',
        path : '/auth/login',
        component: Login,
        meta : {
            title : 'Groupomania | Connexion'
        }
    },
    {
        name : 'Register',
        path : '/auth/register',
        component: Register,
        meta : {
            title : 'Groupomania | Inscription'
        }
    },
    {
        name : 'NotFound',
        path : '/:pathMatch(.*)',
        component: NotFound,
        meta : {
            title : 'Groupomania | 404 Page non trouvée'
        }
    }

]

const router = createRouter({
    history : createWebHistory(),
    routes,
})

router.afterEach((to) => {
    document.title = to.meta.title;
});

export default router;