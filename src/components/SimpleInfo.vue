<template>
  <van-row type="flex" justify="space-around">
    <van-col
      span="6"
      v-for="(item,index) of showMap"
      :key="index"
    >
      <div class="card-cell">
        <div class="card-cell__num">{{item.num}}</div>
        <div class="card-cell__name">{{item.content}}</div>
      </div>
    </van-col>
  </van-row>
</template>

<script>
import { Row, Col } from "vant";
import Vue from "vue";
Vue.use(Row).use(Col);
export default {
    name:"SimpleInfo",
    data () {
        return {
            showMap: [
                {num:0,content: "关注"},
                {num:0,content: "粉丝"},
                {num:0,content: "获赞"},
            ],
        }
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
.card-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__name {
    font-size: 13px;
    font-family:"Microsoft JhengHei";
    font-weight: 550;
    color: black;
  }
  &__num {
    font-size: 16px;
    font-weight: bold;
    color: black;
  }
}
.van-col {
  margin-bottom: 5px;
  &:not(:last-child) {
    border-right: 0.5px solid black;
  }
}
</style>