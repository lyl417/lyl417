import {getMenus} from '../services/menus'
export default {
    namespaced:true,
    state:{
        menus:[],
    },
    mutations:{
        setMenus(state,payLoad){
            state.menus = payLoad;
        },
    },
    actions:{
        async getMenus(context){
            var result = await getMenus();
            if (result.code !== 0) return this.$message.error(result.msg)
            context.commit('setMenus',result.data);
        }
    }
}