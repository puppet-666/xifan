<template>
    <div style="margin-top:5px">
        <span style="font-size:22px;font-family:Microsoft JhengHei;font-weight:550">本周人气榜单</span>
        <van-grid  :column-num="3">
            <van-grid-item @click="info(item.menu_id)" v-for="(item,index) of resData" :key="index" >
                <van-image :src="item.menu_url"  height="90" width="90" radius="8"/>
                <div style="font-size:15px;margin-top:10px;width:100px;" class="font">{{index+1}}{{"."+item.menu_foodname}}</div>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
import Vue from 'vue';
import { Grid, GridItem, Image } from 'vant';

Vue.use(Grid)
.use(GridItem)
.use(Image);
export default {
    name:"WeekTop",
    data () {
        return {
                id:0,
                resData:[],
                tag:"recommend"
        }
    },
    methods:{
        info(menu_id){
            this.$router.push({
                name: 'food',
                params: {
                    id: menu_id
                }
            })
        },
        // 获取分类信息
        async getClass(tag) {
            try {
                // 尝试登录
                let res = await this.$api.search.getClass(tag);
                this.resData = res;
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        },
    },
    mounted:function () {
        this.getClass(this.tag)
    }
}
</script>

<style lang="scss" scoped>
.font{
    text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
font-family:"Microsoft JhengHei";
font-weight: 550;
}
</style>