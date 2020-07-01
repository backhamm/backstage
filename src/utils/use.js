import Vue from 'vue'
import VueStorage from 'vue-ls'
import components from '../common/globalComponents'
import './filter'
import '../style.less'
import '../permission'
import './directive'
import {notification} from './notification'
import {Loading, MessageBox} from "element-ui";

Vue.use(VueStorage, {
    namespace: 'txh__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
});

Vue.prototype.$notification = notification;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$bus = new Vue();
Vue.use(Loading.directive);
Vue.use(components);
