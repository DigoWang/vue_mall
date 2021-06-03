const routes = [
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/Login')
    },
    {
        // name: 'home',
        path: '/home',
        component: () => import('@/pages/Home'),
        children: [
            {
                path: 'homepage',
                component: () => import('@/pages/Home/HomePage'),
                meta: {
                    active: 0
                }
            },
            {
                path: 'message',
                component: () => import('@/pages/Home/Message'),
                meta: {
                    active: 1
                }
            },
            {
                path: 'cart',
                component: () => import('@/pages/Home/Cart'),
                meta: {
                    active: 2
                }
            },
            {
                path: 'mine',
                component: () => import('@/pages/Home/Mine'),
                meta: {
                    active: 3
                },
            },
            {
                path: '',
                redirect: '/home/homepage'
            }
        ]
    },
    {
        name: 'accountSetting',
        path:'/accountsetting',
        component:() => import('@/pages/AccountSetting'),
        meta: {
            isShow: true
        }
    },
    {
        name: 'search',
        path: '/search',
        component: () => import('@/pages/Search')
    },
    {
        name: 'searchGoods',
        path: '/searchgoods/:keyword',
        component: () => import('@/pages/SearchGoods')
    },
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: () => import('@/pages/Detail')
    },
    {
        path: '/*',
        redirect: '/home/homepage'
    }
]

export default routes