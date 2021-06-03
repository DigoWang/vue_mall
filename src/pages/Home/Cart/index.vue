<template>
  <div class="wrap">
    <!-- 顶部导航栏 -->
    <div class="nav_bar_wrap">
      <van-nav-bar title="购物车">
        <template #right>
          <van-icon name="ellipsis" size="26" color="#5D5F6A" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 商品详情 -->
    <van-swipe-cell v-show="cartList.length !== 0" :key="item.skuId" v-for="(item, index) in cartList">
      <div class="cart_list">
        <van-checkbox
          @click="toggleIsChecked(item.skuId, item.isChecked)"
          v-model="item.isChecked"
        ></van-checkbox>
        <van-card
          :num="item.skuNum"
          :price="item.skuPrice + '.00'"
          :desc="item.skuName"
          :title="item.skuName"
          :thumb="item.imgUrl"
          :thumb-link="`/detail/${item.skuId}`"
          lazy-load
        >
          <template #tags>
            <van-tag color="#3396FB" plain type="danger">品牌</van-tag>
            <van-tag color="#3396FB" plain type="danger">{{
              item.brandName
            }}</van-tag>
          </template>
          <template #footer>
            <van-button
              @click="changeNum(item.skuId, -1, index)"
              plain
              type="warning"
              icon="minus"
              size="mini"
            ></van-button>
            <van-button
              @click="changeNum(item.skuId, 1, index)"
              plain
              type="info"
              icon="plus"
              size="mini"
            ></van-button>
            <!-- <van-icon name="plus" />
            <van-icon name="minus" /> -->
          </template>
        </van-card>
      </div>
      <template #right>
        <van-button @click="deleteOne(item.skuId)" square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
    <!-- 购物车为空时显示 -->
    <van-empty description="购物车空空如也~ 尝试着填满它吧" v-show="cartList.length === 0" />
    <!-- 提交订单 -->
    <div class="submit_wrap clearfix">
      <van-submit-bar
        :price="totalPrice"
        button-color="#1989FA"
        button-text="去结算"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checkedAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      list: "",
      cartList: [],
    };
  },
  computed: {
    totalPrice() {
      return (
        this.cartList.reduce((prev, item) => {
          if (item.isChecked) {
            prev += item.cartPrice;
          }
          return prev;
        }, 0) * 100
      );
    },
    checkedAll: {
      get() {
        return (
          this.cartList.every((item) => {
            return item.isChecked;
          }) && this.cartList.length > 0
        );
      },
      async set(isChecked) {
        isChecked = isChecked ? 1 : 0;
        const result = await this.$API.checkAllCart(isChecked);
        if (result.status === 200) {
          this.getCart();
        } else {
          this.Toast("操作失败,请重试");
        }
      },
    },
  },
  methods: {
    // 初始化获取购物车信息
    async getCart() {
      const result = await this.$API.getCart();
      if (result.status === 200) {
        this.cartList = result.data;
      } else this.Toast.fail("网络连接超时, 请稍候再试");
    },
    // 切换单一商品的选中状态
    async toggleIsChecked(skuId, isChecked) {
      isChecked = isChecked ? 1 : 0;
      const result = await this.$API.checkOneCart(skuId, isChecked);
      if (result.status === 200) {
        this.getCart();
      } else {
        this.Toast.fail("操作失败,请重试");
      }
    },
    async changeNum(skuId, num, index) {
      let skuNum = this.cartList[index].skuNum + num;
      if (skuNum < 1) return;
      const result = await this.$API.changeSkuNum(skuId, skuNum);
      if (result.status === 200) {
        this.getCart();
      } else {
        this.Toast.fail("更改数量失败");
      }
    },
    async deleteOne(skuId) {
      const result = await this.$API.deleteOneCart(skuId);
      if(result.status === 200) {
        this.getCart();
      } else {
        this.Toast.fail('删除失败')
      }
    },
    onSubmit() {

    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style lang="less" scoped>
.wrap {
  background: #f5f5f5;
  .nav_bar_wrap {
    width: 375px;
    height: 46px;
    .van-nav-bar {
      position: fixed;
      width: 375px;
    }
  }
  .van-empty {
    background-color: #fff;
  }
  .cart_list {
    position: relative;
    .van-card {
      background: #fff;
      border-radius: 10px;
      margin: 5px 0;
      padding-left: 25px;
      padding-right: 20px;
    }
    .van-checkbox {
      position: absolute;
      left: 3px;
      top: 40px;
      z-index: 1;
    }
  }
  .submit_wrap {
    height: 50px;
    background-color: #fff;
    .van-submit-bar {
      margin-bottom: 50px;
    }
  }
}
.clearfix {
  content: "";
  display: block;
  clear: both;
}
.goods-card {
  margin: 0;
  padding: 0;
  background-color: @white;
}

.delete-button {
  height: 128px;

  position: relative;
  top: -28px;
}
</style>
