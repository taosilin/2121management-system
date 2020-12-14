<template>
  <div>
    <div class="header">
      <el-row class="title">镜片 <span style="color: #72c9fa">{{lensDetail.lensID}}</span> 光度表</el-row>
      <el-row>{{lensDetail.refractiveIndex}} {{lensDetail.material}} {{lensDetail.radian}} {{lensDetail.variety}} {{lensDetail.film}} {{lensDetail.design}}</el-row>
    </div>
    <div>
<!--      <el-table style="width: 100%">-->
<!--        <el-table-column-->
<!--          label="SPH"-->
<!--          type="index"-->
<!--          :index="sphMethod"-->
<!--          width="80">-->
<!--        </el-table-column>-->
<!--        <el-table-column label="CYL">-->
<!--          <el-table-column label="0">-->
<!--          </el-table-column>-->
<!--          <el-table-column label="-25"></el-table-column>-->
<!--          <el-table-column label="-50"></el-table-column>-->
<!--          <el-table-column label="-75"></el-table-column>-->
<!--          <el-table-column label="-100"></el-table-column>-->
<!--          <el-table-column label="-125"></el-table-column>-->
<!--          <el-table-column label="-150"></el-table-column>-->
<!--          <el-table-column label="-175"></el-table-column>-->
<!--          <el-table-column label="-200"></el-table-column>-->
<!--          <el-table-column label="-225"></el-table-column>-->
<!--          <el-table-column label="-250"></el-table-column>-->
<!--          <el-table-column label="-275"></el-table-column>-->
<!--          <el-table-column label="-300"></el-table-column>-->
<!--          <el-table-column label="-325"></el-table-column>-->
<!--          <el-table-column label="-350"></el-table-column>-->
<!--          <el-table-column label="-375"></el-table-column>-->
<!--          <el-table-column label="-400"></el-table-column>-->
<!--          <el-table-column label="-425"></el-table-column>-->
<!--          <el-table-column label="-450"></el-table-column>-->
<!--          <el-table-column label="-475"></el-table-column>-->
<!--          <el-table-column label="-500"></el-table-column>-->
<!--          <el-table-column label="-525"></el-table-column>-->
<!--          <el-table-column label="-550"></el-table-column>-->
<!--          <el-table-column label="-570"></el-table-column>-->
<!--          <el-table-column label="-600"></el-table-column>-->
<!--        </el-table-column>-->
<!--      </el-table>-->

      <el-button type="primary" icon="el-icon-plus" @click="openAddStock">添加镜片库存</el-button>
      <el-table
        :data="stockList"
        border
        style="width: 100%">

        <el-table-column
          prop="stockID"
          label="镜片库存ID">
        </el-table-column>

        <el-table-column
          prop="sph"
          label="SPH">
        </el-table-column>

        <el-table-column
          prop="cyl"
          label="CYL">
        </el-table-column>

        <el-table-column
          prop="stock"
          label="库存">
        </el-table-column>

        <el-table-column
          prop="warning"
          label="预警数量">
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

      <!--添加镜片库存对话框-->
      <el-dialog class="addStock" title="添加镜片库存" :visible.sync="addStockVisible">
        <el-form
          :model="newStock"
          label-width="100px">
          <el-form-item label="SPH">
            <el-slider
              v-model="newStock.sph"
              :min="-1200"
              :max="1200"
              :step="25">
            </el-slider>
          </el-form-item>
          <el-form-item label="CYL">
            <el-slider
              v-model="newStock.cyl"
              :min="-200"
              :max="0"
              :step="25">
            </el-slider>
          </el-form-item>

          <el-form-item label="库存数量">
            <el-input v-model="newStock.stock"></el-input>
          </el-form-item>

          <el-form-item label="预警数量">
            <el-input v-model="newStock.warning"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addStockVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddStock">确 定</el-button>
        </div>
      </el-dialog>

      <!--编辑镜片库存对话框-->
      <el-dialog class="updateStock" title="编辑镜片库存" :visible.sync="updateStockVisible">
        <el-form
          :model="newStock"
          label-width="100px">

          <el-form-item label="SPH" >
            <el-input v-model="newStock.sph" disabled></el-input>
          </el-form-item>

          <el-form-item label="CYL" >
            <el-input v-model="newStock.cyl" disabled></el-input>
          </el-form-item>

          <el-form-item label="库存数量" >
            <el-input v-model="newStock.stock"></el-input>
          </el-form-item>

          <el-form-item label="预警数量" >
            <el-input v-model="newStock.warning"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateStockVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleUpdateStock">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'stockDetail',
  data() {
    return {
      lensID: '',
      lensDetail: {},
      stockList: [],
      currentPage: 0,
      pageSize: 20,
      resultNum: 0,
      addStockVisible: false,
      updateStockVisible: false,
      newStock: {}
    }
  },
  created() {
    // 取到路由带过来的参数
    this.lensID = this.$route.query.lensID
    // 镜片详情
    axios.post('https://from2121:8443/lens/detail',{
      lensID: this.lensID
    }).then(response => {
      this.lensDetail = response.data.data
    }).catch(error => {
      console.log(error)
    })
    // 镜片库存列表
    axios.post('https://from2121:8443/lensstock/list',{
      userID: this.lensID,
      page: this.currentPage,
      size: this.pageSize
    }).then(response => {
      this.stockList = response.data.data
    }).catch(error => {
      console.log(error)
    })
    // 镜片库存总数
    axios.post('https://from2121:8443/lensstock/total',{
      lensID: this.lensID
    }).then(response => {
      this.resultNum = response.data
    }).catch(error => {
      console.log(error)
    })

    // axios.post('https://from2121:8443/lens/cyl',{
    //   lensID: lensID
    // }).then(response => {
    //   this.lensStock = response.data.data
    //
    // }).catch(error => {
    //   console.log(error)
    // })
  },
  methods: {
    //sph
    // sphMethod(index){
    //   return 1200-index*25
    // }

    // 打开添加库存对话框
    openAddStock() {
      this.newStock = {
        sph: 0,
        cyl: 0
      }
      this.addStockVisible = true
    },

    // 添加镜片库存
    handleAddStock() {
      let stockID = this.lensID + '_' + this.newStock.sph.toString() + '_' + this.newStock.cyl.toString()

      axios.post('https://from2121:8443/lensstock/add', {
        stockID: stockID,
        lensID: this.lensID,
        sph: this.newStock.sph/100,
        cyl: this.newStock.cyl/100,
        stock: this.newStock.stock,
        warning: this.newStock.warning
      })
        .then(response => {
          if (response.data.code === 200){
            this.$message({
              showClose: true,
              message: '添加成功！',
              type: 'success'
            })
            location.reload()
          }
          else{
            this.$message({
              showClose: true,
              message: '添加失败，请联系管理员',
              type: 'error'
            })
          }

        }).catch(error => {
        console.log(error)
      })
      this.addLensVisible = false
    },

    // 打开编辑镜片库存对话框
    handleEdit(index, row){
      this.newStock = this.stockList[index]
      this.updateStockVisible = true
    },

    // 保存编辑
    handleUpdateStock(){
      axios.post('https://from2121:8443/lensstock/update', {
        stockID: this.newStock.stockID,
        stock: this.newStock.stock,
        warning: this.newStock.warning
      })
        .then(response => {
          if (response.data.code === 200){
            this.$message({
              showClose: true,
              message: '编辑成功！',
              type: 'success'
            })
            location.reload()
          }
          else{
            this.$message({
              showClose: true,
              message: '保存失败，请联系管理员',
              type: 'error'
            })
          }

        }).catch(error => {
        console.log(error)
      })
      this.updateStockVisible = false
    },

    // 删除镜片库存
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该镜片库存, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('https://from2121:8443/lensstock/delete',{
          stockID : this.stockList[index].stockID
        }).then(response => {
          if (response.data.code === 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            location.reload()
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
      axios.post('https://from2121:8443/lensstock/list',{
        userID: this.lensID,
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.stockList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        });
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('https://from2121:8443/lensstock/list',{
        userID: this.lensID,
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.stockList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        });
    }

  }
}
</script>

<style scoped>
.header{
  width: 100%;
  text-align: left;
  font-size: 20px;
}
.title{
  font-weight: bold;
}
.addStock {
  text-align: left;
}
.updateStock {
  text-align: left;
}
</style>
