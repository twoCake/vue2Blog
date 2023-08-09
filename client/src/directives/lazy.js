// 图片懒加载的自定义指令

// 引入总线模块
import eventBus from "@/eventBus.js";
// 引入防抖模块
import {debounce} from "@/utils"
// 引入动图
import gif from "@/assets/cat.gif"

// 放入那些需要加载的图片
let imgs = [];
function setImage(imgObj){
    // 先暂时使用默认gif
    imgObj.dom.src = gif
    // 处理图片
    // 该图片是否在视口范围内
    const clientHeight = document.documentElement.clientHeight;
    const rect = imgObj.dom.getBoundingClientRect();
    // 规定最小高度为150
    const height = rect.height || 150;
    if (rect.top >= -height && rect.top <= clientHeight) {
        // 在视口范围内
        imgObj.dom.src = imgObj.src
        // 处理完之后，移除
        imgs = imgs.filter(i=>i!==imgObj)
    }
}
// 希望调用该函数，即可设置那些合适的图片，让它们显示
function setImages(){
    for (const img of imgs) {
        setImage(img);
    }
}
function handleScroll(){
    setImages();
}
eventBus.$on("mainScroll",debounce(handleScroll,20))
export default {
    inserted(el,bindings){
        const imgObj = {
            dom:el,
            src:bindings.value
        }
        imgs.push(imgObj);
        // 立即处理
        setImage(imgObj);
    },
    unbind(el){
        imgs = imgs.filter((img)=>img.dom!==el)
    }
}
