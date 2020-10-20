<template>
  <div>编辑镜框信息</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'editFrame',
  data() {
    return {
      frameDetail: {},
      attributes: [],
      specs: []
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
