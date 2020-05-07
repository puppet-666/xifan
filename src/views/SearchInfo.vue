<template>
  <div class="container">
    <van-nav-bar @click-left="$router.back(-1);" title="搜素详情" class="title">
      <van-icon class-prefix="my-icon" name="zuojiantou" slot="left" />
    </van-nav-bar>
    <van-row>
      <van-col
        span="12"
        style="text-align:center;margin-top:10px"
        v-for="(item,index) of resData"
        :key="index"
        @click="info(item.id)"
      >
        <van-image width="170" height="220" :src="item.url" radius="15" />
        <div>
          <span
            style="font-size:20px;font-weight: 600;font-family:Microsoft JhengHei"
          >{{item.foodname}}</span>
          <br />
          <span
            style="font-size:12px;font-weight: 600;font-family:Microsoft JhengHei;color:#888888"
          >{{item.desc[0] +' '+ item.desc[1]}}</span>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import store from "store";
import Vue from "vue";
import { NavBar, Icon, Image, Row, Col, Toast } from "vant";

Vue.use(NavBar)
  .use(Icon)
  .use(Image)
  .use(Row)
  .use(Col);
export default {
  name: "SearchInfo",
  data() {
    return {
      resData: []
    };
  },
  methods: {
    // 获取搜索列表信息
    async search(content) {
      try {
        // 尝试登录
        let res = await this.$api.search.search(content);
        if (res.status == 1) {
          Toast.fail("查询不到相关信息噢");
        } else {
          this.resData = res;
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
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
  mounted() {
    let content = store.get("search");
    this.search(content);
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/index.scss";

.font {
  font-weight: 600;
  font-family: Microsoft JhengHei;
}
.title /deep/ .van-nav-bar__title {
  font-weight: 600;
  font-family: Microsoft JhengHei;
}
</style>