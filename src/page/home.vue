<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">待办预警</span>
          </div>
          <div class="text">
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
            <span class="card-title">今日交易看板</span>
          </div>
          <div class="text">
            <el-col :span="12" class="card-content">
              <div class="transaction-title">付款订单金额</div>
              <div class="transaction-data">¥{{transactionBoard.paymentOrderAmount}}</div>
              <div>昨日全天<span style="color: #409EFF">¥{{transactionBoard.yesterdayOrderAmount}}</span></div>
            </el-col>
            <el-col :span="12" class="card-content">
              <div class="transaction-title">付款订单数量</div>
              <div class="transaction-data">{{transactionBoard.paymentOrderNum}}</div>
              <div>昨日全天<span style="color: #409EFF">{{transactionBoard.yesterdayOrderNum}}</span></div>
            </el-col>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">库存预警</span>
          </div>
          <div class="text">
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
            <span class="card-title">商品概览</span>
          </div>
          <div class="text">
            <el-row>
              <el-col :span="6" class="card-content">
                <div class="transaction-title">上架商品</div>
                <div class="transaction-data">{{product_on_shelf}}</div>
              </el-col>
              <el-col :span="6" class="card-content">
                <div class="transaction-title">下架商品</div>
                <div class="transaction-data">{{product_off_shelf}}</div>
              </el-col>
              <el-col :span="6" class="card-content">
                <div class="transaction-title">上架镜框</div>
                <div class="transaction-data">{{frame_on_shelf}}</div>
              </el-col>
              <el-col :span="6" class="card-content">
                <div class="transaction-title">下架镜框</div>
                <div class="transaction-data">{{frame_off_shelf}}</div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="card-title">最近一周</span>
        </div>
        <div class="text">
          <el-col :span="8">
            访问量
          </el-col>
          <el-col :span="8">
            <div :style="{width: '400px', height: '400px'}" id="order"></div>
          </el-col>
          <el-col :span="8">
            <div :style="{width: '400px', height: '400px'}" id="product"></div>
          </el-col>
        </div>
      </el-card>
    </el-row>

  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts/lib/echarts'
import 'zrender/lib/svg/svg'

export default {
  name: 'home',
  data(){
    return{
      orderPending: {},
      transactionBoard: {},
      product_on_shelf: 0,
      product_off_shelf: 0,
      frame_on_shelf: 0,
      frame_off_shelf: 0,

      statisticsDate: [],
      orderNum: [],
      paymentNum: [],
      paymentAmount: [],
      paymentRate: []
    }
  },
  created() {

    // 待办预警
    axios.post('http://localhost:8088/order/pending')
      .then(response => {
        this.orderPending = response.data.data
      }).catch(error => {
      console.log(error)
    })

    // 今日交易看板
    axios.post('http://localhost:8088/order/transaction')
    .then(response => {
      this.transactionBoard = response.data.data
      this.transactionBoard.paymentOrderAmount = this.transactionBoard.paymentOrderAmount.toFixed(2)
      this.transactionBoard.yesterdayOrderAmount = this.transactionBoard.yesterdayOrderAmount.toFixed(2)
    }).catch(error => {
      console.log(error)
    })

    // 商品概览
    axios.post('http://localhost:8088/product/overview')
      .then(response => {
        this.product_on_shelf = response.data.data.onShelf
        this.product_off_shelf = response.data.data.offShelf
      }).catch(error => {
      console.log(error)
    })

    // 镜框概览
    axios.post('http://localhost:8088/frame/overview')
      .then(response => {
        this.frame_on_shelf = response.data.data.onShelf
        this.frame_off_shelf = response.data.data.offShelf
    }).catch(error => {
      console.log(error)
    })

  },
  mounted() {

    // 订单统计
    axios.post('http://localhost:8088/order/statistics')
      .then(response => {
        for (let i=response.data.data.length-1;i>=0;i--){
          this.statisticsDate.push(response.data.data[i].orderDate)
          this.orderNum.push(response.data.data[i].orderNum)
          this.paymentNum.push(response.data.data[i].paymentOrderNum)
          this.paymentAmount.push(response.data.data[i].paymentOrderAmount)
          this.paymentRate.push(response.data.data[i].paymentRate)
        }
        this.drawLine()
      }).catch(error => {
      console.log(error)
    })


  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let orderChart = echarts.init(document.getElementById('order'))
      let productChart = echarts.init(document.getElementById('product'))

      // 绘制图表
      orderChart.setOption({
        title: { text: '订单统计' },
        tooltip: {},
        xAxis: {
          data: this.statisticsDate
        },
        yAxis: {
          name: '订单量'
        },
        series: [
          {
            name: '订单量',
            type: 'line',
            data: this.orderNum
          },
          {
            name: '付款订单量',
            type: 'line',
            data: this.paymentNum
          }
        ]
      })

      // 绘制图表
      productChart.setOption({
        title: { text: '商品统计' },
        tooltip: {},
        xAxis: {
          data: this.statisticsDate
        },
        yAxis: {
          name: '销售额'
        },
        series: [{
          name: '销售额',
          type: 'line',
          data: this.paymentAmount
        }]
      })

    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.badge{
  margin-top: 10px;
  margin-right: 40px;
}
.card-content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 150px;
}

.transaction-title{
  font-size: 15px;
  font-weight: bold;
  color: #8c939d;
}
.transaction-data{
  font-size: 25px;
  font-weight: bold;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.card-title{
  font-weight: bold;
}
.box-card {
  width: 100%;
  text-align: left;
  min-height: 250px;
}
</style>
