import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './home'
import Category from './category'
import Cart from './cart'
import Detail from './detail'
import Profile from './profile'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    Home,
    Category,
    Cart,
    Detail,
    Profile,
    {
        name: 'Goodlist',
        path: '/goodlist/:miniWallkey',
        component: () => import('@/views/goodlist/GoodList')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
