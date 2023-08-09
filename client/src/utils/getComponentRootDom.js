import Vue from 'vue'
// 此文件专门用于获取某个组件渲染的DOM根元素

export default function (comp, props) { 
    const vm = new Vue({
        render: h => h(comp, {props})
    })
    vm.$mount();
    return vm.$el;
}