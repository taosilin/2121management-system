<template>
  <div>
    商品管理！！
    <el-button type="primary" icon="el-icon-plus" @click="handleAddProduct">添加商品</el-button>
    <el-table
      :data="productList"
      border
      style="width: 100%">

      <el-table-column
        prop="productID"
        label="商品ID">
      </el-table-column>

      <el-table-column
        prop="productName"
        label="商品名称">
      </el-table-column>

      <el-table-column
        prop="sketch"
        label="简述">
      </el-table-column>

      <el-table-column label="封面图片">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="productList[scope.$index].coverImage"
            fit="contain"></el-image>
        </template>
      </el-table-column>

      <el-table-column
        prop="imageList"
        label="商品图片">
      </el-table-column>

      <el-table-column
        prop="description"
        label="商品详情">
      </el-table-column>

      <el-table-column
        prop="classification"
        label="分类">
      </el-table-column>

      <el-table-column
        prop="tab"
        label="标签">
      </el-table-column>

      <el-table-column
        prop="keyword"
        label="关键词">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="productList[scope.$index].state === '0'" effect="dark">待上架</el-tag>
          <el-tag v-else-if="productList[scope.$index].state === '1'" effect="dark" type="success">已上架</el-tag>
          <el-tag v-else effect="dark" type="info">已下架</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleDetail(scope.$index, scope.row)">商品详情</el-button>
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
  name: 'product',
  data () {
    return {
      currentPage: 0,
      pageSize: 20,
      resultNum: 0,
      productList: []
    }
  },
  created () {
    axios.post('http://localhost:8088/product/list', {
      page: this.currentPage,
      size: this.pageSize
    })
      .then(response => {
        this.productList = response.data.data
        this.resultNum = response.data.data.length
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {

    // 跳转到编辑商品页面
    handleEdit(index, row) {
      this.$router.push({
        path:'/editProduct',
        query:{
          productID:this.productList[index].productID
        }
      })
    },
    handleDetail(index, row) {
      this.$router.push({
        path:'/productDetail',
        query:{
          productID:this.productList[index].productID
        }
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleAddProduct(){
      this.$router.push('/addProduct')
    }
  }
}
</script>

<style scoped>

</style>
