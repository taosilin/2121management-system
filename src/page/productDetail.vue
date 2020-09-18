<template>
  <div>
    商品详情

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <div>商品ID：{{productDetail.productID}}</div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>属性管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.reload()
        }).catch(error=>{

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
</style>
