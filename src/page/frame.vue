<template>
  <div>
    镜框管理！！
    <el-button type="primary" icon="el-icon-plus" @click="handleAddFrame">添加镜框</el-button>
    <el-table
      :data="frameList"
      border
      style="width: 100%">
      <el-table-column
        prop="frameID"
        label="镜框ID">
      </el-table-column>
      <el-table-column
        prop="frameName"
        label="镜框名称">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="material"
        label="材质">
      </el-table-column>
      <el-table-column
        prop="shape"
        label="外观形状">
      </el-table-column>
      <el-table-column
        prop="nosePad"
        label="鼻托类型">
      </el-table-column>
      <el-table-column
        prop="dimension"
        label="镜架维度">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="frameList[scope.$index].state === '0'" effect="dark">待上架</el-tag>
          <el-tag v-else-if="frameList[scope.$index].state === '1'" effect="dark" type="success">已上架</el-tag>
          <el-tag v-else effect="dark" type="info">已下架</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑信息</el-button>
          <el-button
            size="mini"
            @click="handleManage(scope.$index, scope.row)">管理</el-button>
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'frame',
  data() {
    return {
      currentPage: 0,
      pageSize:20,
      resultNum: 0,
      frameList: []
    }
  },
  created() {
    axios.post('http://129.211.168.202:8088/frame/list',{
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response => {
        this.frameList = response.data.data
      })
      .catch(error => {       //发生错误
      console.log(error)
      })
    axios.post('http://129.211.168.202:8088/frame/total')
    .then(response => {
      this.resultNum = response.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    // 跳转到编辑镜框页面
    handleEdit(index, row) {
      this.$router.push({
        path:'/editFrame',
        query:{
          frameID:this.frameList[index].frameID
        }
      })
      location.reload()
    },

    // 跳转到管理镜框页面
    handleManage(index, row){
      this.$router.push({
        path:'/manageFrame',
        query:{
          frameID:this.frameList[index].frameID
        }
      })
      location.reload()
    },

    // 删除镜框
    handleDelete(index, row) {

      this.$confirm('此操作将永久删除该镜框, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://129.211.168.202:8088/frame/delete',{
          frameID: this.frameList[index].frameID
        }).then(response => {
          if (response.data.code === 200){
            location.reload()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        }).catch(error => {

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      axios.post('http://129.211.168.202:8088/frame/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.frameList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://129.211.168.202:8088/frame/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.frameList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        })
    },
    handleAddFrame(){
      this.$router.push('/addFrame')
    }
  }
}
</script>

<style scoped>

</style>
