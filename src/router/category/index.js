export default {
    path: '/category',
    name: 'Category',
    redirect: '/category/3627',
    component: () => import('@/views/category/Category'),
    children: [
        {
            path: ':maitKey',
            component: () => import('@/views/category/SubCategory')
        }
    ]
}
