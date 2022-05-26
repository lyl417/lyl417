import vuex from 'vuex';
import Vue from 'vue';
import loginuser from './loginuser';
import menus from './menus'

Vue.use(vuex);

var store = new vuex.Store({
    modules:{
        loginuser,
        menus,
    }
});
export default store;