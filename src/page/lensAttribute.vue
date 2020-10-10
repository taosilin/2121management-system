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

      <div v-for="(a,i) in attributes" class="item">
        <div class="attributeName">{{a.attribute.attributeName}}</div>
        <div class="valueList">
          <el-tag
            v-for="v in a.values"
            :disable-transitions="false">
            {{v.valueName}}
          </el-tag>
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

      <div v-if="addVisible" class="text item">
        <el-col :span="6">属性名：</el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入新属性名"
            v-model="inputAttribute"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button v-if="inputAttribute==''" type="success" disabled>确认添加</el-button>
          <el-button v-else type="success" @click="onAddAttribute">确认添加</el-button>
        </el-col>
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
      inputValue: [],
      inputAttribute: ''
    }
  },
  created() {
    axios.post('http://localhost:8088/attribute/detail',{
      productID: "lens"
    }).then(response => {
      this.attributes = response.data.data
    }).catch(error => {
      console.log(error)
    })

  },
  methods: {

    //选择操作
    handleCommand(command){
      console.log(command)
      if (command=='add'){
        this.addVisible = true
      }
    },

    //显示属性值输入框
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    //添加属性值
    handleInputConfirm(i) {
      if (this.inputValue[i]) {
        // 属性添加值
        axios.post('http://localhost:8088/value/add',{
          "valueID": this.inputValue[i],
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

    //添加属性
    onAddAttribute(){
      axios.post('http://localhost:8088/attribute/add',{
        attributeID: this.inputAttribute,
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
