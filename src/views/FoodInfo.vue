<template>
    <div class="container">
        <van-nav-bar @click-left="$router.back(-1);" @click-right="collect" title="菜谱信息" class="title">
            <van-icon class-prefix="my-icon" name="zuojiantou" slot="left"/>
            <van-icon size="20px" :name=name slot="right" color="#000000"/>
        </van-nav-bar>
        <van-image
        :src=resData.url
        />
        <div class="food-container">
        <span class="food-info-font">{{this.resData.foodname}}</span>
        <div class="note-container" >
            <div><van-icon style="font-weight:900" size="20px" class-prefix="my-icon" name="shijian" /><span class="food-deatil-font"> {{this.desc[0]}}</span></div>
            <div style="margin-top:10px"><van-icon style="font-weight:900;" size="20px" class-prefix="my-icon" name="shoutao" /><span class="food-deatil-font"> {{this.desc[1]}}</span></div>
        </div>
        <div class="ingredients-container">
            <span class="food-info-font">用料</span>
            <van-cell-group :border="false">
                <van-cell :title=item value="60g" :border="false" style="border-bottom:3px dotted grey" v-for="(item,index) of food.slice(0, this.food.length-1)" :key="index" class="food-deatil-font"/>
            </van-cell-group>
            <div class="food-info-font" style="margin-top:20px">步骤</div>
            <van-steps direction="vertical" :active="this.step.length-1" active-color="black"  inactive-icon class="line circle">
            <van-step v-for="(item,index) of step.slice(0,this.step.length-1)" :key="index" class="food-deatil-font">
                <h3>步骤{{index+1}}</h3>
                <p>{{item}}</p>
            </van-step>
            </van-steps>
        </div>
        </div>
    </div>
</template>

<script>
import store from 'store';
import Vue from 'vue';
import dayjs from 'dayjs';
import { 
    NavBar,
    Icon,
    Cell, 
    CellGroup, 
    Toast,
    Step, 
    Steps,
    Image
} from 'vant';

Vue.use(NavBar)
.use(Icon)
.use(Cell)
.use(CellGroup)
.use(Step)
.use(Steps)
.use(Image);
export default {
    name:"FoodInfo",
    data () {
        return {
            name:"like-o",
            resData:[],
            desc:[],
            food:[],
            step:[],
            weight:[],
        }
    },
    methods : {
        collect (){
            let phone = store.get("user").phone;
            this.name = this.name == "like-o" ? "like" : "like-o"
            if(this.name == "like-o"){
                this.delCollect(phone,this.resData.foodname);
                // Toast.fail("已取消收藏")
            }else{
                //let date = new Date().toLocaleDateString().replace(/\//g, '-');
                let date = dayjs().format('YYYY-MM-DD');
                this.addCollect(phone,this.resData.foodname,date);
                // Toast.success("成功收藏")
            }
        },
        // 获取菜铺信息
        async searchOne(id) {
            try {
                // 尝试登录
                let res = await this.$api.search.searchOne(id);
                this.resData = res[0];
                this.food = this.resData.food;
                this.desc = this.resData.desc;
                this.step = this.resData.step;
                this.weight = this.resData.weight;
                let phone = store.get("user").phone;
                this.isCollect(phone,this.resData.foodname);
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        },
        // 判断是否收藏
        async isCollect(phone,foodname) {
            try {
                // 尝试登录
                let res = await this.$api.collect.isCollect(phone,foodname);
                if(res.status==0){
                    this.name="like";
                }
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        },
        // 取消收藏
        async delCollect(phone,foodname) {
            try {
                // 尝试登录
                let res = await this.$api.collect.delCollect(phone,foodname);
                if(res.status==0){
                    Toast.success("已取消收藏");
                }
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        },
        // 添加收藏
        async addCollect(phone,foodname,date) {
            try {
                // 尝试登录
                let res = await this.$api.collect.addCollect(phone,foodname,date);
                if(res.status==0){
                    Toast.success("已成功收藏");
                }
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        }
    },
    mounted(){
        this.searchOne(this.$route.params.id);
        document.documentElement.scrollTop=0;
    }
}
</script>

<style lang="scss" scoped>
.container{
    background: white;
}
.food-container{
    margin: auto 25px;
}
.note-container{
    margin-top: 10px;
    height: 65px;
    border-bottom:0.5px solid grey
}
.title /deep/ .van-nav-bar__title{
    font-weight: 600;
    font-family:Microsoft JhengHei
}
.food-deatil-font{
    font-weight: 600;
    font-family:Microsoft JhengHei
}
.food-info-font{
    font-size: 25px;
    font-weight: 600;
    font-family:Microsoft JhengHei
}
.ingredients-container{
    margin-top: 10px;

}
.line /deep/ .van-step__line{
    background-color:black;
}
.circle /deep/ .van-step__circle{
    background-color:black;
}
</style>