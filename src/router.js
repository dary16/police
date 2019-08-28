import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '*',
            redirect: '/login'
        }, {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/views/login.vue')
        },
        {
            path: '/info',
            name: 'info',
            component: () =>
                import ('@/views/info.vue')
        },
        {
            path: '/main',
            name: 'main',
            component: () =>
                import ('@/views/main.vue')
        },
        {
            path: '/list',
            name: 'list',
            component: () =>
                import ('@/views/list.vue')
        },
        {
            path: '/map',
            name: 'map',
            component: () =>
                import ('@/views/map.vue')
        }
    ]
})