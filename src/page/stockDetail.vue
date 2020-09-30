<template>
  <div>
    <div class="header">
      <el-row class="title">镜片 <span style="color: #72c9fa">{{lensDetail.lensID}}</span> 光度表</el-row>
      <el-row>{{lensDetail.refractiveIndex}} {{lensDetail.material}} {{lensDetail.radian}} {{lensDetail.variety}} {{lensDetail.film}} {{lensDetail.design}}</el-row>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'stockDetail',
  data() {
    return {
      lensDetail: {},
      stockList: []
    }
  },
  created() {
    // 取到路由带过来的参数
    let lensID = this.$route.query.lensID
    axios.post('http://localhost:8088/lensstock/list',{
      lensID: lensID
    }).then(response => {
      this.stockList = response.data.data
    }).catch(error => {
      console.log(error)
    })

    axios.post('http://localhost:8088/lens/detail',{
      lensID: lensID
    }).then(response => {
      this.lensDetail = response.data.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

  }
}
</script>

<style scoped>
.header{
  width: 100%;
  text-align: left;
  font-size: 20px;
}
.title{
  font-weight: bold;
}
</style>
