<template>
  <div class="addProductDiv">
    添加商品
    <el-form ref="form"
             :model="form"
             label-width="80px">

      <el-form-item label="商品ID">
        <el-input v-model="form.productID" placeholder="商品ID"></el-input>
      </el-form-item>

      <el-form-item label="商品名称">
        <el-input v-model="form.productName" placeholder="商品名称"></el-input>
      </el-form-item>

      <el-form-item label="商品简述">
        <el-input v-model="form.sketch" placeholder="商品简述"></el-input>
      </el-form-item>

      <el-form-item label="商品详情">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>

      <el-form-item label="所属分类">
        <el-select
          v-model="form.classification"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择分类标签">
          <el-option
            v-for="item in form.classes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标签">
        <el-select
          v-model="form.tab"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择商品标签">
          <el-option
            v-for="item in form.tabs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="关键词">
        <el-select
          v-model="form.keyword"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择商品关键词">
          <el-option
            v-for="item in form.keywords"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="form.state">
          <el-radio label="0">待上架</el-radio>
          <el-radio label="1">上架中</el-radio>
          <el-radio label="2">已下架</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加商品</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'addProduct',
  data(){
    return {
      form: {
        productID: '',
        productName: '',
        sketch: '',
        coverImage: null,
        imageList: null,
        description: '',
        classification: '',
        tab: '',
        keyword: '',
        state: '0',
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
    }
  },
  methods: {
    onSubmit(){
      axios.post('http://localhost:8088/product/add',{
        productID: this.form.productID,
        productName: this.form.productName,
        sketch: this.form.sketch,
        coverImage: this.form.coverImage,
        imageList: this.form.imageList,
        description: this.form.description,
        classification: this.form.classification.toString(),
        tab: this.form.tab.toString(),
        keyword: this.form.keyword.toString(),
        state: this.form.state
      }).then(response=>{
        if (response.data.code==200){
          this.$message({
            showClose: true,
            message: '添加成功！',
            type: 'success'
          })
          this.$router.push('/product')
        }
        else{
          this.$message({
            showClose: true,
            message: '添加失败，请联系管理员',
            type: 'error'
          })
        }
      }).catch(error=>{
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.addProductDiv{
  width: 100%;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
}
</style>
