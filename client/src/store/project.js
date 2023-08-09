import {getProjects} from "@/api/project.js"

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
        async fetchProject(ctx){
            if(ctx.state.data.length){
                return 
            }else{
                ctx.commit("setLoading",true);
                const resp = await getProjects();
                ctx.commit("setData",resp);
                ctx.commit("setLoading",false);
            }
        }
    }
}