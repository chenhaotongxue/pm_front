import Vue from "vue";
import Vuex from "vuex";
import {getToken,getUsername,setToken,setUsername} from '../util/auth'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username:getUsername(),
    token: getToken(),
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token;
      setToken(token);
    },
    SET_NAME(state,name){
      state.username = name;
      setUsername(name);
    },
  },
  actions: {
    setToken({commit},token){
      commit('SET_TOKEN',token);
    },
    setUsername({commit},name){
      commit('SET_NAME',name);
    },
  },
  modules: {}
});
