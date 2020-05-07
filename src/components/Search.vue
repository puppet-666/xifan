<template>
  <div>
    <form action="/">
      <van-search
        v-model="keyword"
        placeholder="搜索食材、菜谱"
        clearable
        shape="round"
        @search="onSearch(keyword)"
        class="font"
      />
    </form>
    <transition-group
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <div v-for="(value) in fSearch" :key="value" class="cell" @click="onSearch(value)">
        <span class="font" style="margin-left:30px">{{value}}</span>
      </div>
    </transition-group>
    <!-- <van-cell-group>
      <van-cell
        :value="value"
        v-for="(value) in fSearch"
        :key="value"
        clickable
        class="font"
        @click="onSearch(value)"
      />
    </van-cell-group>-->
  </div>
</template>

<script>
import store from "store";
import Vue from "vue";
import { Search, Cell, CellGroup } from "vant";

Vue.use(Search)
  .use(Cell)
  .use(CellGroup);
export default {
  name: "Search",
  data() {
    return {
      keyword: "",
      list: []
    };
  },
  methods: {
    onSearch(keyword) {
      store.set("search", keyword);
      this.$router.push({ name: "search" });
    },
    //智能联想数组
    async searchArray() {
      try {
        let res = await this.$api.search.searchArray();
        this.list = res;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    beforeEnter: function(el) {
      // let { x = 30, y = 0, s = 1, opacity = 0 } = el.dataset;
      el.style.cssText = `opacity: 1;transform: translateX(30px)`;
    },
    enter: function(el, done) {
      let delay = el.dataset.delay;
      setTimeout(function() {
        el.style.cssText = `transition: all 1s;opacity: 1;`;
        //监听 transitionend 事件
        var transitionend = window.ontransitionend
          ? "transitionend"
          : "webkitTransitionEnd";
        el.addEventListener(transitionend, function onEnd() {
          el.removeEventListener(transitionend, onEnd);
          done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
        });
      }, delay);
    },
    leave: function(el, done) {
      el.style.cssText = `transform: translateX(-30px);`;
      done();
    }
  },
  computed: {
    fSearch() {
      let len = 0;
      if (this.keyword) {
        return this.list.filter(value => {
          //过滤数组元素
          return value.includes(this.keyword) && len++ < 5; //如果包含字符返回true
        });
      } else {
        return "";
      }
    }
  },
  mounted: function() {
    this.searchArray();
  },
  deactivated: function() {
    this.keyword = "";
  }
};
</script>

<style lang="scss" scoped>
.font {
  font-family: "Microsoft JhengHei";
  font-weight: 550;
}
.cell {
  height: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
  border-bottom: 0.5px solid #eeeeee;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>