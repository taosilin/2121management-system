<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>镜框详情</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <div>镜框ID：{{frameDetail.frameID}}</div>
        <div>镜框名称：{{frameDetail.frameName}}</div>
        <div>价格：{{frameDetail.price}}</div>
        <div>材质：{{frameDetail.material}}</div>
        <div>外观形状：{{frameDetail.shape}}</div>
        <div>鼻托类型：{{frameDetail.nosePad}}</div>
        <div>镜架维度：{{frameDetail.dimension}}</div>
        <div>状态：
          <el-tag v-if="frameDetail.state=='0'">待上架</el-tag>
          <el-tag v-else-if="frameDetail.state='1'" type="success">上架中</el-tag>
          <el-tag v-else type="info">已下架</el-tag>
        </div>
        <div>简述：{{frameDetail.sketch}}</div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>SKU管理</span>
        <el-dropdown @command="handleCommand">
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
            label="镜框ID">
          </el-table-column>
          <el-table-column
            prop="productSpec"
            label="镜框颜色">
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
            label="规格图片">
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

        <el-form-item label="镜框颜色" >
          <template>
            <el-radio v-for="(c,i) in colorList" v-model="newSKU.productSpec" :label="c.colorID">
              <el-image
                style="width: 20px; height: 20px"
                :src="colorList[i].colorImage"
                fit="contain"></el-image>
            </el-radio>
          </template>
        </el-form-item>

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

        <el-form-item label="镜框颜色ID" >
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
        <el-button type="primary" @click="handleUpdateSKU">确 定</el-button>
      </div>
    </el-dialog>

    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span>可选镜片</span>
      </div>

      <div>
        <el-transfer class="framelens"
          filterable
          :filter-method="filterMethod"
          :titles="['备选镜片', '已选镜片']"
          filter-placeholder="请输入镜片关键词"
          v-model="selectedLens"
          :data="lensList"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          @change="getObject">
        </el-transfer>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>

    </el-card>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'manageFrame',
  data () {
    return {

      filterMethod(query, item) {
        return item.lens.indexOf(query) > -1;
      },

      frameDetail: {},
      attributes: [],
      specs: [],

      colorList: [],
      lensList: [],
      selectedLens: [],
      originalSelected: [],

      addSKUVisible: false,
      updateSKUVisible: false,
      newSKU: {}
    }
  },
  created() {
    // 取到路由带过来的参数
    let frameID = this.$route.query.frameID

    // 镜框详情
    axios.post('http://localhost:8088/frame/detail',{
      frameID: frameID
    }).then(response => {
      this.frameDetail = response.data.data.frame
      this.attributes = response.data.data.attributes
      this.specs = response.data.data.specs

      // 查询全部镜片列表
      axios.post('http://localhost:8088/lens/list',{
        page: 0,
        size: 20
      }).then(response => {
        const data = []
        for (let i = 0;i<response.data.data.length;i++){
          data.push({
            key: response.data.data[i].lensID,
            label: response.data.data[i].lensName,
            lens: response.data.data[i].lensName
          })
        }
        this.lensList = data
      }).catch(error => {
        console.log(error)
      })

      // 查询当前镜框所有可选镜片
      axios.post('http://localhost:8088/framelens/list',{
        frameID: frameID
      }).then(response => {
        for (let i=0;i<response.data.data.length;i++){
          this.selectedLens[i]=response.data.data[i].lensID
        }
        this.originalSelected = this.selectedLens
        console.log(this.selectedLens)
      }).catch(error => {
        console.log(error)
      })

      // 查询全部镜框颜色列表
      axios.post('http://localhost:8088/color/list',{
        page: 0,
        size: 20
      }).then(response => {
        this.colorList = response.data.data
      }).catch(error => {
        console.log(error)
      })

    }).catch(error => {
      console.log(error)
    })


  },
  methods: {

    //打开添加SKU对话框
    handleCommand(command) {
      console.log(command)
      if (command=='add'){
        this.newSKU = {}
        this.addSKUVisible = true
      }
    },

    // 添加SKU
    handleAddSKU() {
      axios.post('http://localhost:8088/spec/add',{
        specID: this.newSKU.specID,
        productID: this.frameDetail.frameID,
        productSpec: this.newSKU.productSpec,
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
    openUpdateSKU(index,row) {
      this.newSKU = this.specs[index]
      this.updateSKUVisible = true
    },

    // 提交编辑SKU
    handleUpdateSKU() {
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
    },

    // 保存镜框可选镜片
    onSave() {
      for (let i=0;i<this.selectedLens.length;i++){
        if (this.originalSelected.indexOf(this.selectedLens[i])==-1){
          axios.post('http://localhost:8088/framelens/add',{
            frameID: this.frameDetail.frameID,
            lensID: this.selectedLens[i]
          }).then(response => {
            console.log(response.data)
            if (response.data.code==200){
              this.$message({
                showClose: true,
                message: '保存成功！',
                type: 'success'
              })
            }
            else{
              this.$message({
                showClose: true,
                message: '保存失败，请联系管理员',
                type: 'error'
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }
      }

      for (let i=0;i<this.originalSelected.length;i++){
        if (this.selectedLens.indexOf(this.originalSelected[i])==-1){
          axios.post('http://localhost:8088/framelens/delete',{
            frameID: this.frameDetail.frameID,
            lensID: this.originalSelected[i]
          }).then(response => {
            console.log(response.data)
            if (response.data.code === 200){
              this.$message({
                showClose: true,
                message: '保存成功！',
                type: 'success'
              })
            }
            else{
              this.$message({
                showClose: true,
                message: '保存失败，请联系管理员',
                type: 'error'
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }
      }
    },

    // 右侧列表元素变化时触发
    getObject() {
      console.log("选中的数据有" + this.selectedLens)
    },
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
.el-col{
  min-height: 1px;
}
.framelens{
  width: 100%;
  text-align: left;
}
</style>
