<template>
  <div style="margin-top:5px">
    <span style="font-size:22px;font-family:Microsoft JhengHei;font-weight:550">更多美味</span>
    <div style="margin-top:20px">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-row style="margin-bottom:10px" v-for="(item,index) of list" :key="index">
            <van-col span="24">
                <div style="text-align:center;position:relative">
                    <van-image width="300" height="300" :src="item.menu_url" radius="10" @click="info(item.menu_id)"/>
                    <span style="position:absolute;z-index:2;margin-left:-280px;margin-top:25px;font-size:30px;font-family:Microsoft JhengHei;font-weight:550;color:white">{{item.menu_foodname}}</span>
                    
                </div>
            </van-col>
        </van-row>
        </van-list>
    </div>
    <div style="height:60px"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { List, Cell,Image,Row, Col,Icon,  } from "vant";

Vue.use(List)
.use(Cell)
.use(Image)
.use(Row)
.use(Col)
.use(Icon);
export default {
  name: "MoreFood",
  data() {
    return {
      list: [],
      loading: true,
      finished: false,
      length:0,
      resData:[]
    };
  },
  methods: {
    // 获取更多
    async getMore() {
      try {
        // 获取更多菜谱
        let res = await this.$api.search.getMore();
        this.resData = res;
        for (let i = 0; i < 5; i++) {
          this.list.push(this.resData[this.length]);
          this.length++;
        }
        this.loading = false
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
        if (this.list.length >= 290) {
          this.finished = true;
        }
      }, 1000);
    },
    info(menuid) {
      this.$router.push({
        name: "food",
        params: {
          id: menuid
        }
      });
    }
  },
  created:function(){
    this.getMore();
  }
};
</script>

<style lang="scss" scoped>
</style>