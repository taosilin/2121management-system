<template>
  <div>
    <div class="infoForm">
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
             <el-radio-button v-for="item in form.materials" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="外观形状">
          <el-radio-group v-model="form.shape" size="medium">
            <template v-for="item in form.shapes">
              <el-radio-button :label="item.valueName" ></el-radio-button>
            </template>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="鼻托类型">
          <el-radio-group v-model="form.nosePad" size="medium">
            <template v-for="item in form.nosePads">
              <el-radio-button :label="item.valueName" ></el-radio-button>
            </template>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="维度">
          <el-col :span="6">
            <el-input v-model="form.dimensions[0]">
              <el-button slot="append">mm</el-button>
            </el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="6">
            <el-input v-model="form.dimensions[1]">
              <el-button slot="append">mm</el-button>
            </el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="6">
            <el-input v-model="form.dimensions[2]">
              <el-button slot="append">mm</el-button>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="form.state">
            <el-radio label="0">待上架</el-radio>
            <el-radio label="1">上架中</el-radio>
            <el-radio label="2">已下架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品简述">
          <el-input v-model="form.sketch" placeholder="商品简述"></el-input>
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
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品详情图片">
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :http-request="handleUploadDescription"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'addFrame',
  data () {
    return {
      form: {
        frameID: '',
        frameName: '',
        price: 0.00,
        material: '',
        shape: '',
        dimensions: [0, 0, 0],
        nosePad: '',
        state: '0',
        description: [],
        sketch: '',
        classification: [],
        tab: [],
        keyword: [],
        coverImage: '',
        imageList: [],

        materials: [],
        shapes: [],
        nosePads: [],

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
      // 上传数量限制
      limitNum: 1,
      //图片上传组件的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
  },
  created () {
    axios.post('http://129.211.168.202:8088/value/attribute',{
      attributeID: "材料"
    }).then(response => {
      this.form.materials = response.data.data
    }).catch(error => {
      console.log(error)
    })

    axios.post('http://129.211.168.202:8088/value/attribute',{
      attributeID: "形状"
    }).then(response => {
      this.form.shapes = response.data.data
    }).catch(error => {
      console.log(error)
    })

    axios.post('http://129.211.168.202:8088/value/attribute',{
      attributeID: "鼻托"
    }).then(response => {
      this.form.nosePads = response.data.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    // 上传商品封面图片
    handleUploadCoverImage(param){
      const formData = new FormData()
      formData.append('imageFile', param.file)
      axios.post('http://129.211.168.202:8088/frame/uploadImage',formData)
        .then(response => {
          console.log('上传图片成功')
          // console.log(response)
          param.onSuccess()  // 上传成功的图片会显示绿色的对勾
          this.form.coverImage = response.data
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
      axios.post('http://129.211.168.202:8088/frame/uploadImage',formData)
        .then(response => {
          console.log('上传图片成功')
          // console.log(response)
          param.onSuccess()  // 上传成功的图片会显示绿色的对勾
          this.form.imageList.push(response.data)
          // console.log(this.form.imageList)
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
      axios.post('http://129.211.168.202:8088/frame/uploadImage',formData)
        .then(response => {
          console.log('上传图片成功')
          // console.log(response)
          param.onSuccess()  // 上传成功的图片会显示绿色的对勾
          this.form.description.push(response.data)
          // console.log(this.form.description)
          // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
        }).catch(error => {
        console.log('图片上传失败')
        param.onError()
      })
    },

    // 提交添加镜框
    onAdd () {
      axios.post('http://129.211.168.202:8088/frame/add', {
        frameID: this.form.frameID,
        frameName: this.form.frameName,
        price: this.form.price,
        material: this.form.material,
        shape: this.form.shape,
        nosePad: this.form.nosePad,
        dimension: this.form.dimensions.join('-'),
        state: this.form.state,
        imageList: this.form.imageList.toString(),
        description: this.form.description.toString(),
        classification: this.form.classification.toString(),
        tab: this.form.tab.toString(),
        coverImage: this.form.coverImage,
        sketch: this.form.sketch,
        keyword: this.form.keyword.toString()
      }).then(response => {
        if (response.data.code === 200){
          this.$message({
            showClose: true,
            message: '添加镜框成功！',
            type: 'success'
          })
          this.$router.push('/frame')
          location.reload()
        }
        else if (response.data.code === 400){
          this.$message({
            showClose: true,
            message: response.data.message,
            type: 'error'
          })
        }
        else{
          this.$message({
            showClose: true,
            message: '添加失败，请联系管理员',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
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

    //文件上传成功时的钩子
    // onSuccess (response, file, fileList) {
    //   console.log(response.data)    //服务器返回的图片信息，可以提交到表格
    //   this.$message({
    //     message: '图片上传成功',
    //     type: 'success'
    //   })
    //   this.$refs.upload.clearFiles()//上传成功清除列表，否则每次上传都要删掉上次上传的列表
    // },
    // onError(err, file, fileList) {
    //   // console.log(err.msg)
    //   this.$message.error(err.msg)
    // },
    //upload 改变时  触发的函数   主要目的为保存 filelist 和 大小限制
    // addFile(file, fileList) {
    //   this.files = fileList;//主要用于接收存放所有的图片信息
    //   //限制上传文件为2M
    //   console.log(this.files)
    //   console.log(fileList)
    //   let sizeIsSatisfy = file.size < 2 * 1024 * 1024 ? true : false
    //   if (sizeIsSatisfy) {
    //     return true;
    //   } else {
    //     this.fileSizeIsSatisfy = true;
    //     return false;
    //   }
    // },
    // submitForm(formName) {//提交form表单
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       if (this.files.length <= 0) {
    //         this.$message.error("请至少上传一个文件！");
    //         return;
    //       }
    //       if (this.fileSizeIsSatisfy) {
    //         this.$message.error("上传失败！存在文件大小超过2M！");
    //         return;
    //       }
    //       this.processFile();//处理files的数据变成键值对的形式   返回newFiles这个数组
    //       var param = new FormData(); // FormData 对象
    //       newFiles.forEach(fileItem => {
    //         var list = fileItem;
    //         var file = list.imgFile;
    //         param.append("files", file); // 文件对象
    //       });
    //       getImgUrl(param).then(
    //         msg => {
    //           console.log(msg);//拿到想要的图片地址
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //       );
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    // //全部的图片添加到 newFiles中
    // processFile() {
    //   this.files.forEach(item => {
    //     let objFile = {};
    //     objFile.title = "files";
    //     objFile.imgFile = item.raw;
    //     this.newFiles.push(objFile);
    //   });
    // },
    // openModal(val, data) {
    //   let fileArr = [];
    //   let fileObj = {};
    //   fileObj.name="file";
    //   fileObj.url = data.file;
    //   fileArr.push(fileObj);
    //   this.showFiles = fileArr
    // }

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
