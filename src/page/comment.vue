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

      <el-table-column label="是否显示">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <el-switch
                v-model="commentList[scope.$index].state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="0"
                inactive-value="1"
                @change="onChangeState(scope.$index)">
              </el-switch>
            </el-tooltip>
          </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="commentList[scope.$index].reply==null"
            size="mini"
            @click="openReply(scope.$index, scope.row)">回复</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

    <el-dialog title="回复" :visible.sync="replyVisible">
      <el-input v-model="replyInput" placeholder="请输入回复内容" type="textarea" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replyVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleReply">确 定</el-button>
      </div>
    </el-dialog>

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
      replyInput: '',
      replyID: ''
    }
  },
  created() {
    axios.post('http://localhost:8088/comment/all',{
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response => {
        this.commentList = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
    axios.post('http://localhost:8088/comment/total')
    .then(response => {
      this.resultNum = response.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    handleReply() {
      axios.post('http://localhost:8088/comment/reply',{
        commentID: this.replyID,
        reply: this.replyInput,
        replyTime: new Date()
      }).then(response => {
        if (response.data.code === 200){
          location.reload()
          this.$message({
            type: 'success',
            message: '回复成功!'
          })
        }
      }).catch(error => {
        console.log(error)
        this.$message({
          showClose: true,
          message: '回复失败，请联系管理员',
          type: 'error'
        })
      })

      this.replyVisible = false
      this.replyID = ''
    },

    openReply(index, row){
      this.replyVisible = true
      this.replyID = this.commentList[index].commentID
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
        .then(response => {
          this.commentList = response.data.data
        })
        .catch(error => {
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
        .then(response => {
          this.commentList = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 修改评论状态
    onChangeState(index) {
      axios.post('http://localhost:8088/comment/update',{
        commentID: this.commentList[index].commentID,
        state: this.commentList[index].state
      }).then(response => {
        if (response.data.code === 200){
          location.reload()
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }

  }
}
</script>

<style scoped>

</style>
