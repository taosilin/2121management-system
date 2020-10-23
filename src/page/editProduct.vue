<template>
  <div class="editProductDiv">
    <el-form :model="productDetail"
             label-position="left"
             label-width="120px">

      <el-form-item label="商品ID">
        <el-input v-model="productDetail.productID" placeholder="商品ID" disabled></el-input>
      </el-form-item>

      <el-form-item label="商品名称">
        <el-input v-model="productDetail.productName" placeholder="商品名称"></el-input>
      </el-form-item>

      <el-form-item label="商品简述">
        <el-input v-model="productDetail.sketch" placeholder="商品简述"></el-input>
      </el-form-item>

      <el-form-item label="商品详情">
        <el-input type="textarea" v-model="productDetail.description"></el-input>
      </el-form-item>

      <el-form-item label="所属分类">
        <el-select
          v-model="productDetail.classification"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择分类标签">
          <el-option
            v-for="item in classes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标签">
        <el-select
          v-model="productDetail.tab"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择商品标签">
          <el-option
            v-for="item in tabs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="关键词">
        <el-select
          v-model="productDetail.keyword"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择商品关键词">
          <el-option
            v-for="item in keywords"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="productDetail.state">
          <el-radio label="0">待上架</el-radio>
          <el-radio label="1">上架中</el-radio>
          <el-radio label="2">已下架</el-radio>
        </el-radio-group>
      </el-form-item>

<!--      <el-form-item label="商品封面图片">-->

<!--        <el-upload-->
<!--          action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"-->
<!--          list-type="picture-card"-->
<!--          :limit=limitNum-->
<!--          :headers="token"-->
<!--          :on-preview="handlePictureCardPreview"-->
<!--          :on-remove="handleRemove"-->

<!--          :on-change="addFile"-->
<!--          :file-list="showFiles"-->
<!--          name="imgUrl"-->
<!--          ref="upload">-->
<!--          <i class="el-icon-plus"></i>-->
<!--        </el-upload>-->
<!--        <el-dialog :visible.sync="dialogVisible">-->
<!--          <img width="100%" :src="dialogImageUrl" alt="">-->
<!--        </el-dialog>-->

<!--      </el-form-item>-->

<!--      <el-form-item label="商品展示列表图片">-->
<!--        <el-upload-->
<!--          class="upload-demo"-->
<!--          action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"-->
<!--          :on-preview="handlePreview"-->
<!--          :on-remove="handleRemove"-->
<!--          :file-list="productDetail.imageList"-->
<!--          list-type="picture">-->
<!--          <el-button size="small" type="primary">点击上传</el-button>-->
<!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--        </el-upload>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="商品详情图片">-->
<!--        <el-upload-->
<!--          class="upload-demo"-->
<!--          action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"-->
<!--          :on-preview="handlePreview"-->
<!--          :on-remove="handleRemove"-->
<!--          :file-list="productDetail.imageList"-->
<!--          list-type="picture">-->
<!--          <el-button size="small" type="primary">点击上传</el-button>-->
<!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--        </el-upload>-->
<!--      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" @click="handleUpdateProduct">保存编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'editProduct',
  data() {
    return {
      productDetail: {},
      attributes: [],
      specs: [],
      classes: [{
        value: '无框',
        label: '无框'
      }, {
        value: '圆框',
        label: '圆框'
      }, {
        value: '方框',
        label: '方框'
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
        value: '近视',
        label: '近视'
      }, {
        value: '太阳镜',
        label: '太阳镜'
      }, {
        value: '防蓝光',
        label: '防蓝光'
      }]
    }
  },
  created() {
    // 取到路由带过来的参数
    let productID = this.$route.query.productID

    // 商品详情
    axios.post('http://localhost:8088/product/detail',{
      productID: productID
    }).then(response => {
      this.productDetail = response.data.data.product
      this.productDetail.classification = this.productDetail.classification.split(',')
      this.productDetail.tab = this.productDetail.tab.split(',')
      this.productDetail.keyword = this.productDetail.keyword.split(',')
      this.attributes = response.data.data.attributes
      this.specs = response.data.data.specs
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    // 提交编辑商品
    handleUpdateProduct() {
      axios.post('http://localhost:8088/product/update', {
        productID: this.productDetail.productID,
        productName: this.productDetail.productName,
        sketch: this.productDetail.sketch,
        coverImage: this.productDetail.coverImage,
        imageList: this.productDetail.imageList,
        description: this.productDetail.description,
        classification: this.productDetail.classification.toString(),
        tab: this.productDetail.tab.toString(),
        keyword: this.productDetail.keyword.toString(),
        state: this.productDetail.state
      }).then(response => {
        if (response.data.code === 200) {
          this.$message({
            showClose: true,
            message: '保存成功！',
            type: 'success'
          })
          this.$router.push('/product')
          location.reload()
        }
        else {
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
}
</script>

<style scoped>
.editProductDiv{
  width: 100%;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
}
</style>
