<template>
  <div>
    优惠券管理！！
    <el-button type="primary" icon="el-icon-plus" @click="handleAddCoupon">添加优惠券</el-button>
    <el-table
      :data="couponList"
      border
      style="width: 100%">
      <el-table-column
        prop="couponID"
        label="优惠券ID">
      </el-table-column>
      <el-table-column
        prop="couponName"
        label="优惠券名称">
      </el-table-column>
      <el-table-column
        prop="restriction"
        label="使用限制">
      </el-table-column>
      <el-table-column
        prop="discount"
        label="优惠金额">
      </el-table-column>
      <el-table-column
        prop="description"
        label="优惠券描述">
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
import axios from "axios";

export default {
  name: "coupon",
  data() {
    return {
      currentPage: 0,
      pageSize:20,
      resultNum: 0,
      couponList: []
    }
  },
  created() {
    axios.post('http://localhost:8088/coupon/list',{
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response=>{
        this.couponList = response.data.data;
        this.resultNum = response.data.data.length;
      })
      .catch(function (error) {       //发生错误
        console.log(error);
      });
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
