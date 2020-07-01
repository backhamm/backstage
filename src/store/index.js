import Vue from 'vue'
import Vuex from 'vuex'
import {logout} from "../http/api/user";
import {isPC} from "../utils/isPc";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userData: {},
        tableSelect: [],
        currentUserInfo: {},
        disabledList: [],
        addRouters: [],
        addSubChipsId: '',
        isRequest: false,
        isMB: !isPC()
    },

    mutations: {
        SET_STATE(state, [key, val]) {
            state[key] = val
        }
    },

    actions: {
        setState({commit}, [key, val]) {
            commit('SET_STATE', [key, val])
        },
        Logout() {
            logout().then(() => {
                Vue.ls.remove('TOKEN');
                window.location.reload()
            }).catch(() => {
                Vue.ls.remove('TOKEN');
                window.location.reload()
            })
        },
        setTableSelect({commit}, [key, val]) {
            if (val.length) {
                const keyArr = Object.keys(val[0]);
                const idKey = keyArr[keyArr.findIndex(item => item.toUpperCase().indexOf('ID') > -1)];
                const value = val.map(item => item[idKey]);
                commit('SET_STATE', [key, value])
            } else {
                commit('SET_STATE', [key, val])
            }
        },
        setAddRouters({commit}, data) {
            return new Promise(resolve => {
                commit('SET_STATE', data);
                resolve()
            })
        }
    }
})
