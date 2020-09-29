<template>
  <div>
    镜片{{lensDetail.lensID}}光度表
    {{lensDetail.refractiveIndex}}{{lensDetail.material}}{{lensDetail.radian}}{{lensDetail.variety}}{{lensDetail.film}}{{lensDetail.design}}
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

</style>
