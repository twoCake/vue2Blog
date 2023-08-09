import {getAboutMe} from "@/api/about.js"

export default {
    // 开启命名空间
    namespaced:true,
    state:{
        loading:true,
        data:""
    },
    mutations:{
        setLoading(state,payload){
            state.loading = payload;
        },
        setData(state,payload){
            state.data = payload
        }
    },
    actions:{
        async fetchAboutMe(ctx){
            if(ctx.state.data){
                return 
            }else{
                ctx.commit("setLoading",true);
                const resp = await getAboutMe();
                ctx.commit("setData",resp);
                ctx.commit("setLoading",false);
            }
        }
    }
}