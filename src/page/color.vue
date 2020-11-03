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

      <el-table-column label="预览">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="colorList[scope.$index].colorImage"
            fit="contain"></el-image>
        </template>
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
        :rules="rules"
        :model="newColor"
        ref="addColor"
        label-position="left"
        label-width="100px">

        <el-form-item label="颜色名称" prop="colorName">
          <el-input v-model="newColor.colorName"></el-input>
        </el-form-item>

        <el-form-item label="预览图片">
          <el-upload
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :http-request="handleUploadImage"
            list-type="picture"
            :headers="headerObj"
            :on-success="handleSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addColorVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddColor('addColor')">确 定</el-button>
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
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :http-request="handleUploadImage"
            list-type="picture"
            :headers="headerObj"
            :on-success="handleSuccess">
            <el-button size="small" type="primary">重新上传</el-button>
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

      // 表单填写规则
      rules: {
        colorName: [
          { required: true, message: '请输入颜色名称', trigger: 'blur' },
          { min: 1, max: 45, message: '长度不超过 45 个字符', trigger: 'blur' }
        ]
      },

      //图片上传组件的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      imgUrl:''
    }
  },
  created() {
    axios.post('http://129.211.168.202:8088/color/list',{
      page:this.currentPage,
      size:this.pageSize
    }).then(response => {
      this.colorList = response.data.data
    }).catch(error => {
      console.log(error)
    })
    axios.post('http://129.211.168.202:8088/color/total')
    .then(response => {
      this.resultNum = response.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    // 处理图片预览效果
    handlePreview(file) {
      console.log(file,"preview");
    },
    // 处理移除图片操作
    handleRemove(file, fileList) {
      console.log(file, fileList,"remove");
    },
    // 监听图片上传成功事件
    handleSuccess(response){
      console.log(response,"success")
    },

    // 上传图片
    handleUploadImage(param) {
      const formData = new FormData()
      formData.append('imageFile', param.file)

      axios.post('http://129.211.168.202:8088/color/uploadImage',formData)
      .then(response => {
        console.log('上传图片成功')
        console.log(response)
        param.onSuccess()  // 上传成功的图片会显示绿色的对勾
        this.newColor.colorImage = response.data
        // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
      }).catch(error => {
        console.log('图片上传失败')
        param.onError()
      })
    },

    // 打开添加颜色对话框
    openAddColor() {
      this.newColor = {}
      this.addColorVisible = true
    },
    // 添加颜色
    handleAddColor(formName){
      console.log("???")
      console.log(this.newColor.colorImage)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://129.211.168.202:8088/color/add',{
            colorName: this.newColor.colorName,
            colorImage: this.newColor.colorImage
          }).then(response => {
            if (response.data.code === 200){
              this.$message({
                showClose: true,
                message: '添加成功！',
                type: 'success'
              })
              location.reload()
            }
            else {
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
        }
        else{
          this.$message('请按提示填写表单')
        }
      })

    },

    // 打开编辑颜色对话框
    openEditColor(index, row) {
      this.newColor = this.colorList[index]
      this.editColorVisible = true
    },

    // 编辑颜色
    handleEditColor(){
      axios.post('http://129.211.168.202:8088/color/update',{
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
        else {
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

    // 删除颜色
    handleDelete(index, row){
      this.$confirm('此操作将永久删除该颜色, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://129.211.168.202:8088/color/delete',{
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

    // 更改每页显示数据条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      axios.post('http://129.211.168.202:8088/color/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.colorList = response.data.data
        })
        .catch(error => {
          console.log(error)
        });
    },

    // 更改当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://129.211.168.202:8088/color/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.colorList = response.data.data
        })
        .catch(error => {
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
