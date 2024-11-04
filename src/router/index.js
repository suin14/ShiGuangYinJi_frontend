import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/',
        component: () => import('@/views/View.vue'),
        children: [
            {
                path: 'index',
                name: '首页',
                component: () => import('@/views/HomePage.vue')
            },
            {
                path: 'editor',
                name: '文档编辑器',
                component: () => import('@/views/EditorPage.vue')
            },
            {
                path: 'user',
                name: '个人主页',
                component: () => import('@/views/UserPage.vue')
            },
        ]
    }
];


const router = createRouter ({
    history: createWebHashHistory(),
        routes
})
export default router