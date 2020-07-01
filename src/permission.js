import Vue from 'vue'
import router from './router'
import store from './store'
import {userInfo} from "./http/api/user";
import {notification} from "./utils/notification";
import {asyncRouterMap} from "./router/routes";

const whiteList = ['login', '405']; // no redirect whitelist

function hasPermission (userAuth, route) {
    if (route.meta && route.meta.auth) {
        let flag = false;
        for (let i = 0, len = userAuth.length; i < len; i++) {
            flag = route.meta.auth.includes(userAuth[i]);
            if (flag) {
                return true
            }
        }
        return false
    }
    return true
}

function filterRoutes(routerMap, userAuth) {
    return routerMap.filter(item => {
        if (hasPermission(userAuth, item)) {
            if (item.children && item.children.length) {
                item.children = filterRoutes(item.children, userAuth)
            }
            return true
        }
        return false
    })
}

router.beforeEach((to, from, next) => {
    const token = Vue.ls.get('TOKEN');
    if (token) {
        if (!store.state.userData.userId) {
            userInfo().then(res => {
                if (res.status === 10000) {
                    store.dispatch('setState', ['userData', res.data]);
                    if (res.data.permission.length) {
                        const addRouters = filterRoutes(asyncRouterMap, res.data.permission);
                        store.dispatch('setState', ['addRouters', addRouters[0].children]);
                        if (addRouters.length && addRouters[0].children.length && from.path.indexOf('/login') > -1) {
                            const path = addRouters[0].children[0].path + '/' + addRouters[0].children[0].children[0].path;
                            next({path, replace: true})
                        } else {
                            next({ ...to, replace: true })
                        }
                        // router.addRoutes(addRouters);
                    } else {
                        next({path: '/exception/404'})
                    }
                } else {
                    notification({
                        title: res.message
                    });
                    Vue.ls.remove('TOKEN');
                    next({path: '/login'})
                }
            }).catch(() => {
                notification({
                    title: '请求用户信息失败！'
                });
                Vue.ls.remove('TOKEN');
                next({path: '/login'})
            });
        } else {
            next()
        }
    } else {
        if (whiteList.includes(to.name)) {
            next()
        } else {
            next({path: '/login'})
        }
    }
});
