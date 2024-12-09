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
            {
                path: 'admin',
                name: '管理员',
                component: () => import('@/views/AdminPage.vue')
            },
            {
                path: 'login',
                name: '登录',
                component: () => import('@/views/Login.vue')
            },
            {
                path: 'message',
                name: '通知',
                component: () => import('@/views/Message.vue')
            },
            {
                path: 'groups',
                name: '兴趣组',
                component: () => import('@/views/GroupsPage.vue')
            },
            {
                path: 'agent',
                name: '智能写作',
                component: () => import('@/views/AgentPage.vue')
            },
            {
                path: 'card',
                name: '文章页面',
                component: () => import('@/views/ArticlePage.vue')
            },
        ]
    }
];


const router = createRouter ({
    history: createWebHashHistory(),
        routes
})
export default router