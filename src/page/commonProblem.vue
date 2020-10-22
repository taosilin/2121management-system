<template>
  <div>

    常见问题
    <el-button type="primary" icon="el-icon-plus" @click="openAddProblem">添加</el-button>
    <el-table
      :data="problemList"
      border
      style="width: 100%">

      <el-table-column
        prop="problemID"
        label="问题ID">
      </el-table-column>

      <el-table-column
        prop="problemContent"
        label="问题描述">
      </el-table-column>

      <el-table-column
        prop="answer"
        label="回答">
      </el-table-column>

      <el-table-column
        prop="classification"
        label="分类">
      </el-table-column>

      <el-table-column
        prop="keyword"
        label="关键字">
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

    <!--添加问题对话框-->
    <el-dialog class="addProblem" title="添加问题" :visible.sync="addProblemVisible">
      <el-form
        :rules="rules"
        :model="newProblem"
        ref="addProblem"
        label-position="left"
        label-width="100px">

        <el-form-item label="问题描述" prop="problemContent">
          <el-input v-model="newProblem.problemContent"></el-input>
        </el-form-item>

        <el-form-item label="回答" prop="answer">
          <el-input type="textarea" v-model="newProblem.answer"></el-input>
        </el-form-item>

        <el-form-item label="分类" >
          <el-select
            v-model="newProblem.classification"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择分类">
            <el-option
              v-for="item in classes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="关键字" >
          <el-select
            v-model="newProblem.keyword"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择关键词">
            <el-option
              v-for="item in keywords"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addProblemVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddProblem('addProblem')">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑问题对话框-->
    <el-dialog class="updateProblem" title="编辑问题" :visible.sync="updateProblemVisible">
      <el-form
        :model="newProblem"
        label-width="100px">

        <el-form-item label="问题描述" >
          <el-input v-model="newProblem.problemContent"></el-input>
        </el-form-item>

        <el-form-item label="回答">
          <el-input type="textarea" v-model="newProblem.answer"></el-input>
        </el-form-item>

        <el-form-item label="分类" >
          <el-select
            v-model="newProblem.classification"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择分类">
            <el-option
              v-for="item in classes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="关键字" >
          <el-select
            v-model="newProblem.keyword"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择关键词">
            <el-option
              v-for="item in keywords"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateProblemVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateProblem">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'commonProblem',
  data () {
    return {
      currentPage: 0,
      pageSize: 20,
      resultNum: 0,
      problemList: [],

      addProblemVisible: false,
      newProblem: {},
      updateProblemVisible: false,

      rules: {
        problemContent: [
          { required: true, message: '请输入问题描述', trigger: 'blur' },
          { min: 1, max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }
        ],
        answer:[
          { required: true, message: '请输入回答', trigger: 'blur' },
          { min: 1, max: 500, message: '长度不超过 500 个字符', trigger: 'blur' }
        ]
      },

      classes: [{
        value: '镜框',
        label: '镜框'
      }, {
        value: '订单',
        label: '订单'
      }, {
        value: '常见',
        label: '常见'
      }, {
        value: '配送',
        label: '配送'
      }],
      tabs: [{
        value: '新品',
        label: '新品'
      }, {
        value: '爆品',
        label: '爆品'
      }, {
        value: '一起拼',
        label: '一起拼'
      }],
      keywords: [{
        value: '购买',
        label: '购买'
      }, {
        value: '优惠',
        label: '优惠'
      }, {
        value: '发票',
        label: '发票'
      }]
    }
  },
  created() {
    axios.post('http://localhost:8088/problem/list',{
      page:this.currentPage,
      size:this.pageSize
    }).then(response => {
      this.problemList = response.data.data
      this.resultNum = response.data.data.length
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    // 打开添加问题对话框
    openAddProblem(){
      this.newProblem = {}
      this.addProblemVisible = true
    },

    // 添加常见问题
    handleAddProblem(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8088/problem/add',{
            problemContent: this.newProblem.problemContent,
            answer: this.newProblem.answer,
            classification: this.newProblem.classification.toString(),
            keyword: this.newProblem.keyword.toString()
          }).then(response => {
            console.log(response.data)
            if (response.data.code==200){
              location.reload()
              this.$message({
                showClose: true,
                message: '添加成功！',
                type: 'success'
              })
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
          this.addProblemVisible = false
        }
        else {
          this.$message('请按提示填写表单')
        }
      })
    },

    // 打开编辑问题对话框
    handleEdit(index, row) {
      console.log(index, row)
      this.newProblem = this.problemList[index]
      this.newProblem.classification = this.newProblem.classification.split(',')
      this.newProblem.keyword = this.newProblem.keyword.split(',')
      this.updateProblemVisible = true
    },

    // 提交编辑问题
    handleUpdateProblem() {
      axios.post('http://localhost:8088/problem/update',{
        problemID: this.newProblem.problemID,
        problemContent: this.newProblem.problemContent,
        answer: this.newProblem.answer,
        classification: this.newProblem.classification.toString(),
        keyword: this.newProblem.keyword.toString()
      }).then(response => {
        if (response.data.code === 200){
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          location.reload()
        }
      }).catch(error => {

      })
      this.updateProblemVisible = false
    },

    //删除问题
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8088/problem/delete',{
          problemID : this.problemList[index].problemID
        }).then(response => {
          if (response.data.code === 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            location.reload()
          }
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '删除失败，请联系管理员',
            type: 'error'
          })
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
      axios.post('http://localhost:8088/problem/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response=>{
          this.problemList = response.data.data
          this.resultNum = response.data.data.length
        })
        .catch(error => {       //发生错误
          console.log(error)
        });
    },

    // 更改当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('http://localhost:8088/problem/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response=>{
          this.problemList = response.data.data
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
.addProblem{
  text-align: left;
}
.updateProblem{
  text-align: left;
}
</style>
