<template>
  <div>
    退款管理

    <el-table
      :data="refundList"
      border
      style="width: 100%">

      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>

      <el-table-column
        prop="refundID"
        label="退款ID">
      </el-table-column>

      <el-table-column
        prop="orderID"
        label="订单ID">
      </el-table-column>

      <el-table-column
        prop="productID"
        label="商品ID">
      </el-table-column>

      <el-table-column
        prop="specID"
        label="规格ID">
      </el-table-column>

      <el-table-column
        prop="applicant"
        label="申请人员">
      </el-table-column>

      <el-table-column
        prop="amount"
        label="退款金额">
      </el-table-column>

      <el-table-column
        prop="reason"
        label="退款原因">
      </el-table-column>

      <el-table-column
        prop="description"
        label="说明">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="refundList[scope.$index].state === '0'" effect="dark">退款中</el-tag>
          <el-tag v-else-if="refundList[scope.$index].state === '1'" effect="dark" type="success">退款成功</el-tag>
          <el-tag v-else-if="refundList[scope.$index].state === '2'" effect="dark" type="info">未退款</el-tag>
          <el-tag v-else effect="dark" type="info">退款关闭</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="退款类型">
        <template slot-scope="scope">
          <el-tag v-if="refundList[scope.$index].type === '0'" effect="dark">仅退款</el-tag>
          <el-tag v-else-if="refundList[scope.$index].type === '1'" effect="dark" type="success">退货退款</el-tag>
          <el-tag v-else effect="dark" type="info">换货</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
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
  name: 'refund',
  data() {
    return{
      currentPage: 0,
      pageSize: 20,
      resultNum: 0,
      refundList: [],
    }
  },
  created() {
    axios.post('https://from2121.com:8443/refund/list',{
      page:this.currentPage,
      size:this.pageSize
    }).then(response => {
      this.refundList = response.data.data
    }).catch(error => {       //发生错误
      console.log(error)
    })
    axios.post('https://from2121.com:8443/refund/total')
    .then(response => {
      this.resultNum = response.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    // 查看退款详情
    handleDetail(index, row){
      console.log(index, row)
      this.$router.push({
        path:'/orderDetail',
        query:{
          orderID: this.refundList[index].orderID
        }
      })
      location.reload()
    },

    // 更改每页显示数据条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      axios.post('https://from2121.com:8443/refund/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.refundList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        });
    },

    // 更改当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('https://from2121.com:8443/refund/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.refundList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        });
    }

  }
}
</script>

<style scoped>

</style>
