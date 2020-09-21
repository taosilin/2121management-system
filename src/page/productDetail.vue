<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品详情</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <div>商品ID：{{productDetail.productID}}</div>
      </div>
      <div class="text item">
        <div>商品名称：{{productDetail.productName}}</div>
      </div>
    </el-card>

    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span>属性管理</span>
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

      <div v-for="(a,i) in attributes" class="text item">
        <div>属性名：{{a.attribute.attributeName}}</div>
        <div>可选值：
          <el-tag
            v-for="v in a.values"
            closable
            :disable-transitions="false">
            {{v.valueName}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
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

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>规格SKU管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>

    </el-card>

  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'productDetail',
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      addVisible: false,
      inputAttribute: '',
      productDetail: {},
      attributes: [],
      specs: []
    }
  },
  created() {
    // 取到路由带过来的参数
    let productID = this.$route.query.productID
    axios.post('http://localhost:8088/product/detail',{
      productID: productID
    }).then(response=>{
      this.productDetail = response.data.data.product
      this.attributes = response.data.data.attributes
      this.specs = response.data.data.specs
    }).catch(error=>{
      console.log(error)
    })
  },
  methods: {

    handleCommand(command){
      console.log(command)
      if (command=='add'){
        this.addVisible = true
      }
    },

    onAddAttribute(){

      let date = (new Date()).toLocaleString()
      let attributeID = this.productDetail.productID + "_" + date

      axios.post('http://localhost:8088/attribute/add',{
        attributeID: attributeID,
        productID: this.productDetail.productID,
        attributeName: this.inputAttribute
      }).then(response=>{
        console.log(response)
        if (response.data.code==200){
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        }
      }).catch(error=>{
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

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm(i) {
      let inputValue = this.inputValue
      let date = (new Date()).toLocaleString()
      let valueID = this.productDetail.productID + "_" + this.attributes[i].attribute.attributeID + "_" + date

      if (inputValue) {
        // 属性添加值
        axios.post('http://localhost:8088/value/add',{
          "valueID": valueID,
          "attributeID": this.attributes[i].attribute.attributeID,
          "valueName": inputValue
        }).then(response=>{
          if (response.data.code==200){
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          }
        }).catch(error=>{
          this.$message({
            showClose: true,
            message: '添加失败，请联系管理员',
            type: 'error'
          })
        })
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }

}
</script>

<style scoped>
.text {
  font-size: 14px;
  text-align: left;
}

.item {
  margin-bottom: 18px;
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
