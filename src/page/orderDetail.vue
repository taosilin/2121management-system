<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <div>订单ID：{{orderDetail.orderID}}</div>
        <div>用户ID：{{orderDetail.userID}}</div>
        <div>下单时间：{{orderDetail.orderTime}}</div>
        <div>付款时间：{{orderDetail.paymentTime}}</div>
        <div>收货时间：{{orderDetail.receiveTime}}</div>
        <div>订单状态：{{orderDetail.state}}</div>
        <div>订单备注：{{orderDetail.remark}}</div>
        <div>快递单号：{{orderDetail.courierID}}</div>
        <div>配送方式：{{orderDetail.deliveryMethod}}</div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>地址详情</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <div>收件人：{{addressDetail.receiver}}</div>
        <div>电话：{{addressDetail.telephone}}</div>
        <div>省：{{addressDetail.province}}</div>
        <div>市：{{addressDetail.city}}</div>
        <div>区：{{addressDetail.district}}</div>
        <div>详细地址：{{addressDetail.detail}}</div>
        <div>邮政编码：{{addressDetail.zipCode}}</div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单支付详情</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <div>总金额：{{orderDetail.totalAmount}}</div>
        <div>优惠抵扣：{{couponDetail.discount}}</div>
        <div>实际付款：{{orderDetail.actualPayment}}</div>
        <div>优惠信息：</div>
        <div>优惠券ID：{{couponDetail.couponID}}</div>
        <div>优惠详情：满{{couponDetail.restriction}}减{{couponDetail.discount}}</div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>镜框详情</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="f in frames" class="text item">
        镜框ID：{{f.frameID}}
        <div>
          验光单信息：
          <el-row>
            <el-col :span="6">验光单</el-col>
            <el-col :span="6">SPH</el-col>
            <el-col :span="6">CYL</el-col>
            <el-col :span="6">Axis</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">Right Eye</el-col>
            <el-col :span="6">{{f.rightDegree}}</el-col>
            <el-col :span="6">{{f.rightAstigmatism}}</el-col>
            <el-col :span="6">{{f.rightAxis}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">Left Eye</el-col>
            <el-col :span="6">{{f.leftDegree}}</el-col>
            <el-col :span="6">{{f.leftAstigmatism}}</el-col>
            <el-col :span="6">{{f.leftAxis}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">Distance PD</el-col>
            <el-col :span="18">{{f.interpupillary}}</el-col>
          </el-row>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品详情</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="p in products" class="text item">
        商品ID：{{p.productID}}
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "orderDetail",
  data(){
    return {
      orderDetail: {},
      addressDetail: {},
      products: [],
      frames: [],
      couponDetail: {}
    }
  },
  created() {
    // 取到路由带过来的参数
    let orderID = this.$route.query.orderID
    axios.post('http://localhost:8088/order/detail',{
      orderID: orderID
    }).then(response=>{
      this.orderDetail = response.data.data.order;
      this.products = response.data.data.products;
      this.frames = response.data.data.frames;

      axios.post('http://localhost:8088/address/detail',{
        addressID: this.orderDetail.addressID
      }).then(response=>{
        this.addressDetail = response.data.data
      }).catch(error=>{
        console.log(error);
      })

      axios.post('http://localhost:8088/coupon/detail',{
        couponID: this.orderDetail.couponID
      }).then(response=>{
        this.couponDetail = response.data.data
      }).catch(error=>{
        console.log(error);
      })

    }).catch(error=>{
      console.log(error);
    });

  },
  methods: {

  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
  text-align: left;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.clearfix{
  font-weight: bold;
}
.box-card {
  width: 100%;
}
.el-col{
  min-height: 1px;
}
</style>
