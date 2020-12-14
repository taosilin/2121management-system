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

      <el-form-item label="商品封面图片">
        <el-upload
          ref="upload"
          list-type="picture-card"
          :limit=limitNum
          :headers="headerObj"
          :on-remove="handleRemove"
          :http-request="handleUploadCoverImage">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品展示列表图片">
        <el-upload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :http-request="handleUploadImageList"
          list-type="picture">
          <el-button size="small" type="primary">重新上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品详情图片">
        <el-upload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :http-request="handleUploadDescription"
          list-type="picture">
          <el-button size="small" type="primary">重新上传</el-button>
        </el-upload>
      </el-form-item>

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
      }],
      newImageList: [],
      newDescription: [],
      // 上传数量限制
      limitNum: 1,
      //图片上传组件的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
  },
  created() {
    // 取到路由带过来的参数
    let productID = this.$route.query.productID

    // 商品详情
    axios.post('https://from2121:8443/product/detail',{
      productID: productID
    }).then(response => {
      this.productDetail = response.data.data.product
      this.productDetail.classification = this.productDetail.classification.split(',')
      this.productDetail.tab = this.productDetail.tab.split(',')
      this.productDetail.keyword = this.productDetail.keyword.split(',')
      this.productDetail.imageList = this.productDetail.imageList.split(',')
      this.productDetail.description = this.productDetail.description.split(',')
      this.attributes = response.data.data.attributes
      this.specs = response.data.data.specs
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    // 上传商品封面图片
    handleUploadCoverImage(param){
      const formData = new FormData()
      formData.append('imageFile', param.file)
      axios.post('https://from2121:8443/product/uploadImage',formData)
        .then(response => {
          console.log('上传图片成功')
          // console.log(response)
          param.onSuccess()  // 上传成功的图片会显示绿色的对勾
          this.productDetail.coverImage = response.data
          // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
        }).catch(error => {
        console.log('图片上传失败')
        param.onError()
      })
    },

    // 上传商品展示图片
    handleUploadImageList(param) {
      const formData = new FormData()
      formData.append('imageFile', param.file)
      axios.post('https://from2121:8443/product/uploadImage',formData)
        .then(response => {
          console.log('上传图片成功')
          // console.log(response)
          param.onSuccess()  // 上传成功的图片会显示绿色的对勾
          this.newImageList.push(response.data)
          // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
        }).catch(error => {
        console.log('图片上传失败')
        param.onError()
      })
    },

    // 上传商品详情图片
    handleUploadDescription(param) {
      const formData = new FormData()
      formData.append('imageFile', param.file)
      axios.post('https://from2121:8443/product/uploadImage',formData)
        .then(response => {
          console.log('上传图片成功')
          // console.log(response)
          param.onSuccess()  // 上传成功的图片会显示绿色的对勾
          this.newDescription.push(response.data)
          // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
        }).catch(error => {
        console.log('图片上传失败')
        param.onError()
      })
    },

    //文件列表移除文件时的钩子
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },

    //点击已上传的文件链接时的钩子,获取服务器返回的数据
    handlePreview (file) {
      console.log(file)
    },

    // 监听图片上传成功事件
    handleSuccess(response){
      console.log(response,"success")
    },



    // 提交编辑商品
    handleUpdateProduct() {

      if (this.newImageList.length>0){
        this.productDetail.imageList = this.newImageList
      }

      if (this.newDescription.length>0){
        this.productDetail.description = this.newDescription
      }

      axios.post('https://from2121:8443/product/update', {
        productID: this.productDetail.productID,
        productName: this.productDetail.productName,
        sketch: this.productDetail.sketch,
        coverImage: this.productDetail.coverImage,
        imageList: this.productDetail.imageList.toString(),
        description: this.productDetail.description.toString(),
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
