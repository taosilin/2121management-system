<template>
  <div>

    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span>商品信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>

      <div class="text item">
        <div>商品ID：{{productDetail.productID}}</div>
      </div>

      <div class="text item">
        <div>商品名称：{{productDetail.productName}}</div>
      </div>

      <div class="text item">
        <div>商品简述：{{productDetail.sketch}}</div>
      </div>

      <div class="text item">
        <div>商品描述：{{productDetail.description}}</div>
      </div>

      <div class="text item">
        <div>商品分类：{{productDetail.classification}}</div>
      </div>

      <div class="text item">
        <div>商品标签：{{productDetail.tab}}</div>
      </div>

      <div class="text item">
        <div>关键词：{{productDetail.keyword}}</div>
      </div>

      <div class="text item">
        <div>状态：
          <el-tag v-if="productDetail.state=='0'">待上架</el-tag>
          <el-tag v-else-if="productDetail.state='1'" type="success">上架中</el-tag>
          <el-tag v-else type="info">已下架</el-tag>
        </div>
      </div>

      <div class="text item">
        <div>
          <el-image
            style="width: 100px; height: 100px"
            :src="productDetail.coverImage"
            fit="contain"></el-image>
        </div>
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
            <el-dropdown-item icon="el-icon-delete" command="delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div v-if="addVisible" class="text item">
        属性名：
          <el-input placeholder="请输入新属性名" v-model="inputAttribute" style="width: 300px" maxlength="12" show-word-limit></el-input>
          <el-button v-if="inputAttribute==''" type="danger" disabled>确认添加</el-button>
          <el-button v-else type="success" @click="onAddAttribute">确认添加</el-button>
      </div>

      <div v-for="(a,i) in attributes" class="text item">
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
        <el-dropdown @command="handleCommand1">
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="add">添加SKU</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div>
        <el-table
          :data="specs"
          border
          style="width: 100%">
          <el-table-column
            prop="specID"
            label="规格ID">
          </el-table-column>
          <el-table-column
            prop="productID"
            label="商品ID">
          </el-table-column>
          <el-table-column
            prop="productSpec"
            label="商品规格">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="库存">
          </el-table-column>
          <el-table-column
            prop="warning"
            label="预警数量">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column
            prop="specImage"
            label="规格图片地址">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="openUpdateSKU(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-card>

    <!--添加SKU对话框-->
    <el-dialog class="addSKU" title="添加SKU" :visible.sync="addSKUVisible">
      <el-form
        :model="newSKU"
        label-width="100px">

        <el-form-item label="规格编码" >
          <el-input v-model="newSKU.specID"></el-input>
        </el-form-item>

        <el-form-item label="库存量" >
          <el-input v-model="newSKU.quantity"></el-input>
        </el-form-item>

        <el-form-item label="预警数量" >
          <el-input v-model="newSKU.warning"></el-input>
        </el-form-item>

        <el-form-item label="价格" >
          <el-input v-model="newSKU.price">
            <el-button slot="prepend">$</el-button>
          </el-input>
        </el-form-item>

        <div v-for="(a,i) in attributes">
          <el-form-item v-bind:label="a.attribute.attributeName">
            <el-radio-group v-model="sku[i]" size="medium">
              <el-radio-button v-for="(v,j) in a.values" v-bind:label="v.valueName"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </div>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSKUVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddSKU">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑SKU对话框-->
    <el-dialog class="updateSKU" title="编辑SKU" :visible.sync="updateSKUVisible">
      <el-form
        :model="newSKU"
        label-width="100px">

        <el-form-item label="规格编码" >
          <el-input v-model="newSKU.specID" disabled></el-input>
        </el-form-item>

        <el-form-item label="规格" >
          <el-input v-model="newSKU.productSpec" disabled></el-input>
        </el-form-item>

        <el-form-item label="库存量" >
          <el-input v-model="newSKU.quantity"></el-input>
        </el-form-item>

        <el-form-item label="预警数量" >
          <el-input v-model="newSKU.warning"></el-input>
        </el-form-item>

        <el-form-item label="价格" >
          <el-input v-model="newSKU.price">
            <el-button slot="prepend">$</el-button>
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateSKUVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSKU">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'productDetail',
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      addVisible: false,
      deleteVisible: false,
      addSKUVisible: false,
      updateSKUVisible: false,
      inputAttribute: '',
      productDetail: {},
      attributes: [],
      specs: [],
      newSKU: {},
      sku: []
    }
  },

  created() {
    // 取到路由带过来的参数
    let productID = this.$route.query.productID
    axios.post('http://localhost:8088/product/detail',{
      productID: productID
    }).then(response => {
      this.productDetail = response.data.data.product
      this.attributes = response.data.data.attributes
      this.specs = response.data.data.specs
    }).catch(error => {
      console.log(error)
    })
  },

  methods: {

    handleCommand(command){
      console.log(command)
      if (command == 'add'){
        this.addVisible = !this.addVisible
      }
      else if (command == 'delete'){
        this.deleteVisible = !this.deleteVisible
      }
    },

    handleCommand1(command){
      console.log(command)
      if (command=='add'){
        this.newSKU = {}
        this.addSKUVisible = true
      }
    },

    // 显示添加属性输入框
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 添加属性attribute
    onAddAttribute(){
      let attributeID = this.inputAttribute + new Date().getTime().toString()
      axios.post('http://localhost:8088/attribute/add',{
        attributeID: attributeID,
        productID: this.productDetail.productID,
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

    // 删除属性attribute
    handleDeleteAttribute(i) {
      this.$confirm('此操作将删除该属性及其全部属性值, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8088/attribute/delete',{
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

    // 属性添加值value
    handleInputConfirm(i) {
      if (this.inputValue) {
        let valueID = new Date().getTime().toString()
        // let valueID = this.inputValue + new Date().getTime().toString()
        axios.post('http://localhost:8088/value/add',{
          "valueID": valueID,
          "attributeID": this.attributes[i].attribute.attributeID,
          "valueName": this.inputValue
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
      this.inputValue = ''
    },

    // 删除属性值value
    handleDeleteValue(i,j) {
      console.log(i,j)
      axios.post('http://localhost:8088/value/delete',{
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
    },

    // 添加SKU
    handleAddSKU () {
      axios.post('http://localhost:8088/spec/add',{
        specID: this.newSKU.specID,
        productID: this.productDetail.productID,
        productSpec: this.sku.join(";"),
        quantity: this.newSKU.quantity,
        warning: this.newSKU.warning,
        price: this.newSKU.price,
        specImage: this.newSKU.specImage
      }).then(response => {
        if (response.data.code === 200) {
          location.reload()
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        }
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '添加失败，请联系管理员',
          type: 'error'
        })
      })
      this.addSKUVisible = false
      this.newSKU = {}
    },

    // 打开编辑SKU对话框
    openUpdateSKU(index, row){
      this.newSKU = this.specs[index]
      this.updateSKUVisible = true
    },

    // 提交编辑SKU
    handleEditSKU() {
      axios.post('http://localhost:8088/spec/update',{
        specID: this.newSKU.specID,
        quantity: this.newSKU.quantity,
        warning: this.newSKU.warning,
        price: this.newSKU.price,
        specImage: this.newSKU.specImage
      }).then(response => {
        if (response.data.code === 200){
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
      }).catch(error => {
        console.log(error)
        this.$message({
          showClose: true,
          message: '修改失败，请联系管理员',
          type: 'error'
        })
      })
      this.updateSKUVisible = false
      this.newSKU = {}
    },

    // 删除SKU
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该规格, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8088/spec/delete',{
          specID : this.specs[index].specID
        }).then(response => {
          if (response.data.code === 200){
            location.reload()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
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
    }

  }
}
</script>

<style scoped>
.addSKU{
  text-align: left;
}
.updateSKU{
  text-align: left;
}

.attributeName{
  font-size: 20px;
  font-weight: bold;
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
