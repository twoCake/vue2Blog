import Vuex from "vuex";
import Vue from "vue";
import setting from "./setting";
import aboutMe from "./aboutMe"
import project from "./project"

// 应用Vuex插件
Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        setting,
        aboutMe,
        project
    },
    strict:false,
})

export default store