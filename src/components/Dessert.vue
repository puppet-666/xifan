<template>
    <div style="margin-top:20px">
       <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-row style="margin-bottom:10px" v-for="(item,index) of list" :key="index">
            <van-col span="24">
                <div style="text-align:center;position:relative">
                    <van-image width="300" height="300" :src=item.menu_url radius="10" @click="info(item.menu_id)"/>
                    <span style="position:absolute;z-index:2;margin-left:-280px;margin-top:25px;font-size:30px;font-family:Microsoft JhengHei;font-weight:550;color:white">{{item.menu_foodname}}</span>
                   
                </div>
            </van-col>
        </van-row>
        </van-list>
        <div style="height:60px"></div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Image,Row, Col,Icon,List } from 'vant';

Vue.use(Image)
.use(Row)
.use(Col)
.use(Icon)
.use(List);
export default {
    name:"Dessert",
    data(){
        return{
            tag:"dimsum",
            resData:[],
            list:[],
            length:0,
            loading: false,
            finished: false
        }
    },
    methods:{
        // 获取分类信息
        async getClass(tag) {
            try {
                // 尝试登录
                let res = await this.$api.search.getClass(tag);
                this.resData = res;
                for (let i = 0; i < 5; i++) {
                    this.list.push(this.resData[this.length]);
                    this.length++;
                }
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        },
        onLoad() {
        // 异步更新数据
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                this.list.push(this.resData[this.length]);
                this.length++;
            }
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (this.list.length >= 40) {
                this.finished = true;
            }
        }, 1000);
        },        
        info(menuid){
            this.$router.push({
                name: 'food',
                params: {
                    id: menuid
                }
            })
        }
    },
    created:function () {
        this.getClass(this.tag);
    }
}
</script>

<style lang="sass" scoped>

</style>