<template>
  <div>
    优惠券管理！！
    <el-button type="primary" icon="el-icon-plus" @click="openAddCoupon">添加优惠券</el-button>
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
        prop="productType"
        label="可使用的类别">
      </el-table-column>

      <el-table-column
        prop="timeLimit"
        label="优惠券时限(天)">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
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

    <el-dialog class="addCoupon" title="添加优惠券" :visible.sync="addCouponVisible">
      <el-form
        :model="newCoupon"
        label-width="100px">

        <el-form-item label="优惠券ID" >
          <el-input v-model="newCoupon.couponID"></el-input>
        </el-form-item>

        <el-form-item label="优惠券名称" >
          <el-input v-model="newCoupon.couponName"></el-input>
        </el-form-item>

        <el-form-item label="优惠金额" >
          <el-col :span="1">满</el-col>
          <el-col :span="6">
            <el-input v-model="newCoupon.restriction">
              <el-button slot="prepend">$</el-button>
            </el-input>
          </el-col>
          <el-col :span="1">减</el-col>
          <el-col :span="6">
            <el-input v-model="newCoupon.discount">
              <el-button slot="prepend">$</el-button>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="说明">
          <el-input type="textarea" v-model="newCoupon.description"></el-input>
        </el-form-item>

        <el-form-item label="可使用的类别">
          <el-select
            v-model="newCoupon.productType"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择商品类别">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="优惠券时限" >
          <el-input v-model="newCoupon.timeLimit">
            <el-button slot="append">天</el-button>
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCouponVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddCoupon">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'coupon',
  data() {
    return {
      currentPage: 0,
      pageSize:20,
      resultNum: 0,
      couponList: [],
      addCouponVisible: false,
      newCoupon:{
        couponID: '',
        couponName: '',
        restriction: 0.00,
        discount: 0.00,
        description: '',
        productType: [],
        timeLimit: 0
      },
      types: [{
        value: '眼镜',
        label: '眼镜'
      }, {
        value: '隐形眼镜',
        label: '隐形眼镜'
      }, {
        value: 'All',
        label: 'All'
      }]
    }
  },
  created() {
    axios.post('http://129.211.168.202:8088/coupon/list',{
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response => {
        this.couponList = response.data.data
      })
      .catch(error => {       //发生错误
        console.log(error)
      })

    axios.post('http://129.211.168.202:8088/coupon/total')
    .then(response => {
      this.resultNum = response.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    // 删除优惠券
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该优惠券, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://129.211.168.202:8088/coupon/delete',{
           couponID: this.couponList[index].couponID
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        location.reload()
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
      axios.post('http://129.211.168.202:8088/coupon/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response=>{
          this.couponList = response.data.data
        })
        .catch(function (error) {       //发生错误
          console.log(error)
        })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://129.211.168.202:8088/coupon/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.couponList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        })
    },

    openAddCoupon() {
      this.newCoupon = {}
      this.addCouponVisible = true
    },

    handleAddCoupon(){
      console.log(this.newCoupon)
      axios.post('http://129.211.168.202:8088/coupon/add',{
        couponID: this.newCoupon.couponID,
        couponName: this.newCoupon.couponName,
        restriction: this.newCoupon.restriction,
        discount: this.newCoupon.discount,
        description: this.newCoupon.description,
        productType: this.newCoupon.productType.toString(),
        timeLimit: this.newCoupon.timeLimit
      }).then(response => {
        console.log(response.data)
        if (response.data.code === 200) {
          this.$message({
            showClose: true,
            message: '添加优惠券成功！',
            type: 'success'
          })
          location.reload()
        }
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '添加失败，请联系管理员',
          type: 'error'
        })
      })
      this.addCouponVisible = false
      this.newCoupon = {}
    }
  }
}
</script>

<style scoped>
.addCoupon{
  text-align: left;
}
</style>
