<template>
    <div class="about-container">
       <template  v-if="loading">
        <Loading/>
       </template>
       <template v-else>
        {{ data.url }}
       </template>
    </div>
</template>

<script>
import Loading from "@/components/Loading.vue"
import { mapState } from 'vuex';
    export default {
        components:{
            Loading
        },
        computed:{
            ...mapState("aboutMe",["data","loading"])
        },
        mounted() {
            this.$store.dispatch("aboutMe/fetchAboutMe")
        },
    }
</script>

<style lang="less" scoped>

</style>