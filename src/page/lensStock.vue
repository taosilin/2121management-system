<template>
  <div>镜片库存
    <el-table
      :data="lensList"
      border
      style="width: 100%">

      <el-table-column
        prop="lensID"
        label="镜片ID">
      </el-table-column>

      <el-table-column
        prop="lensName"
        label="镜片名称">
      </el-table-column>

      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>

      <el-table-column
        prop="refractiveIndex"
        label="折射率">
      </el-table-column>

      <el-table-column
        prop="material"
        label="材质">
      </el-table-column>

      <el-table-column
        prop="radian"
        label="弧度">
      </el-table-column>

      <el-table-column
        prop="variety"
        label="品种">
      </el-table-column>

      <el-table-column
        prop="film"
        label="膜层">
      </el-table-column>

      <el-table-column
        prop="design"
        label="设计">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="lensList[scope.$index].state === '0'" effect="dark">上架中</el-tag>
          <el-tag v-else effect="dark" type="info">已下架</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleDetail(scope.$index, scope.row)">库存盘点</el-button>
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
  name: 'lensStock',
  data() {
    return {
      currentPage: 0,
      pageSize: 20,
      resultNum: 0,
      lensList: []
    }
  },

  created() {
    axios.post('http://129.211.168.202:8088/lens/list',{
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response=>{
        this.lensList = response.data.data
        this.resultNum = response.data.data.length
      })
      .catch(function (error) {       //发生错误
        console.log(error)
      })
  },

  methods: {

    // 库存盘点
    handleDetail(index, row){
      console.log(index, row)
      this.$router.push({
        path:'/stockDetail',
        query:{
          lensID:this.lensList[index].lensID
        }
      })
      location.reload()
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      axios.post('http://129.211.168.202:8088/lens/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response=>{
          this.lensList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(function (error) {       //发生错误
          console.log(error)
        });
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://129.211.168.202:8088/lens/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response=>{
          this.lensList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(function (error) {       //发生错误
          console.log(error)
        });
    }
  }
}
</script>

<style scoped>

</style>
