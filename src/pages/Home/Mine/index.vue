<template>
  <div>
    <div class="wrap">
      <div class="nav_bar_wrap">
        <van-nav-bar title="我的文迪">
          <template #right>
            <van-icon name="ellipsis" size="26" color="#5D5F6A" />
          </template>
        </van-nav-bar>
      </div>
      <div class="user-card">
        <div @click="userSetting" class="user-info">
          <div class="avatar-wrap">
            <div class="avatar-image">
              <div class="avatar-plus"></div>
            </div>
          </div>
          <div class="personal-wrap">
            <div class="name-wrap">
              <div class="name">
                <span>{{ username }}</span>
              </div>
              <div class="diamond"></div>
              <div class="name-setting"><van-icon name="setting-o" /></div>
            </div>
            <div class="hor-tips">
              <div class="plus-num">迪享值</div>
              <div>
                小迪信用 <span style="color: #4041b5">95.9</span
                ><van-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
        <div class="xlist_group">
          <div class="item_production">
            <div class="item_num"><span>1</span></div>
            <div class="item_name"><span>商品收藏</span></div>
          </div>
          <div class="item_shop">
            <div class="item_num"><span>39</span></div>
            <div class="item_name"><span>店铺收藏</span></div>
          </div>
          <div class="item_feet">
            <div class="item_num"><span>0</span></div>
            <div class="item_name"><span>我的足迹</span></div>
          </div>
        </div>
        <div class="plus_black_wrap">
          <div class="inner">
            <div class="title">
              <div class="plus_title">
                <span class="freight_voucher">您有6张运费券待使用</span>
              </div>
              <div class="plus_subtitle">
                <div>立即查看</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="my_order">
        <van-row class="van_row">
          <van-col class="van_col" span="6"
            ><van-icon class="icon" name="credit-pay" />
            <p>待付款</p></van-col
          >
          <van-col class="van_col" span="6"
            ><van-icon class="icon" name="send-gift-o" />
            <p>待收货</p></van-col
          >
          <van-col class="van_col" span="6"
            ><van-icon class="icon" name="cash-on-deliver" />
            <p>退换 / 售后</p></van-col
          >
          <van-col class="van_col special" span="6"
            ><van-icon class="icon special" name="orders-o" />
            <p class="special">全部订单</p></van-col
          >
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Mine",
  computed: {
    ...mapState({
      username: (state) => state.user.username,
    }),
  },
  methods: {
    userSetting() {
      this.$router.push({ name: "accountSetting" });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  // 切换路由时, 路由组件间的滚动条位置互不影响
  // height: 100vh;
  // overflow: auto;

  color: #262626;
  background-color: #f7f7f7;
  font-weight: JDZH-Regular;
  .nav_bar_wrap {
    width: 375px;
    height: 46px;
    .van-nav-bar {
      position: fixed;
      width: 375px;
    }
  }
  .user-card {
    padding: 12px 0 10px;
    width: 375px;
    height: 190px;
    background: url("./images/user-bg-plus.png") no-repeat scroll 0 0 / cover;
    .user-info {
      padding: 0 18px 18px 18px;
      display: flex;
      .avatar-wrap {
        width: 52px;
        height: 52px;
        box-shadow: 0 2px 10px rgb(0 0 0 / 15%);
        border-radius: 50%;
        .avatar-image {
          position: relative;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: url("./images/avatar.jpg") no-repeat scroll 0 0 / cover;
          .avatar-plus {
            position: absolute;
            left: -1px;
            top: -5px;
            width: 115%;
            height: 115%;
            background: url("./images/avatar-plus.png") no-repeat scroll 0 0 /
              cover;
          }
        }
      }
      .personal-wrap {
        padding-left: 18px;
        width: 100%;
        height: 52px;
        .name-wrap {
          font-size: 18px;
          font-family: -apple-system, Helvetica, sans-serif;
          height: 24px;
          div {
            float: left;
            height: 24px;
            span {
              line-height: 24px;
            }
          }
          .diamond {
            width: 15px;
            height: 15px;
            margin: 5px 0 0 5px;
            background: url("./images/jd_zs.png") no-repeat scroll -60px 0 / cover;
          }
          .name-setting {
            height: 24px;
            line-height: 26px;
            font-size: 22px;
            float: right;
          }
        }
        .hor-tips {
          font-size: 12px;
          div {
            margin-top: 10px;
            margin-right: 8px;
            padding: 0 8px;
            float: left;
            background-color: #fef2d4;
            border-radius: 8px;
            &:nth-child(2) {
              padding-right: 0;
            }
          }
        }
      }
    }
    .xlist_group {
      height: 50px;
      padding: 0 14px;
      display: flex;
      > div {
        flex: 1;
        height: 50px;
        text-align: center;
        .item_num {
          font-size: 16px;
          line-height: 16px;
        }
        .item_name {
          font-size: 12px;
          line-height: 34px;
        }
      }
    }
    .plus_black_wrap {
      font-size: 12px;
      height: 42px;
      background-color: #bfa;
      margin: 6px 17.5px 0;
      background: url("./images/plus-bg.png") no-repeat 0 0 / cover;
      .inner {
        display: flex;
        height: 42px;
        padding: 0 10px;
        align-items: center;
        position: relative;
        .title {
          display: flex;
          // position: relative;
          align-items: center;
          &::before {
            content: "";
            width: 57px;
            height: 12px;
            background: url("./images/plus.png") no-repeat 50%;
            background-size: 100% 100%;
          }
          .plus_subtitle {
            display: flex;
            align-items: center;
            width: 55px;
            height: 18px;
            padding: 0 10px;
            background-color: #fde069;
            position: absolute;
            right: 10px;
            border-radius: 9px;
            line-height: 18px;
            &::after {
              content: "";
              display: block;
              width: 0;
              height: 0;
              border-left: 3px solid #262626;
              border-top: 3px solid transparent;
              border-bottom: 3px solid transparent;
              margin-left: 4px;
            }
          }
          .freight_voucher {
            display: block;
            color: #ffe678;
            padding-left: 21px;
            position: relative;
            display: flex;
            align-items: center;
            &::after {
              content: "";
              width: 1px;
              height: 7px;
              background-color: #ffe678;
              position: absolute;
              left: 10px;
            }
          }
        }
      }
    }
  }
  .my_order {
    width: 375px;
    height: 88px;
    margin-top: -33px;
    border-radius: 10px;
    background-color: #fff;
    .van_row {
      font-size: 12px;
      .van_col {
        padding-top: 20px;
        text-align: center;
        &.special {
          position: relative;
          &::before {
            content: "";
            width: 10px;
            height: 72px;
            background: url("./images/dd-left.png") no-repeat 0 0 / cover;
            position: absolute;
            top: 10px;
            left: -5px;
          }
        }
        .icon {
          color: #5a5959;
          font-size: 27px;
          &.special {
            color: #2790fa;
          }
        }
        p {
          margin-top: 0;
          &.special {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
