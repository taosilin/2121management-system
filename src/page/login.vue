<template>
  <div class="sign-in">
    <el-card class="card-container">

      <img class="logoImg" src="../assets/logo.png" />

      <h3>2121EyeWear后台管理系统</h3>

      <el-input class="input"
        placeholder="请输入用户名"
        v-model="adminID"
        clearable>
        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
      </el-input>

      <el-input class="input"
        placeholder="请输入密码"
        v-model="password"
        show-password>
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>

      <el-button type="primary" @click="handleLogin">登录</el-button>

    </el-card>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "login",
  data(){
    return {
      adminID: '',
      password: ''
    }
  },
  methods: {
    handleLogin(){
      //此处填写管理员登录接口
      axios.post('http://localhost:8088/admin/login',{
        adminID: this.adminID,
        password: this.password
      }).then(response=>{
        if (response.data.code==200){
          this.$router.push("/home")
          this.$message({
            showClose: true,
            message: '登录成功！',
            type: 'success'
          })
        }
        else{
          this.$message({
            showClose: true,
            message: '用户名或密码错误',
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
.sign-in{
  width: 100%;
  display: flex;
  justify-content: center;
}
.card-container{
  width: 400px;
}
.logoImg{
  width: 100px;
}
.input{
  margin-bottom: 20px;
}
</style>
