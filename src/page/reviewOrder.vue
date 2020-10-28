<template>
  <div>
    审单管理
    <el-table
      :data="orderList"
      border
      style="width: 100%">
      <el-table-column
        prop="orderID"
        label="订单ID">
      </el-table-column>
      <el-table-column
        prop="userID"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="addressID"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="couponID"
        label="优惠券">
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="actualPayment"
        label="实际付款">
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="下单时间">
      </el-table-column>
      <el-table-column
        prop="paymentTime"
        label="支付时间">
      </el-table-column>
      <el-table-column
        prop="receiptTime"
        label="收货时间">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="orderList[scope.$index].state === '1'" type="warning">待付款</el-tag>
          <el-tag v-else-if="orderList[scope.$index].state === '2'">已付款</el-tag>
          <el-tag v-else-if="orderList[scope.$index].state === '3'">已确认</el-tag>
          <el-tag v-else-if="orderList[scope.$index].state === '4'"type="success">交易成功</el-tag>
          <el-tag v-else-if="orderList[scope.$index].state === '5'"type="success">已完成</el-tag>
          <el-tag v-else effect="dark" type="danger">已取消</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="订单备注">
      </el-table-column>
      <el-table-column
        prop="courierID"
        label="快递单号">
      </el-table-column>
      <el-table-column
        prop="deliveryMethod"
        label="配送方式">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="resultNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'reviewOrder',
  data() {
    return {
      currentPage: 0,
      pageSize:20,
      resultNum: 0,
      orderList: [],
      newOrder: {},
      updateOrderVisible: false
    }
  },
  created() {
    axios.post('http://localhost:8088/order/list',{
      sortedBy: '2',
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response => {
        this.orderList = response.data.data
      })
      .catch(error => {       // 发生错误
        console.log(error)
      })
    axios.post('http://localhost:8088/order/state',{
      state: '2'
    }).then(response => {
      this.resultNum = response.data
    }).catch(error => {
      console.log(error)
    })

  },
  methods: {

    // 订单详情
    handleDetail(index, row) {
      console.log(index, row)
      this.$router.push({
        path:'/orderDetail',
        query:{
          orderID:this.orderList[index].orderID
        }
      })
      location.reload()
    },

    // 更改每页显示数据条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      axios.post('http://localhost:8088/order/list',{
        sortedBy: '2',
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.orderList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        })
    },

    // 更改当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://localhost:8088/order/list',{
        sortedBy: '2',
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.orderList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
