<template>
  <div>
    <div class="header">
      <el-row class="title">镜片 <span style="color: #72c9fa">{{lensDetail.lensID}}</span> 光度表</el-row>
      <el-row>{{lensDetail.refractiveIndex}} {{lensDetail.material}} {{lensDetail.radian}} {{lensDetail.variety}} {{lensDetail.film}} {{lensDetail.design}}</el-row>
    </div>
    <div>
      <el-table style="width: 100%">
        <el-table-column
          label="SPH"
          type="index"
          :index="sphMethod"
          width="80">
        </el-table-column>
        <el-table-column label="CYL">

          <el-table-column label="0">

          </el-table-column>

          <el-table-column label="-25"></el-table-column>
          <el-table-column label="-50"></el-table-column>
          <el-table-column label="-75"></el-table-column>
          <el-table-column label="-100"></el-table-column>
          <el-table-column label="-125"></el-table-column>
          <el-table-column label="-150"></el-table-column>
          <el-table-column label="-175"></el-table-column>
          <el-table-column label="-200"></el-table-column>
          <el-table-column label="-225"></el-table-column>
          <el-table-column label="-250"></el-table-column>
          <el-table-column label="-275"></el-table-column>
          <el-table-column label="-300"></el-table-column>
          <el-table-column label="-325"></el-table-column>
          <el-table-column label="-350"></el-table-column>
          <el-table-column label="-375"></el-table-column>
          <el-table-column label="-400"></el-table-column>
          <el-table-column label="-425"></el-table-column>
          <el-table-column label="-450"></el-table-column>
          <el-table-column label="-475"></el-table-column>
          <el-table-column label="-500"></el-table-column>
          <el-table-column label="-525"></el-table-column>
          <el-table-column label="-550"></el-table-column>
          <el-table-column label="-570"></el-table-column>
          <el-table-column label="-600"></el-table-column>
        </el-table-column>
      </el-table>
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
      stockList: [],
      lensStock: []
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

    axios.post('http://localhost:8088/lens/cyl',{
      lensID: lensID
    }).then(response => {
      this.lensStock = response.data.data

    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    //sph
    sphMethod(index){
      return 1200-index*25
    }
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
