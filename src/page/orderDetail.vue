<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        订单详情
        <el-tag v-if="orderDetail.state=='0'">待付款</el-tag>
        <el-tag v-else-if="orderDetail.state=='1'" type="success">待收货</el-tag>
        <el-tag v-else-if="orderDetail.state=='2'" type="success">待评价</el-tag>
        <el-tag v-else-if="orderDetail.state=='3'" type="success">已完成</el-tag>
        <el-tag v-else-if="orderDetail.state=='4'" type="warning">退货中</el-tag>
        <el-tag v-else type="info">已取消</el-tag>
      </div>
      <div class="text item">
        <el-row>
          <el-col :span="8">订单ID：{{orderDetail.orderID}}</el-col>
          <el-col :span="8">用户ID：{{orderDetail.userID}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">下单时间：{{orderDetail.orderTime}}</el-col>
          <el-col :span="8">付款时间：{{orderDetail.paymentTime}}</el-col>
          <el-col :span="8">收货时间：{{orderDetail.receiveTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">订单备注：{{orderDetail.remark}}</el-col>
          <el-col :span="8">快递单号：{{orderDetail.courierID}}</el-col>
          <el-col :span="8">配送方式：{{orderDetail.deliveryMethod}}</el-col>
        </el-row>
      </div>
    </el-card>

    <el-card v-if="refundDetail!=null" class="box-card">
      <div slot="header" class="clearfix">退款信息</div>
      <div class="text item">
        <el-row>
          <el-col :span="6">退款信息ID：{{refundDetail.refundID}}</el-col>
          <el-col :span="6">订单ID：{{refundDetail.orderID}}</el-col>
          <el-col :span="6">商品ID：{{refundDetail.productID}}</el-col>
          <el-col :span="6">规格ID：{{refundDetail.specID}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">申请人：{{refundDetail.applicant}}</el-col>
          <el-col :span="6">退款价格：{{refundDetail.amount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">退款理由：{{refundDetail.reason}}</el-col>
          <el-col :span="18">退款描述：{{refundDetail.description}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">状态：{{refundDetail.state}}</el-col>
          <el-col :span="6">退款类型：{{refundDetail.type}}</el-col>
          <el-col :span="6">更新时间：{{refundDetail.updateTime}}</el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">地址信息</div>
      <div class="text item">
        <el-row>
          <el-col :span="4">收件人：{{addressDetail.receiver}}</el-col>
          <el-col :span="4">电话：{{addressDetail.telephone}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">省：{{addressDetail.province}}</el-col>
          <el-col :span="4">市：{{addressDetail.city}}</el-col>
          <el-col :span="4">区：{{addressDetail.district}}</el-col>
          <el-col :span="4">详细地址：{{addressDetail.detail}}</el-col>
          <el-col :span="4">邮政编码：{{addressDetail.zipCode}}</el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">订单支付详情</div>
      <div class="text item">
        <el-row>
          <el-col :span="6">总金额：{{orderDetail.totalAmount}}</el-col>
          <el-col :span="6">优惠抵扣：{{couponDetail.discount}}</el-col>
          <el-col :span="6">实际付款：{{orderDetail.actualPayment}}</el-col>
        </el-row>
        <el-row>
          <el-col>优惠信息：</el-col>
        </el-row>
        <el-row>
          <el-col span="6">优惠券ID：{{couponDetail.couponID}}</el-col>
          <el-col span="6">优惠详情：满{{couponDetail.restriction}}减{{couponDetail.discount}}</el-col>
        </el-row>
      </div>
    </el-card>

    <el-card v-if="frames.length>0" class="box-card">
      <div slot="header" class="clearfix">镜框详情</div>
      <div v-for="f in frames" class="text item">
        <el-row>
          <el-col :span="6">镜框ID：{{f.frameID}}</el-col>
          <el-col :span="6">镜片ID：{{f.lensID}}</el-col>
          <el-col :span="6">SKUID:{{f.specID}}</el-col>
          <el-col :span="6">
            状态：
            <el-tag v-if="f.state === '0'" effect="dark" size="small">生产中</el-tag>
            <el-tag v-else-if="f.state === '1'" effect="dark" type="success" size="small">待收货</el-tag>
            <el-tag v-else effect="dark" type="info" size="small">已收货</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">数量：{{f.num}}</el-col>
          <el-col :span="6">价格：{{f.price}}</el-col>
          <el-col :span="6">颜色ID：{{f.productSpec}}</el-col>
          <el-col :span="6">
            <div>
              <el-image
                style="width: 100px; height: 100px"
                :src="f.specImage"
                fit="contain"></el-image>
            </div>
          </el-col>
        </el-row>
        <div>
          验光单信息：
          <el-row>
            <el-col :span="6" class="optometry-sheet">验光单</el-col>
            <el-col :span="6" class="optometry-sheet">SPH</el-col>
            <el-col :span="6" class="optometry-sheet">CYL</el-col>
            <el-col :span="6" class="optometry-sheet">Axis</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="optometry-sheet">Right Eye</el-col>
            <el-col :span="6" class="optometry-sheet">{{f.rightDegree.toFixed(2)}}</el-col>
            <el-col :span="6" class="optometry-sheet">{{f.rightAstigmatism}}</el-col>
            <el-col :span="6" class="optometry-sheet">{{f.rightAxis}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="optometry-sheet">Left Eye</el-col>
            <el-col :span="6" class="optometry-sheet">{{f.leftDegree.toFixed(2)}}</el-col>
            <el-col :span="6" class="optometry-sheet">{{f.leftAstigmatism}}</el-col>
            <el-col :span="6" class="optometry-sheet">{{f.leftAxis}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="optometry-sheet">Distance PD</el-col>
            <el-col :span="18" class="optometry-sheet">{{f.interpupillary}}</el-col>
          </el-row>
        </div>

      </div>
    </el-card>

    <el-card v-if="products.length>0" class="box-card">
      <div slot="header" class="clearfix">商品详情</div>
      <div class="text item">
        <el-table
          :data="products"
          border
          style="width: 100%">

          <el-table-column
            prop="productID"
            label="商品ID">
          </el-table-column>

          <el-table-column
            prop="specID"
            label="SKU编码">
          </el-table-column>

          <el-table-column
            prop="productSpec"
            label="商品规格">
          </el-table-column>

          <el-table-column label="图片">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="products[scope.$index].specImage"
                fit="contain"></el-image>
            </template>
          </el-table-column>

          <el-table-column
            prop="num"
            label="数量">
          </el-table-column>

          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag v-if="products[scope.$index].state === '0'" effect="dark">生产中</el-tag>
              <el-tag v-else-if="products[scope.$index].state === '1'" effect="dark" type="success">待收货</el-tag>
              <el-tag v-else effect="dark" type="info">已收货</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDetail(scope.$index, scope.row)">生产清单</el-button>
<!--              <el-button-->
<!--                size="mini"-->
<!--                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--              <el-button-->
<!--                size="mini"-->
<!--                type="danger"-->
<!--                @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'orderDetail',
  data () {
    return {
      orderDetail: {},
      addressDetail: {},
      products: [],
      frames: [],
      couponDetail: {},
      refundDetail: {}
    }
  },
  created () {
    // 取到路由带过来的参数
    let orderID = this.$route.query.orderID
    axios.post('http://localhost:8088/order/detail',{
      orderID: orderID
    }).then(response => {
      this.orderDetail = response.data.data.order
      this.products = response.data.data.products
      this.frames = response.data.data.frames
      this.refundDetail = response.data.data.refund
      axios.post('http://localhost:8088/address/detail',{
        addressID: this.orderDetail.addressID
      }).then(response => {
        this.addressDetail = response.data.data
      }).catch(error => {
        console.log(error)
      })

      axios.post('http://localhost:8088/coupon/detail',{
        couponID: this.orderDetail.couponID
      }).then(response => {
        this.couponDetail = response.data.data
      }).catch(error => {
        console.log(error);
      })

    }).catch(error => {
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


.clearfix{
  font-weight: bold;
  text-align: left;
}
.box-card {
  width: 100%;
}
.el-col{
  min-height: 25px;
}

.optometry-sheet{
  border: 1px solid black;
  box-sizing: border-box;
  text-align: center;
}
</style>
