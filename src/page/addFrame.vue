<template>
  <div>
    <el-steps :active="active" simple>
      <el-step title="基本信息" icon="el-icon-edit"></el-step>
      <el-step title="关于" icon="el-icon-upload"></el-step>
      <el-step title="镜框SKU" icon="el-icon-picture"></el-step>
      <el-step title="可用镜片" icon="el-icon-sort"></el-step>
    </el-steps>
    <div class="infoForm" v-if="active===0">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="规则编码">
          <el-input v-model="form.frameID" placeholder="镜框ID"></el-input>
        </el-form-item>
        <el-form-item label="镜框名称">
          <el-input v-model="form.frameName" placeholder="镜框名称"></el-input>
        </el-form-item>
        <el-form-item label="镜框价格">
          <el-input v-model="form.price">
            <el-button slot="prepend">$</el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="材质">
          <el-radio-group v-model="form.material" size="medium">
            <el-radio-button label="Acetate" ></el-radio-button>
            <el-radio-button label="Metal"></el-radio-button>
            <el-radio-button label="Mixed material"></el-radio-button>
            <el-radio-button label="Eco acetate"></el-radio-button>
            <el-radio-button label="Plastic"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="外观形状">
          <el-radio-group v-model="form.shape" size="medium">
            <el-radio-button label="Square" ></el-radio-button>
            <el-radio-button label="Retangle"></el-radio-button>
            <el-radio-button label="Round"></el-radio-button>
            <el-radio-button label="Cat-eye"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="鼻托类型">
          <el-radio-group v-model="form.shape" size="medium">
            <el-radio-button label="Square" ></el-radio-button>
            <el-radio-button label="Retangle"></el-radio-button>
            <el-radio-button label="Round"></el-radio-button>
            <el-radio-button label="Cat-eye"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="维度">
          <el-col :span="6">
            <el-input v-model="form.price">
              <el-button slot="append">mm</el-button>
            </el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="6">
            <el-input v-model="form.price">
              <el-button slot="append">mm</el-button>
            </el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="6">
            <el-input v-model="form.price">
              <el-button slot="append">mm</el-button>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="form.state">
            <el-radio label="待上架" value="0"></el-radio>
            <el-radio label="上架中" value="1"></el-radio>
            <el-radio label="已下架" value="2"></el-radio>
          </el-radio-group>
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

        <el-form-item>
          <el-button type="primary" @click="onNext">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="uploadDiv" v-else-if="active===1">
      <el-form ref="form" :model="form" label-width="140px">

        <el-form-item label="商品封面图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品展示列表图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="form.imageList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品详情图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="form.imageList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button @click="onPrevious">上一步</el-button>
          <el-button type="primary" @click="onNext">下一步</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div v-else-if="active===2">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商品封面图片">

        </el-form-item>
        <el-form-item label="商品展示列表图片">

        </el-form-item>
        <el-form-item label="商品详情图片">

        </el-form-item>

        <el-form-item>
          <el-button @click="onPrevious">上一步</el-button>
          <el-button type="primary" @click="onNext">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-else>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商品封面图片">

        </el-form-item>
        <el-form-item label="商品展示列表图片">

        </el-form-item>
        <el-form-item label="商品详情图片">

        </el-form-item>

        <el-form-item>
          <el-button @click="onPrevious">上一步</el-button>
          <el-button type="primary" @click="onSubmit">完成</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "addFrame",
  data() {
    return {
      active:0,
      form: {
        frameID: '',
        frameName: '',
        price: 0.00,
        material: '',
        shape: '',
        nosePad: '',
        state: "0",
        description: '',
        sketch:'',
        classification: [],
        tab:[],
        keyword: [],
        imageList: [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
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
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    onNext() {
      this.active++
    },
    onPrevious() {
      this.active--
    },
    onSubmit() {
      console.log(this.form);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
.infoForm{
  width: 700px;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
}
.uploadDiv{
  width: 700px;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
}
</style>
