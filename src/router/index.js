import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        redirect:'/home'
    },
    {
        path: '/',
        name: 'Home',
        component:()=>import('@/views/View.vue'),
        children: [
            {
                path:'/home',
                name: '首页',
                component:()=>import('@/views/HomePage.vue')
            },

        ]
    }
]

const router = createRouter ({
    history: createWebHashHistory(),
        routes
})
export default router