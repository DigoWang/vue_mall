<template>
  <div class="wrap" ref="Box" @scroll="orderScroll">
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="isLoading"
      :head-height="80"
      @refresh="onRefresh"
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling> 下拉刷新 </template>
      <!-- 释放提示 -->
      <template #loosing> 释放刷新 </template>
      <!-- 加载提示 -->
      <template #loading> 刷新中 </template>
      <!-- 成功提示 -->
      <template #success> 刷新成功 </template>
      <div class="s_wrap">
        <!-- 搜索框、轮播图、广告 -->
        <div class="search_swiper">
          <!-- 搜索框 -->
          <div class="search_bar">
            <div class="search_container">
              <van-icon name="wap-nav" color="#fff" />
              <van-search
                @focus="toSearch"
                v-model="value"
                shape="round"
                background="transparent"
                :placeholder="placeholder"
              />
              <van-icon name="contact" color="#fff" />
            </div>
          </div>
          <!-- 轮播图 -->
          <div class="swiper">
            <van-swipe
              class="my-swipe"
              :autoplay="3000"
              indicator-color="white"
              duration="300"
            >
              <van-swipe-item
                :key="item.id"
                v-for="item in banner"
                v-lazy:background-image="item.url"
              ></van-swipe-item>
              <!-- 以下代码为非懒加载， 45行为懒加载 -->
              <!-- :style="{ 'background-image': `url(${item.url})` }" -->
            </van-swipe>
          </div>
          <!-- 轮播图下的优惠广告 -->
          <div class="floor">
            <div class="left">
              <img class="bg" src="./images/left-bg.png" alt="" />
              <img class="watch product" src="./images/left.png" alt="" />
            </div>
            <div class="middle">
              <img class="middle_bg bg" src="./images/middle.gif" alt="" />
              <img class="ps5 product" src="./images/ps5.jpg" alt="" />
              <img class="airtag product" src="./images/airtag.jpg" alt="" />
            </div>
            <div class="right">
              <img class="bg" src="./images/right-bg.png" alt="" />
              <img class="product piano" src="./images/right.jpg" alt="" />
              <div class="word"><span>新品特惠</span></div>
            </div>
          </div>
        </div>
        <!-- 中间的十个小图标 -->
        <div class="_middle_spirit">
          <div class="swiper">
            <van-swipe class="my-swipe" indicator-color="#39A9ED">
              <van-swipe-item>
                <div class="top">
                  <div class="photo_item">
                    <img src="./images/jd_market.png" alt="" />
                    <p>文迪超市</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/3c.png" alt="" />
                    <p>数码电器</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/clothes.png" alt="" />
                    <p>文迪服饰</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/fresh.png" alt="" />
                    <p>文迪生鲜</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/jd_home.png" alt="" />
                    <p>文迪到家</p>
                  </div>
                </div>
                <div class="bottom">
                  <div class="photo_item">
                    <img src="./images/recharge.png" alt="" />
                    <p>充值缴费</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/pdd.png" alt="" />
                    <p>9.9元拼</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/coupon.png" alt="" />
                    <p>领券</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/gold.png" alt="" />
                    <p>领金贴</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/plus_vip.png" alt="" />
                    <p>PLUS会员</p>
                  </div>
                </div>
              </van-swipe-item>
              <van-swipe-item>
                <div class="top">
                  <div class="photo_item">
                    <img src="./images/jd_market.png" alt="" />
                    <p>文迪超市</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/3c.png" alt="" />
                    <p>数码电器</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/clothes.png" alt="" />
                    <p>文迪服饰</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/fresh.png" alt="" />
                    <p>文迪生鲜</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/jd_home.png" alt="" />
                    <p>文迪到家</p>
                  </div>
                </div>
                <div class="bottom">
                  <div class="photo_item">
                    <img src="./images/recharge.png" alt="" />
                    <p>充值缴费</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/pdd.png" alt="" />
                    <p>9.9元拼</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/coupon.png" alt="" />
                    <p>领券</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/gold.png" alt="" />
                    <p>领金贴</p>
                  </div>
                  <div class="photo_item">
                    <img src="./images/plus_vip.png" alt="" />
                    <p>PLUS会员</p>
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <!-- 商品 -->
        <div class="goods_wrap">
          <div class="goods_container">
            <ul class="goods_list clearfix">
              <!-- <li :key="index" v-for="(goods,index) in goodsList" class="goods_item">
                <img :src="goods.imageInfo.whiteImage" alt="">
                <div class="content">
                  <p>{{goods.skuName}}</p>
                  <div class="price">
                    <span class="rmb">￥</span>
                    <i>{{goods.priceInfo.price}}</i>
                    <span class="new">新品</span>
                  </div>
                  <div class="price plus_price"><span>￥</span>{{parseInt(goods.priceInfo.price-10)}}</div>
                </div>
              </li> -->
              <!-- 将每个商品拆分成一个组件, v-for遍历通过props传值, 即可遍历生成多个Goods组件 -->
              <Goods
                :key="index"
                v-for="(good, index) in goodsList"
                :goods="good"
              />
            </ul>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HomePage",
  components: {
    Goods: () => import("@/components/Goods"),
  },
  data() {
    return {
      isLoading: false,
      value: "",
      images: [],
    };
  },
  computed: {
    ...mapState({
      banner: (state) => state.home.banner,
      goodsList: (state) => state.home.goodsList,
    }),
    // 搜索框的 placeholder 值
    placeholder() {
      const arr = JSON.parse(localStorage.getItem("recentSearch")) || [];
      return arr[0] || "iPhone";
    },
  },
  methods: {
    onRefresh() {
      location.reload();
      setTimeout(() => {
        this.isLoading = false;
      }, 10);
    },
    toSearch() {
      this.$router.push({ name: "search" });
    },
    getBanner() {
      this.$store.dispatch("getBanner");
    },
    getGoods() {
      this.$store.dispatch("getGoods");
    },
    // 监听滚轮是否滑到底部
    orderScroll(e) {
      let a = this.$refs.Box.scrollHeight;
      let b = this.$refs.Box.clientHeight;
      let c = this.$refs.Box.scrollTop;
      if (b + c == a) {
        this.getGoods()
      } else {
        return;
      }
    },
  },
  mounted() {
    this.getBanner();
    this.getGoods();
  },
};
</script>

