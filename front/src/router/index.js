import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import NotFound from '@/views/NotFound.vue'
import Account from '@/views/Account.vue'

const routes = [
    {
        name : 'Home',
        path : '/groupomania/',
        component: Home,
        meta : {
            title : 'Groupomania | Home'
        }
    },
    {
        name : 'Login',
        path : '/groupomania/login',
        component: Login,
        meta : {
            title : 'Groupomania | Connexion'
        }
    },
    {
        name : 'Register',
        path : '/groupomania/register',
        component: Register,
        meta : {
            title : 'Groupomania | Inscription'
        }
    },
    {
        name : 'Account',
        path : '/groupomania/account',
        component: Account,
        meta : {
            title : 'Groupomania | Mon compte'
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
    mode: "hash",
    routes,
})

router.afterEach((to) => {
    document.title = to.meta.title;
});

export default router;