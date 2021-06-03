<template>
  <div class="search_bar">
    <!-- 搜索框 -->
    <div class="search_container">
      <van-icon @click="goBack" name="arrow-left" color="#656771" />
      <van-search
        autofocus
        v-model="keyword"
        shape="round"
        background="transparent"
        :placeholder="recentSearch[0] || 'iPhone'"
        @search="onSearch"
      />
      <van-button @click="onSearch" round type="info">搜索</van-button>
    </div>
    <div class="_block"></div>
    <!-- 最近搜索 -->
    <div v-show="recentSearch.length" class="recent_search">
      <div class="search_bread_top">
        <span class="recent_search_title">最近搜索</span>
        <van-icon
          @click="clearRecentSearch"
          class="delete_bread"
          name="delete-o"
        />
      </div>
      <div @click="reSearch" class="search_bread clearfix">
        <span
          :data-keyword="item"
          :key="index"
          v-for="(item, index) in recentSearch"
          class="bread_content"
          >{{ item }}</span
        >
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="hot_search recent_search">
      <div class="search_bread_top">
        <span class="recent_search_title">热门搜索</span>
        <van-icon
          @click="toggleShow"
          v-show="isShow"
          class="delete_bread"
          name="eye"
        />
        <van-icon
          @click="toggleShow"
          v-show="!isShow"
          class="delete_bread"
          name="closed-eye"
        />
      </div>
      <div v-show="isShow" class="search_bread clearfix">
        <span class="bread_content">苹果</span>
        <span class="bread_content">华为</span>
        <span class="bread_content">联想笔记本</span>
        <span class="bread_content">联想小新Pro14</span>
        <span class="bread_content">switch</span>
        <span class="bread_content">PS5</span>
        <span class="bread_content">XBOX series</span>
      </div>
      <div v-show="!isShow" class="search_bread clearfix">
        <p class="hide_word">已隐藏搜索发现</p>
      </div>
    </div>
  </div>
</template>

<script>
import reg from "@/utils/reg";
export default {
  name: "Search",
  data() {
    return {
      keyword: "",
      isShow: true,
      recentSearch: [],
    };
  },
  methods: {
    goBack() {
      this.$router.replace({ path: "/home" });
    },
    // 处理最近搜索面包屑
    handlerBread() {
      const index = this.recentSearch.indexOf(this.keyword);
      if (index !== -1) {
        this.recentSearch.splice(index, 1);
      }
      if (index === 0) return;
      this.recentSearch.unshift(this.keyword);
      localStorage.setItem("recentSearch", JSON.stringify(this.recentSearch));
      // this.keyword = "";
    },
    onSearch() {
      if (!reg.reg_s(this.keyword)) return;
      // 判断如果最近搜索里已经有了现在搜索的内容, 则返回, 如果没有, 则添加到数组中, 再更新本地存储
      this.$router.push({
        name: "searchGoods",
        params: { keyword: this.keyword },
      });
      this.handlerBread()
    },
    // 通过事件委托， 给每一个最近搜索面包屑添加点击事件
    reSearch(event) {
      let { keyword } = event.target.dataset;
      this.keyword = keyword
      if (keyword) {
        this.$router.push({ name: "searchGoods", params: { keyword } });
      }
      this.handlerBread()
    },
    // 切换热门搜索的显示与隐藏
    toggleShow() {
      this.isShow = !this.isShow;
    },
    clearRecentSearch() {
      this.recentSearch = [];
      localStorage.removeItem("recentSearch");
    },
  },
  mounted() {
    // 从本地存储中取出最近搜索的数据, 若有则赋值给 recentSearch, 若没有则给 recentSearch 一个初始值
    this.recentSearch = JSON.parse(localStorage.getItem("recentSearch")) || [];
  },
};
</script>

<style lang="less" scoped>
.search_bar {
  width: 375px;
  height: 44px;
  box-shadow: 0 1px 3px #e5e5e5;
  .search_container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 375px;
    height: 44px;
    position: fixed;
    z-index: 9999;
    background: #fff;
    .van-icon {
      font-size: 22px;
      margin-left: 5px;
    }
    .van-search {
      width: 300px;
      .van-search__content {
        display: flex;
        align-items: center;
        height: 30px;
      }
    }
    .van-button {
      width: 40px;
      padding: 3px;
      height: 24px;
      margin-right: 10px;
    }
  }
  ._block {
    height: 44px;
  }
  .recent_search {
    .search_bread_top {
      font-size: 15px;
      height: 46px;
      line-height: 46px;
      .recent_search_title {
        float: left;
        padding-left: 14px;
      }
      .delete_bread {
        float: right;
        font-size: 20px;
        color: #828282;
        line-height: 48px;
        padding-right: 14px;
      }
    }
    .search_bread {
      padding: 0 13px;
      font-size: 12px;
      color: #686868;
      .bread_content {
        float: left;
        height: 23px;
        line-height: 25px;
        padding: 0 13px;
        margin: 0 10px 10px 0;
        border-radius: 3px;
        background: #f0f2f5;
      }
    }
  }
  .hot_search {
    .search_bread {
      height: 100px;
      .hide_word {
        height: 30px;
        text-align: center;
        line-height: 35px;
        margin-top: 30px;
        margin-bottom: 40px;
      }
    }
  }
}
</style>
