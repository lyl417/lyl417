module.exports={
    //vue的配置
    devServer:{//开发服务器的代理
        port: 8010, // 端口
        proxy:{
            "/crm":{//当前路径以/api开头是，开发服务器需要代理到http://study.yuanjin.tech
                target:"http://127.0.0.1:8011",
            }
        }
    }
}