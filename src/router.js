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
                import ('./views/login.vue')
        },
        {
            path: '/main',
            name: 'main',
            component: () =>
                import ('./views/main.vue'),
            children: [{
                    path: '/setting',
                    name: 'setting',
                    component: () =>
                        import ('./views/setting.vue')
                },
                {
                    path: '/list',
                    name: 'list',
                    component: () =>
                        import ('./views/list.vue')
                }
            ]
        },
        {
            path: '/unfinishedDetails',
            name: 'unfinishedDetails',
            component: () =>
                import ('./views/dispatchPolice/unfinishedDetails.vue')
        },
        {
            path: '/finishedDetails',
            name: 'finishedDetails',
            component: () =>
                import ('./views/dispatchPolice/finishedDetails.vue')
        },
        {
            path: '/map',
            name: 'map',
            component: () =>
                import ('./views/map.vue')
        },
        {
            path: '/result',
            name: 'result',
            component: () =>
                import ('./views/dispatchPolice/result.vue')
        },
        {
            path: '/selectPerson',
            name: 'selectPerson',
            component: () =>
                import ('./views/systemWarning/selectPerson.vue')
        },
        {
            path: '/systemWarningInfo',
            name: 'systemWarningInfo',
            component: () =>
                import ('./views/systemWarning/info.vue')
        },
        {
            path: '/faultMessage',
            name: 'faultMessage',
            component: () =>
                import ('./views/deviceFault/faultMessage.vue')
        },

    ]
})