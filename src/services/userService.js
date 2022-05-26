import Axios from "axios";

import axios from 'axios'

import {CLIENT_ID,CLIENT_SECRET} from '../services/config'

//登录
export async function login(loginInfo){

    var resp = await axios({
        method:'post',
        url:"/crm/oauth/token",
        headers:{
            authorization: '',
        },
        params: {
            ...loginInfo,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type:'password'
        }
    });
    return resp;
}
//查询用户信息
export async function getUser(){
    var token = localStorage.getItem("token");
    if(!token){
        return null;
    }
    var resp = await axios.get("/crm/gscy1/get-userinfo",{
    })
    return resp.data;
}
//注销
export function loginOut(){
    window.sessionStorage.removeItem("access_token");
    window.sessionStorage.removeItem("refresh_token");
}