<template>
  <div>
    管理员管理

    <el-button type="primary" icon="el-icon-plus" @click="openAddAdmin">添加管理员</el-button>
    <el-table
      :data="adminList"
      border
      style="width: 100%">

      <el-table-column
        prop="adminID"
        label="管理员ID">
      </el-table-column>

      <el-table-column
        prop="adminName"
        label="管理员名称">
      </el-table-column>

      <el-table-column
        prop="authority"
        label="管理员权限">
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

    <!--添加管理员对话框-->
    <el-dialog class="addAdmin" title="添加管理员" :visible.sync="addAdminVisible">
      <el-form
        :model="newAdmin"
        label-width="100px">

        <el-form-item label="管理员ID" >
          <el-input v-model="newAdmin.adminID"></el-input>
        </el-form-item>

        <el-form-item label="密码" >
          <el-input v-model="newAdmin.password"></el-input>
        </el-form-item>

        <el-form-item label="管理员名称" >
          <el-input v-model="newAdmin.adminName"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddAdmin">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'administrator',
  data() {
    return {
      currentPage: 0,
      pageSize: 20,
      resultNum: 0,
      adminList: [],

      newAdmin: {},
      addAdminVisible: false
    }
  },
  created() {
    axios.post('http://localhost:8088/admin/list',{
      page: this.currentPage,
      size: this.pageSize
    }).then(response => {
      this.adminList = response.data.data
      this.resultNum = response.data.data.length
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    // 打开添加管理员对话框
    openAddAdmin() {
      this.newAdmin = {}
      this.addAdminVisible = true
    },

    // 添加管理员
    handleAddAdmin() {
      axios.post('http://localhost:8088/admin/add',{
        adminID: this.newAdmin.adminID,
        password: this.newAdmin.password,
        adminName: this.newAdmin.adminName
      }).then(response => {
        if (response.data.code === 200){
          this.$message({
            showClose: true,
            message: '添加管理员成功！',
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

        this.addAdminVisible = false
        this.newAdmin = {}

      }).catch(error => {
        console.log(error)
        this.addAdminVisible = false
        this.newAdmin = {}
      })
    },

    // 删除管理员
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8088/admin/delete',{
          adminID : this.adminList[index].adminID
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

    // 更改每页显示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      axios.post('http://localhost:8088/admin/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.adminList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(error => {       //发生错误
          console.log(error)
        });
    },

    // 更改页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://localhost:8088/admin/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.adminList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(error => {       //发生错误
          console.log(error)
        });
    }

  }
}
</script>

<style scoped>
.addAdmin{
  text-align: left;
}
</style>
