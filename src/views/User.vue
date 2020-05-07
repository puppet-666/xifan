<template>
    <div class="container">
        <transition enter-active-class="animated fadeIn">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"/>
            </keep-alive>
        </transition>
        <transition enter-active-class="animated fadeIn">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
        <van-tabbar route active-color="#141414">
            <van-tabbar-item to="/user/index">
                <van-icon slot="icon" class-prefix="my-icon" name="solid-home" size='25'/>
                <span class="font">首页</span>
            </van-tabbar-item>
            <van-tabbar-item to="/user/collect">
                <van-icon slot="icon" class-prefix="my-icon" name="shoucang" size='25'/>
                <span class="font">收藏</span>
            </van-tabbar-item>
            <van-tabbar-item to="/user/note">
                <van-icon slot="icon" class-prefix="my-icon" name="bijiben-copy" size='25'/>
                <span class="font">笔记</span>
            </van-tabbar-item>
            <van-tabbar-item to="/user/info">
                <van-icon slot="icon" class-prefix="my-icon" name="touxiang" size='25'/>
                <span class="font">个人中心</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import Vue from 'vue';
import { 
    Tabbar, 
    TabbarItem ,
    Icon
} from 'vant';

Vue.use(Tabbar)
.use(TabbarItem)
.use(Icon);

export default {
    name:"User",
    data () {
        return{
           
        }
    },
}
</script>

<style lang="scss" scoped>
@import  '@/scss/index.scss';
.font{
    font-family:"Microsoft JhengHei";
    font-weight: 550;
}
</style>