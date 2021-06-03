<template>
  <div class="search_goods_wrap">
    <!-- 搜索框 -->
    <div class="search_container">
      <van-icon @click="goBack" name="arrow-left" color="#656771" />
      <van-search
        v-model="keyword"
        shape="round"
        background="transparent"
        placeholder=""
        @focus="toSearch"
      />
    </div>
    <div class="_block"></div>
    <div class="filter_items">
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item v-model="value" :options="option" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item title="筛选" ref="item">
          <van-cell center title="包邮">
            <template #right-icon>
              <van-switch v-model="switch1" size="24" active-color="#1989fa" />
            </template>
          </van-cell>
          <van-cell center title="团购">
            <template #right-icon>
              <van-switch v-model="switch2" size="24" active-color="#1989fa" />
            </template>
          </van-cell>
          <div style="display:flex; padding: 5px 16px">
            <van-button type="default" block @click="onConfirm">
              重置
            </van-button>
            <van-button type="info" block @click="onConfirm">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 商品展示s -->
    <div class="goods_wrap">
      <div class="goods_container">
        <ul class="goods_list clearfix">
          <Goods :key="index" v-for="(goods,index) in goodsList" :goods="goods"></Goods>  
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchGoods } from "@/utils/api";
export default {
  name: "SearchGoods",
  data() {
    return {
      goodsList:[],
      keyword: "",
      value: 0,
      value2:0,
      switch1: false,
      switch2: false,
      option: [
        { text: '综合', value: 0 },
        { text: '最新上架', value: 1 },
        { text: '价格由低到高', value: 2 },
        { text: '价格由高到低', value: 3 },
        { text: '评价最多', value: 4 },
      ],
      option2: [
        { text: '默认排序', value: 0 },
        { text: '好评排序', value: 1 },
        { text: '销量排序', value: 2 },
      ]
    };
  },
  methods: {
    initKeyword() {
      this.keyword = this.$route.params.keyword;
    },
    goBack() {
      this.$router.replace({name: 'search'})
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    toSearch() {
      this.$router.replace({name: 'search'})
    },
    async getSearchGoods() {
      const result = await getSearchGoods(this.$route.params.keyword);
      this.goodsList = result.data
    },
  },
  mounted() {
    this.getSearchGoods();
    this.initKeyword();
  },
};
</script>

<style lang="less" scoped>
.search_goods_wrap {
  background-color: #F5F5F5;
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
    }
    .van-search {
      width: 330px;
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
  .filter_items {
    color: #333333;
  }
  .goods_wrap {
    margin-top: 10px;
      width: 375px;
      .goods_container {
        width: 355px;
        margin: 0 auto;
        .goods_list {
          width: 355px;
        }
      }
    }
}
</style>
