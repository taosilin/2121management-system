<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>待办预警</span>
          </div>
          <div class="text item">
            <el-row>
              <el-col :span="8">
                <el-badge :value="orderPending.toBeReviewed" class="badge" type="warning">
                  <el-button>待审核订单</el-button>
                </el-badge>
              </el-col>
              <el-col :span="8">
                <el-badge :value="orderPending.toBeProduced" class="badge" type="primary">
                  <el-button>待处理生产</el-button>
                </el-badge>
              </el-col>
              <el-col :span="8">
                <el-badge :value="orderPending.toBeDelivered" class="badge" type="primary">
                  <el-button>待发货订单</el-button>
                </el-badge>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-badge :value="orderPending.refundApplication" class="badge">
                  <el-button>
                    退款申请
                  </el-button>
                </el-badge>
              </el-col>
              <el-col :span="8">
                <el-badge :value="orderPending.returnApplication" class="badge">
                  <el-button>退货申请</el-button>
                </el-badge>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日交易看板</span>
          </div>
          <div class="text item">
            <el-col :span="12">付款订单金额</el-col>
            <el-col :span="12">付款订单数量</el-col>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>库存预警</span>
          </div>
          <div class="text item">
            <el-row>
              <el-col :span="8">
                <el-badge :value="12" class="badge">镜框预警</el-badge>
              </el-col>
              <el-col :span="8">
                <el-badge :value="12" class="badge" type="primary">镜片预警</el-badge>
              </el-col>
              <el-col :span="8">
                <el-badge :value="12" class="badge" type="warning">商品预警</el-badge>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品概览</span>
          </div>
          <div class="text item">
            <el-row>
              <el-col :span="6">
                <div>
                  上架商品
                  <span class="bold-number">{{product_on_shelf}}</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  下架商品
                  <span class="bold-number">{{product_off_shelf}}</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  上架镜框
                  <span class="bold-number">{{frame_on_shelf}}</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  下架镜框
                  <span class="bold-number">{{frame_off_shelf}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>最近一周</span>
        </div>
        <div class="text item">
          <el-col :span="8">
            访问量
          </el-col>
          <el-col :span="8">
            订单统计
          </el-col>
          <el-col :span="8">
            商品统计
          </el-col>
        </div>
      </el-card>
    </el-row>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data(){
    return{
      orderPending: {},

      product_on_shelf: 0,
      product_off_shelf: 0,
      frame_on_shelf: 0,
      frame_off_shelf: 0
    }
  },
  created() {

    //待办预警
    axios.post('http://localhost:8088/order/pending')
      .then(response => {
        this.orderPending = response.data.data
      }).catch(error => {
      console.log(error)
    })

    //商品概览
    axios.post('http://localhost:8088/product/overview')
      .then(response => {
        this.product_on_shelf = response.data.data.onShelf
        this.product_off_shelf = response.data.data.offShelf
      }).catch(error => {
      console.log(error)
    })
    //镜框概览
    axios.post('http://localhost:8088/frame/overview')
      .then(response => {
        this.frame_on_shelf = response.data.data.onShelf
        this.frame_off_shelf = response.data.data.offShelf
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.badge{
  margin-top: 10px;
  margin-right: 40px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
  text-align: left;
}
.bold-number{
  font-size: large;
  font-weight: bold;
}
</style>
