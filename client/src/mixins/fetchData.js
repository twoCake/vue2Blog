// 公共远程获取数据的代码
export default function (defaultDataValue = null) { 
    return {
        data() {
            return {
                isLoading: true,
                allItems: defaultDataValue
            }
        },
        async created() {
            // 获取远程数据
            this.allItems = await this.fetchData();
            // 隐藏 加载中 图标
            this.isLoading = false;
        },
    }
}