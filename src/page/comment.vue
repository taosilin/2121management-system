<template>
  <div>
    评论管理！！
    <el-table
      :data="commentList"
      border
      style="width: 100%">
      <el-table-column
        prop="commentID"
        label="评论ID">
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
        prop="userID"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="commentTime"
        label="评论时间">
      </el-table-column>
      <el-table-column
        prop="commentContent"
        label="评论内容">
      </el-table-column>
      <el-table-column
        prop="evaluation"
        label="评分">
      </el-table-column>
      <el-table-column
        prop="commentPhoto"
        label="图片">
      </el-table-column>
      <el-table-column
        prop="reply"
        label="回复">
      </el-table-column>
      <el-table-column
        prop="replyTime"
        label="回复时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="commentList[scope.$index].reply==null"
            size="mini"
            @click="handleReply(scope.$index, scope.row)">回复</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-popover
            placement="top"
            width="160"
            v-model="replyVisible">
            <p>回复：</p>
            <el-input v-model="replyInput" placeholder="请输入回复内容"></el-input>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="replyVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleReply">确定</el-button>
            </div>
            <el-button slot="reference" @click="openReply">删除</el-button>
          </el-popover>
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
  name: 'comment',
  data() {
    return {
      currentPage: 0,
      pageSize:20,
      resultNum: 0,
      commentList: [],
      replyVisible: false,
      replyInput: ''
    }
  },
  created() {
    axios.post('http://localhost:8088/comment/all',{
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response=>{
        this.commentList = response.data.data
        this.resultNum = response.data.data.length
      })
      .catch(function (error) {       //发生错误
        console.log(error)
      })
  },
  methods: {

    handleReply(index, row) {
      console.log(index, row)
      this.replyVisible = false

    },

    openReply(){
      this.replyVisible = true
    },

    handleDelete(index, row) {
      console.log(index, row)
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      axios.post('http://localhost:8088/comment/all',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response=>{
          this.commentList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(function (error) {       //发生错误
          console.log(error)
        })
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://localhost:8088/comment/all',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response=>{
          this.commentList = response.data.data
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

</style>
