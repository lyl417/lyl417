import Axios from "axios";

import axios from 'axios'

//登录
export async function getChina1(){
    const {data:res} = await axios.get('/crm/china1/get-china1')
    console.log(res);
    return res;
}
