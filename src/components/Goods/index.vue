<template>
  <li @click="toDetail" class="goods_item">
    <img v-lazy="goods.imageInfo.whiteImage" alt="" />
    <div class="content">
      <p>{{ goods.skuName }}</p>
      <div class="price">
        <span class="rmb">￥</span>
        <i>{{ goods.priceInfo.price }}</i>
        <span class="new">新品</span>
      </div>
      <div class="price plus_price">
        <span>￥</span>{{ parseInt(goods.priceInfo.price - 10) }}
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "Goods",
  props: ['goods'],
  methods: {
    toDetail() {
      this.$router.push({name: 'detail', params: {skuId: this.goods.skuId}})
    }
  },
};
</script>

<style lang="less" scoped>
.goods_item {
  float: left;
  width: 172.5px;
  height: 264px;
  background-color: #fff;
  border-radius: 8px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  &:nth-of-type(2n-1) {
    margin-right: 5px;
  }
  &:nth-of-type(2n) {
    margin-left: 5px;
  }
  img {
    width: 100%;
  }
  .content {
    transform: translateY(-23px);
    font-size: 13px;
    box-sizing: border-box;
    width: 100%;
    height: 39px;
    margin: 5px 0 3px 0;
    padding: 0 4px;
    > p {
      margin: 0 !important;
      height: 39px;
      width: 100%;
      line-height: 20px;
      overflow: hidden;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -o-text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
    }
    .price {
      width: 100%;
      height: 26px;
      line-height: 26px;
      color: #fa2c19;
      display: flex;
      align-items: center;
      .rmb {
        font-size: 13px;
      }
      i {
        font-style: normal;
        font-size: 16px;
      }
      .new {
        width: 32px;
        height: 15px;
        text-align: center;
        line-height: 15px;
        border-radius: 3px;
        border: 1px solid #fa2c19;
        margin: 0 10px;
      }
      &.plus_price {
        color: #232326;
        font-weight: 700;
        font-family: Menlo;
        font-style: italic;
        span {
          font-style: normal;
        }
        &::after {
          content: "";
          float: left;
          width: 28px;
          height: 9px;
          background: url("./images/plus_price.png") no-repeat 0 0 / cover;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
