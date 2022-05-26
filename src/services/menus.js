import Axios from "axios";

import axios from 'axios'

//登录
export async function getMenus(){
    const { data: res } = await axios.get('/crm/gncd1/get-gncd1')
      return res;
}
