import {login,loginOut,getUser} from '../services/userService'
export default {
    namespaced:true,
    state:{
        data:null,
        username:'',
    },
    mutations:{
        setData(state,payLoad){
            state.data = payLoad;
        },
        setUsername(state,payLoad){
            state.username = payLoad;
        }
    },
    actions:{
        async login(context,payLoad){
            var resp = await login(payLoad);
            console.log(resp);
            var result = false;
            if(resp.status === 200){
                result = true;
                context.commit("setData",resp.data);
            }
            return result;
        },
        async getUser(context){
            var resp = await getUser();
            if(resp && resp.code === 0){
                context.commit("setData",resp.data);
                context.commit("setUsername",resp.data.gscy1Name);
            }
        },
        async loginOut(context){
            var resp = await loginOut();
            context.commit("setData",null);
        },
        setUsername({commit},data){
            commit('setUsername',data);
        }
    }
}