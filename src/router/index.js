import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'


Vue.use(VueRouter)

const routes = [{
        // 重定向
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: '/welcome',
        // 子路由
        children: [{
                path: '/welcome',
                name: 'welcome',
                component: Welcome
            },
            {
                path: '/users',
                name: 'users',
                component: Users
            }
        ]
    }
]
const router = new VueRouter({
    routes
})


// 拦截路由导航
router.beforeEach((to, from, next) => {
    //    to 将要访问的路径
    //    from 代表从哪个路径跳转而来
    //    next 是一个函数 标识放行
    //      next() 放行  next('/login')

    if (to.path === '/login') {
        next()
    } else {
        // 获取token
        const tokenStr = window.sessionStorage.getItem('token')

        if (!tokenStr) {
            next('/login')
        } else {
            next()
        }

    }

})




export default router