<style lang="less" scoped>
.wrap {
  // 切换路由时, 路由组件间的滚动条位置互不影响
  // height: 100vh;
  // overflow: auto;

  background: #f5f5f5;
  .s_wrap {
    .search_swiper {
      width: 375px;
      height: 313px;
      background: url("./images/home-bg.jpg") no-repeat 0 0 / cover;
      .search_bar {
        width: 375px;
        height: 44px;
        .search_container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 375px;
          height: 44px;
          position: fixed;
          z-index: 9999;
          background: rgba(0, 0, 255, 0.2);
          .van-icon {
            font-size: 26px;
          }
          .van-search {
            width: 300px;
            .van-search__content {
              display: flex;
              align-items: center;
              height: 30px;
            }
          }
        }
      }
      .swiper {
        padding: 0 12px;
        .my-swipe {
          border-radius: 7px;
          .van-swipe-item {
            color: #fff;
            font-size: 20px;
            width: 375px;
            height: 150px;
            line-height: 150px;
            text-align: center;
            border-radius: 7px;
            &:nth-of-type(1) {
              background: no-repeat -5px 0 / cover;
            }
            &:nth-of-type(2) {
              background: no-repeat 0 0 / cover;
            }
            &:nth-of-type(3) {
              background: no-repeat -20px 0 / cover;
            }
            &:nth-of-type(4) {
              background: no-repeat -10px 0 / cover;
            }
            &:nth-of-type(5) {
              background: no-repeat -10px 0 / cover;
            }
            &:nth-of-type(6) {
              background: no-repeat -10px 0 / cover;
            }
            &:nth-of-type(7) {
              background: no-repeat -10px 0 / cover;
            }
            &:nth-of-type(8) {
              background: no-repeat 0 0 / cover;
            }
          }
        }
      }
      .floor {
        width: 375px;
        height: 100px;
        display: flex;
        padding-top: 5px;
        > div {
          width: 90px;
          height: 100px;
          background-color: #baf;
          position: relative;
          &.middle {
            width: 195px;
          }
          img {
            width: 90px;
            &.bg {
              position: absolute;
              z-index: 10;
            }
            &.middle_bg {
              width: 195px;
            }
            &.product {
              position: absolute;
            }
            &.watch {
              left: 2px;
              z-index: 100;
            }
            &.ps5 {
              width: 66px;
              left: 20px;
              top: 10px;
              z-index: 0;
            }
            &.airtag {
              width: 70px;
              right: 18px;
              top: 10px;
              z-index: 0;
            }
            &.piano {
              width: 66px;
              right: 14px;
              top: 13px;
              z-index: 0;
            }
          }
          .word {
            font-size: 12px;
            color: #f7ffff;
            position: absolute;
            z-index: 1000;
            right: 23px;
            bottom: 6px;
          }
        }
      }
    }
    ._middle_spirit {
      width: 375px;
      height: 162px;
      .my-swipe {
        height: 170px;
      }
      .top,
      .bottom {
        display: flex;
        height: 74px;
        .photo_item {
          position: relative;
          width: 75px;
          height: 74px;
          text-align: center;
          display: flex;
          justify-content: center;
          // align-items: center;
          img {
            margin-top: 10px;
            width: 40px;
            height: 40px;
          }
          p {
            color: #666666;
            font-size: 12px;
            position: absolute;
            bottom: -10px;
          }
        }
      }
    }
    .goods_wrap {
      width: 375px;
      .goods_container {
        width: 355px;
        margin: 0 auto;
        .goods_list {
          width: 355px;
          /* .goods_item {
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
                margin:0 !important;
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
                color: #FA2C19;
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
                  border: 1px solid #FA2C19;
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
                    content: '';
                    float: left;
                    width: 28px;
                    height: 9px;
                    background: url("./images/plus_price.png") no-repeat 0 0 / cover;
                    margin-left: 5px;
                  }
                }
              }
            }
          } */
        }
      }
    }
  }
}
</style>
