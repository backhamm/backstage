import DefaultLayout from '../common/layout/DefaultLayout'
import PageView from '../common/layout/PageView'

export const asyncRouterMap = [
    {
        path: '/',
        redirect: '/account',
        component: DefaultLayout,
        children: [
            {
                path: '/account',
                redirect: '/account/AccountControl',
                meta: { title: '账户中心', keepAlive: true, auth: ['user:manage', 'user:submanage']  },
                component: PageView,
                children: [
                    {
                        path: 'AccountControl',
                        name: 'AccountControl',
                        meta: { title: '用户管理', auth: ['user:manage'], keepAlive: true },
                        component: () => import('../views/account/AccountControl')
                    },
                    {
                        path: 'SubAccount',
                        name: 'SubAccount',
                        meta: { title: '子账号管理', auth: ['user:submanage'] },
                        component: () => import('../views/account/SubAccount')
                    }
                ]
            },
            {
                path: '/gameData',
                redirect: '/gameData/GameReport',
                meta: { title: '游戏数据', keepAlive: true, auth: ['report:liveall', 'user:gamelog'] },
                component: PageView,
                children: [
                    {
                        path: 'GameReport',
                        name: 'GameReport',
                        meta: { title: '游戏报表', keepAlive: true, auth: ['report:liveall'] },
                        component: () => import('../views/gameData/GameReport')
                    },
                    {
                        path: 'GameRecord',
                        name: 'GameRecord',
                        meta: { title: '真人游戏记录', auth: ['user:gamelog'] },
                        component: () => import('../views/gameData/GameRecord')
                    },
                    {
                        path: 'ChangePoints',
                        name: 'ChangePoints',
                        meta: { title: '上下分记录', auth: ['report:liveall'] },
                        component: () => import('../views/gameData/ChangePoints')
                    }
                ]
            },
            {
                path: '/online',
                redirect: '/online/OnlineUser',
                meta: { title: '在线会员', auth: ['default:online'] },
                component: PageView,
                children: [
                    {
                        path: 'OnlineUser',
                        name: 'OnlineUser',
                        meta: { title: '在线会员列表', auth: ['default:online'] },
                        component: () => import('../views/account/OnlineUser')
                    }
                ]
            },
            {
                path: '/operationLog',
                redirect: '/operationLog/OperationLog',
                meta: { title: '系统管理', auth: ['default:log'] },
                component: PageView,
                children: [
                    {
                        path: 'OperationLog',
                        name: 'OperationLog',
                        meta: { title: '操作日志', auth: ['default:log'] },
                        component: () => import('../views/operationLog/OperationLog')
                    }
                ]
            }
        ]
    }
];

let constantRouterMap = [
    {
        path: '/exception',
        redirect: '/exception/404',
        component: DefaultLayout,
        children: [
            {
                path: '404',
                name: '404',
                component: () => import('../views/exception/404')
            }
        ]
    },
    {
        path: '/405',
        name: '405',
        component: () => import('../views/exception/405')

    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/Login')
    },
    {
        path: '*', redirect: '/404'
    }
];

export const routes = [...constantRouterMap, ...asyncRouterMap];
// export const routes = constantRouterMap;
