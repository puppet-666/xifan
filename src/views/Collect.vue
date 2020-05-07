<template>
    <div  class="container">
        <div style="height:10px"></div>
        <van-row @click="info(item.menu_id)" style="margin-left:15px;margin-bottom:10px" v-for="(item,index) of resData" :key="index">
            <van-col >
                <van-image width="60" height="60" radius="10" :src="item.menu_url"/>
            </van-col>
            <van-col span="19">
                <van-panel :title=item.menu_foodname :desc=item.c_date style="font-size:20px;font-weight:550;font-family:Microsoft JhengHei"></van-panel>
            </van-col>
        </van-row>
    </div>
</template>

<script>
import Vue from 'vue';
import store from 'store'
import { Row, Col,Image,Panel,Lazyload, Toast   } from 'vant';

Vue.use(Row)
.use(Col)
.use(Image)
.use(Panel)
.use(Lazyload);
export default {
    name:"Collect",
    data () {
        return {
            phone:"",
            resData:[]
        }
    },
    methods:{
        info(menuid){
            this.$router.push({
                name: 'food',
                params: {
                    id: menuid
                }
            })
        },
        // 获取收藏
        async getCollect(phone) {
            try {
                // 尝试登录
                let res = await this.$api.collect.getCollect(phone);
                if(res.status==1){
                    Toast.fail(res.msg);
                }
                else{
                    this.resData = res
                }
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        }
    },
    mounted:function () {
        let user=store.get('user');
        this.phone=user.phone; 
        this.getCollect(this.phone);
    }
}
</script>

<style lang="scss" scoped>
@import  '@/scss/index.scss';
</style>