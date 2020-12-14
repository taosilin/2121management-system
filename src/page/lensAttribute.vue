<template>
  <div>
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span>镜片属性</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="add">添加属性</el-dropdown-item>
            <el-dropdown-item icon="el-icon-edit" command="edit">编辑</el-dropdown-item>
            <el-dropdown-item icon="el-icon-delete" command="delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-row v-if="addVisible" class="item">
        属性名：
          <el-input placeholder="请输入新属性名" v-model="inputAttribute" style="width: 300px" maxlength="12" show-word-limit></el-input>
          <el-button v-if="inputAttribute==''" type="danger" disabled>确认添加</el-button>
          <el-button v-else type="success" @click="onAddAttribute">确认添加</el-button>
      </el-row>

      <div v-for="(a,i) in attributes" class="item">
        <div class="attributeName">
          {{a.attribute.attributeName}}
          <el-button v-if="deleteVisible" type="danger" icon="el-icon-delete" size="small" plain @click="handleDeleteAttribute(i)"></el-button>
        </div>
        <div class="valueList">
          <el-popconfirm v-for="(v,j) in a.values" title="删除该属性值？" @onConfirm="handleDeleteValue(i,j)">
            <el-tag slot="reference" :disable-transitions="false" style="margin-right: 10px">
              {{v.valueName}}
            </el-tag>
          </el-popconfirm>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue[i]"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(i)"
            @blur="handleInputConfirm(i)"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput()">+ New Value</el-button>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'lensAttribute',
  data() {
    return {
      attributes: [],
      addVisible: false,
      inputVisible: false,
      deleteVisible: false,
      inputValue: [],
      inputAttribute: ''
    }
  },
  created() {
    axios.post('https://from2121:8443/attribute/detail',{
      productID: 'lens'
    }).then(response => {
      this.attributes = response.data.data
    }).catch(error => {
      console.log(error)
    })

  },
  methods: {

    // 选择操作
    handleCommand(command){
      console.log(command)
      if (command=='add'){
        this.addVisible = !this.addVisible
      }
      else if (command=='delete'){
        this.deleteVisible = !this.deleteVisible
      }
    },

    // 显示属性值输入框
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 添加属性值value
    handleInputConfirm(i) {
      if (this.inputValue[i]) {
        let valueID = this.inputValue[i] + new Date().getTime().toString()
        // 属性添加值
        axios.post('https://from2121:8443/value/add',{
          "valueID": valueID,
          "attributeID": this.attributes[i].attribute.attributeID,
          "valueName": this.inputValue[i]
        }).then(response => {
          if (response.data.code === 200){
            this.$message({
              type: 'success',
              message: '添加成功!'
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
      }
      this.inputVisible = false
      this.inputValue = []
    },

    // 添加属性attribute
    onAddAttribute(){
      let attributeID = this.inputAttribute + new Date().getTime().toString()
      axios.post('https://from2121:8443/attribute/add',{
        attributeID: attributeID,
        productID: "lens",
        attributeName: this.inputAttribute
      }).then(response => {
        console.log(response)
        if (response.data.code === 200){
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          location.reload()
        }
      }).catch(error => {
        console.log(error)
        this.$message({
          showClose: true,
          message: '添加失败，请联系管理员',
          type: 'error'
        })
      })
      this.addVisible = false
      this.inputAttribute = ''
    },

    // 删除属性attribute及其全部value
    handleDeleteAttribute(i) {

      this.$confirm('此操作将删除该属性及其全部属性值, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('https://from2121:8443/attribute/delete',{
          attributeID: this.attributes[i].attribute.attributeID
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

    // 删除属性值value
    handleDeleteValue(i,j) {
      console.log(i,j)
      axios.post('https://from2121:8443/value/delete',{
        valueID: this.attributes[i].values[j].valueID
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
    }

  }
}
</script>

<style scoped>
.attributeName{
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
}
.valueList{
  font-size: 14px;
  margin: 10px;
}

.item {
  margin-bottom: 18px;
  text-align: left;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.clearfix{
  font-weight: bold;
}
.box-card {
  width: 100%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
