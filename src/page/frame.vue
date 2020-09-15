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
      <el-table-column
        prop="state"
        label="状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
  name: "frame",
  data() {
    return {
      currentPage: 0,
      pageSize:20,
      resultNum: 0,
      frameList: []
    }
  },
  created() {
    axios.post('http://localhost:8088/frame/list',{
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response=>{
        this.frameList = response.data.data;
        this.resultNum = response.data.data.length;
      })
      .catch(function (error) {       //发生错误
      console.log(error);
      });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleAddFrame(){
      this.$router.push('/addFrame')
    }
  }
}
</script>

<style scoped>

</style>
