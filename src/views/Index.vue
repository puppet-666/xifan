<template>
  <div class="index-container">
    <van-sticky>
      <search></search>
    </van-sticky>
    <van-tabs v-model="active" color="#000000" swipeable animated @change="change()">
      <van-tab>
        <div slot="title" class="font">今日推荐</div>
        <swipper></swipper>
        <week-top></week-top>
        <more-food></more-food>
      </van-tab>
      <van-tab>
        <div slot="title" class="font">早餐达人</div>
        <breakfast></breakfast>
      </van-tab>
      <van-tab>
        <div slot="title" class="font">家常菜能手</div>
        <home-cooking></home-cooking>
      </van-tab>
      <van-tab>
        <div slot="title" class="font">甜食至上</div>
        <dessert></dessert>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Swipper from "@/components/Swipper.vue";
import WeekTop from "@/components/WeekTop.vue";
import MoreFood from "@/components/MoreFood.vue";
import Breakfast from "@/components/Breakfast.vue";
import HomeCooking from "@/components/HomeCooking.vue";
import Dessert from "@/components/Dessert.vue";
import Vue from "vue";
import { Tab, Tabs, Toast,Sticky  } from "vant";
import store from "store";

Vue.use(Tab)
  .use(Tabs)
  .use(Toast)
  .use(Sticky);
export default {
  name: "Index",
  components: {
    search: Search,
    swipper: Swipper,
    "week-top": WeekTop,
    "more-food": MoreFood,
    breakfast: Breakfast,
    dessert: Dessert,
    "home-cooking": HomeCooking
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    change() {
      store.set("active", this.active);
    },
    async searchName(phone) {
      try {
        let res = await this.$api.users.searchName(phone);
        store.set("username", res[0].user_name);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        store.set("username", "测试用户");
      }
    },
  },
  mounted() {
    this.active = store.get("active");
    this.searchName(store.get("user").phone);
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/index.scss";
.font {
  font-family: "Microsoft JhengHei";
  font-weight: 550;
}
.index-container {
  background: white;
}
</style>