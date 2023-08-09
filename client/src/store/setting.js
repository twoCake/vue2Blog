import {getSetting} from "@/api/setting.js"

export default {
    // 开启命名空间
    namespaced:true,
    state:{
        loading:true,
        data:null,
        // stateUrl:"http://127.0.0.1:7001"
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
        async fetchSetting(ctx){
            ctx.commit("setLoading",true);
            const resp = await getSetting();
            ctx.commit("setData",resp);
            ctx.commit("setLoading",false);
            // 设置网站的图标
            if(resp.favicon){
                // resp.favicon = 'http://127.0.0.1:7001' + resp.favicon
                let link = document.querySelector("link[ref='shortcut icon']");
                if(link){
                    return 
                }else{
                    link = document.createElement("link")
                    link.rel="shortcut icon"
                    link.type="images/x-icon"
                    link.href=resp.favicon;
                    document.querySelector("head").appendChild(link);
                }

            }
        }
    }
}