<template>
  <div>
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
      <el-table-column
        prop="state"
        label="状态">
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

    <el-dialog class="updateOrder" title="编辑订单" :visible.sync="updateOrderVisible">
      <el-form
        :model="newOrder"
        label-width="100px">

        <el-form-item label="订单编号" >
          <el-input v-model="newOrder.orderID"
                    :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="改价格" >
          <el-input v-model="newOrder.totalAmount">
            <el-button slot="prepend">$</el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="修改订单状态">
          <el-radio-group v-model="newOrder.state" size="medium">
            <el-radio-button label="0">待付款</el-radio-button>
            <el-radio-button label="1">待收货</el-radio-button>
            <el-radio-button label="2">待评价</el-radio-button>
            <el-radio-button label="3">已完成</el-radio-button>
            <el-radio-button label="4">退货</el-radio-button>
            <el-radio-button label="5">已取消</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="改备注">
          <el-input type="textarea" v-model="newOrder.remark"></el-input>
        </el-form-item>

        <el-form-item label="填写快递单号" >
          <el-input v-model="newOrder.courierID">
          </el-input>
        </el-form-item>
        <el-form-item label="配送方式" >
          <el-input v-model="newOrder.deliveryMethod">
          </el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="updateOrderVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateOrder">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'order',
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
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response => {
        this.orderList = response.data.data
        this.resultNum = response.data.data.length
      })
      .catch(error => {       //发生错误
        console.log(error)
      })
  },
  methods: {
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
    handleEdit(index, row) {
      this.newOrder = this.orderList[index]
      this.updateOrderVisible = true
    },

    handleUpdateOrder(){
      axios.post('http://localhost:8088/order/update',{
        orderID: this.newOrder.orderID,
        totalAmount: this.newOrder.totalAmount,
        state: this.newOrder.state,
        remark: this.newOrder.remark,
        courierID: this.newOrder.courierID,
        deliveryMethod: this.newOrder.deliveryMethod
      }).then(response => {
        if (response.data.code === 200){
          location.reload()
          this.$message({
            showClose: true,
            message: '编辑成功！',
            type: 'success'
          })
        }
        else{
          this.$message({
            showClose: true,
            message: '编辑失败，请联系管理员',
            type: 'error'
          })
        }

      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      axios.post('http://localhost:8088/order/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response=>{
          this.orderList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(function (error) {       //发生错误
          console.log(error)
        })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://localhost:8088/order/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response=>{
          this.orderList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(function (error) {       //发生错误
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.updateOrder{
  text-align: left;
}
</style>
