export default {
    name: 'Detail',
    path: '/detail',
    redirect: '/home',
    component: () => import('@/views/detail/Detail'),
    children: [
        {
            path: '/detail/:iid',
            component: () => import('@/views/detail/Detail')
        }
    ]
}
