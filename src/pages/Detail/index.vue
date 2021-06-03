<template>
  <div class="wrap">
    <!-- 头部固定定位的返回键 -->
    <div class="top_wrap">
      <i @click="goBack" class="back iconfont icon-left"></i>
      <i class="elipsis iconfont icon-elipsis"></i>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe @change="onChange">
        <van-swipe-item
          :key="index"
          v-for="(img, index) in imageList"
          v-lazy:background-image="img.url"
        >
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{ (imageList || []).length }}
          </div>
        </template>
      </van-swipe>
    </div>
    <!-- 价格以及商品文字描述 -->
    <div class="top">
      <div class="priceWrap">
        <div class="price_wrap">
          <span class="price_word"
            ><em>￥</em><span>{{(detail.priceInfo || {}).price }}</span
            ><span>.00</span></span
          >
          <div class="icon">
            <div>
              <i class="iconfont icon-money"></i>
              <p>降价提醒</p>
            </div>
            <div>
              <i class="iconfont icon-shoucang"></i>
              <p>收藏</p>
            </div>
          </div>
        </div>
      </div>
      <div class="title_wrap">
        <div class="text_wrap">
          <img src="./images/g.png" alt="" />
          {{ detail.skuName }}
        </div>
      </div>
    </div>

    <div class="bottom_wrap">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="cart-o" @click="toCart" text="购物车" badge="5" />
        <van-goods-action-icon icon="star-o" text="收藏" />
        <van-goods-action-button @click="addCart" color="#be99ff" type="warning" text="加入购物车" />
        <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      current: 0,
    };
  },
  computed: {
    ...mapState({
      detail: (state) => state.goodDetail.goodDetail || {},
    }),
    imageList() {
      return (this.detail.imageInfo || {}).imageList;
    },
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    getGoodDetail() {
      this.$store.dispatch("getGoodDetail", this.$route.params.skuId);
    },
    goBack() {
      this.$router.back();
    },
    async addCart() {
      const {id} = JSON.parse(localStorage.getItem('user'))
      try{
        await this.$store.dispatch('addCart', {skuId: this.detail.skuId, userId: this.$store.state.user.id || id})
        this.Toast('加入购物车成功')
      } catch (error) {
        this.Toast('服务器火爆,请稍后重试')
      }
    },
    toCart() {
      this.$router.push('/home/cart')
    }
  },
  mounted() {
    this.getGoodDetail();
  },
};
</script>

<style lang="less" scoped>
.wrap {
  background-color: #f2f2f2;
  .top_wrap {
    position: fixed;
    z-index: 10000;
    width: 375px;
    height: 40px;
    .back {
      width: 50px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      float: left;
      font-size: 20px;
    }
    .elipsis {
      width: 50px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      float: right;
      font-size: 30px;
    }
  }
  .swiper {
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      width: 375px;
      height: 375px;
      line-height: 150px;
      text-align: center;
      border-radius: 7px;
      background: no-repeat 0 0 / cover;
    }
    .custom-indicator {
      position: absolute;
      right: 0;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 13px;
      color: #fff;
      background: rgba(204, 202, 204, 0.5);
      width: 30px;
      text-align: center;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
  .top {
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
    .priceWrap {
      box-sizing: border-box;
      width: 375px;
      height: 34.5px;
      padding: 0 18px;
      font-size: 30px;
      margin-top: 12px;
      color: #f2270c;
      font-family: menlo;
      .price_wrap {
        .price_word {
          em {
            font-size: 16px;
            font-style: normal;
          }
          span {
            font-weight: 700;
            &:nth-of-type(2) {
              font-weight: normal;
              font-family: microsoft yahei;
              font-size: 18px;
            }
          }
        }
        .icon {
          float: right;
          font-size: 12px;
          div {
            width: 50px;
            float: left;
            text-align: center;
            i {
              font-size: 26px;
              font-weight: 700;
              color: #3f3f3f;
            }
            p {
              margin: 0;
              color: #000;
            }
          }
        }
      }
    }
    .title_wrap {
      width: 375px;
      height: 113px;
      box-sizing: border-box;
      padding: 12px 18px;
      .text_wrap {
        position: relative;
        height: 41px;
        font-size: 16px;

        img {
          width: 24px;
          height: 13px;
        }
      }
    }
  }
}
</style>
