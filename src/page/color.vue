<template>
  <div>
    镜框颜色
    <el-button type="primary" icon="el-icon-plus" @click="openAddColor">添加颜色</el-button>
    <el-table
      :data="colorList"
      border
      style="width: 100%">

      <el-table-column
        prop="colorID"
        label="颜色ID">
      </el-table-column>

      <el-table-column
        prop="colorName"
        label="颜色名称">
      </el-table-column>

      <el-table-column
        prop="colorImage"
        label="预览">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openEditColor(scope.$index, scope.row)">编辑</el-button>
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

    <!--添加颜色对话框-->
    <el-dialog class="addColor" title="添加颜色" :visible.sync="addColorVisible">
      <el-form
        :model="newColor"
        label-width="100px">

        <el-form-item label="颜色名称" >
          <el-input v-model="newColor.colorName"></el-input>
        </el-form-item>

        <el-form-item label="预览图片" >
          <el-upload
            action="http://localhost:8088/uploadimg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            :headers="headerObj"
            :on-success="handleSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addColorVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddColor">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑颜色对话框-->
    <el-dialog class="editColor" title="编辑颜色" :visible.sync="editColorVisible">
      <el-form
        :model="newColor"
        label-width="100px">

        <el-form-item label="颜色名称" >
          <el-input v-model="newColor.colorName"></el-input>
        </el-form-item>

        <el-form-item label="预览图片" >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="newColor.colorImage" :src="newColor.colorImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editColorVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditColor">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'color',
  data() {
    return {
      currentPage: 0,
      pageSize: 20,
      resultNum: 0,
      colorList: [],
      newColor: {},
      addColorVisible: false,
      editColorVisible: false,
      //图片上传组件的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      imgUrl:''
    }
  },
  created() {
    axios.post('http://localhost:8088/color/list',{
      page:this.currentPage,
      size:this.pageSize
    }).then(response => {
      this.colorList = response.data.data
      this.resultNum = response.data.data.length
    }).catch(error => {       //发生错误
      console.log(error)
    })
  },
  methods: {

    //处理图片预览效果
    handlePreview(file) {
      console.log(file);
    },
    //处理移除图片操作
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //监听图片上传成功事件
    handleSuccess(response){
      console.log(response)
    },

    //打开添加颜色对话框
    openAddColor() {
      this.newColor = {}
      this.addColorVisible = true
    },
    //添加颜色
    handleAddColor(){
      axios.post('http://localhost:8088/color/add',{
        colorName: this.newColor.colorName,
        colorImage: this.newColor.colorImage
      }).then(response => {
        if (response.data.code==200){
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
      this.addColorVisible = false
      this.newColor = {}
    },

    //打开编辑颜色对话框
    openEditColor(index, row) {
      this.newColor = this.colorList[index]
      this.editColorVisible = true
    },
    //编辑颜色
    handleEditColor(){
      axios.post('http://localhost:8088/color/update',{
        colorID: this.newColor.colorID,
        colorName: this.newColor.colorName,
        colorImage: this.newColor.colorImage
      }).then(response => {
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
            message: '编辑失败，请联系管理员',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
      })
      this.editColorVisible = false
      this.newColor = {}
    },

    //删除颜色
    handleDelete(index, row){
      this.$confirm('此操作将永久删除该颜色, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8088/color/delete',{
          colorID : this.colorList[index].colorID
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

    //更改每页显示数据条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      axios.post('http://localhost:8088/color/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.colorList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(error => {       //发生错误
          console.log(error)
        });
    },

    //更改当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://localhost:8088/color/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.colorList = response.data.data
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
.addColor {
  text-align: left;
}
.editColor {
  text-align: left;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
