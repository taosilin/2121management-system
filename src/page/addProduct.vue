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
        <el-button type="primary" @click="onSubmit">下一步</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "addProduct",
  data(){
    return {
      form: {
        productID: '',
        productName: '',
        sketch: '',
        coverImage: '',
        imageList: '',
        description: '',
        classification: '',
        tab: '',
        keyword: '',
        state: '0',
        classes: [],
        tabs: [],
        keywords: []
      }
    }
  },
  methods: {
    onSubmit(){
      console.log(this.form);
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
