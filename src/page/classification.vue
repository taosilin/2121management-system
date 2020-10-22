<template>
  <div>
    分类管理
    <el-button type="primary" icon="el-icon-plus" @click="openAddClass">添加分类</el-button>
    <el-table
      :data="classList"
      border
      style="width: 100%">

      <el-table-column
        prop="classID"
        label="分类ID">
      </el-table-column>

      <el-table-column
        prop="className"
        label="类型名称">
      </el-table-column>

      <el-table-column
        prop="superior"
        label="上级分类ID">
      </el-table-column>

      <el-table-column
        prop="description"
        label="类型描述">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="classList[scope.$index].state === '0'" effect="dark" type="success">已启用</el-tag>
          <el-tag v-else effect="dark" type="warning">禁用</el-tag>
        </template>

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

    <!--添加分类对话框-->
    <el-dialog class="addClass" title="添加分类" :visible.sync="addClassVisible">
      <el-form
        :rules="rules"
        :model="newClass"
        ref="addClass"
        label-position="left"
        label-width="100px">

        <el-form-item label="分类名称" prop="className">
          <el-input v-model="newClass.className"></el-input>
        </el-form-item>

        <el-form-item label="上级分类">
          <el-cascader
            :options="superior"
            :props="prop"
            @change="handleChange"></el-cascader>
        </el-form-item>

        <el-form-item label="说明" prop="description">
          <el-input type="textarea" v-model="newClass.description" maxlength="500" show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="newClass.state">
            <el-radio label="0">已启用</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addClassVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddClass('addClass')">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑分类对话框-->
    <el-dialog class="updateClass" title="编辑分类" :visible.sync="updateClassVisible">
      <el-form
        :model="newClass"
        label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="newClass.className"></el-input>
        </el-form-item>
        <el-form-item label="上级分类">
          <el-cascader
            :options="superior"
            :props="prop"
            @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="newClass.description"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="newClass.state">
            <el-radio label="0">已启用</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateClassVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateClass">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'classification',
  data() {
    return {
      currentPage: 0,
      pageSize: 20,
      resultNum: 0,
      classList: [],
      addClassVisible: false,
      updateClassVisible: false,
      newClass: {

      },
      superior: [],

      rules: {
        className: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 45, message: '长度不超过 45 个字符', trigger: 'blur' }
        ],
        description:[
          { required: true, message: '请输入分类描述', trigger: 'blur' },
          { min: 1, max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }
        ]
      },

      //cascader级联选择器prop属性
      prop: {
        value: "classID",
        label: "className",
        children: "children",
        checkStrictly: true
      }

    }
  },
  created() {
    axios.post('http://localhost:8088/class/list',{
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response => {
        this.classList = response.data.data
        this.resultNum = response.data.data.length
      })
      .catch(error => {
        console.log(error)
      })

    axios.post('http://localhost:8088/class/superior',{
      superior: 0
    }).then(response => {
      this.superior = response.data.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    // 打开添加分类对话框
    openAddClass() {
      this.newClass = { state: '0' }
      this.addClassVisible = true
    },

    // 添加分类
    handleAddClass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.newClass.superior == null)
            this.newClass.superior = 0
          axios.post('http://localhost:8088/class/add',{
            className: this.newClass.className,
            superior: this.newClass.superior,
            description: this.newClass.description,
            state: this.newClass.state
          }).then(response => {
            if (response.data.code === 200){
              this.$message({
                showClose: true,
                message: '添加分类成功！',
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
          this.addClassVisible = false
          this.newClass = {}
        }
        else{
          this.$message('请按提示填写表单')
        }
      })
    },

    //  打开编辑分类对话框
    handleEdit(index, row) {
      this.newClass = this.classList[index]
      this.updateClassVisible = true
    },

    // 编辑分类
    handleUpdateClass() {
      axios.post('http://localhost:8088/class/update',{
        classID: this.newClass.classID,
        className: this.newClass.className,
        superior: this.newClass.superior,
        description: this.newClass.description,
        state: this.newClass.state
      }).then(response => {
        if (response.data.code === 200){
          this.$message({
            showClose: true,
            message: '编辑分类成功！',
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
      this.updateClassVisible = false
      this.newClass = {}
    },

    //删除分类
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将删除该分类及其全部子类, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8088/class/delete',{
          classID : this.classList[index].classID
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
      axios.post('http://localhost:8088/class/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.classList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(error => {
          console.log(error)
        });
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://localhost:8088/class/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.classList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(error => {
          console.log(error)
        })
    },

    //级联选择器改变
    handleChange(value) {
      this.newClass.superior = value[value.length-1]
    }
  }
}
</script>

<style scoped>
.addClass {
  text-align: left;
}
.updateClass {
  text-align: left;
}
</style>
