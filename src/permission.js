import Router from './router';
import Store from './store';
import { isLogin } from './api/user'
import {getToken} from './util/auth'
Router.beforeEach(async (to, from , next) => {
    const token = getToken();
    
    if(to.path == '/login'){
        next();
    }else{
        const {data:{code}} = await isLogin();
        if(code !== 200 || !token){
            alert("请先登录");
            next({ path: '/login'});
        }
        next();
    }
    
  })