<template>
  <div class="sign-in">
    <div class="ms-login">
      <img class="logoImg" src="../assets/logo.png" />
      <div class="login-title">2121EyeWear 后台管理系统</div>
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
      <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "login",
  data(){
    return {
      adminID: '',
      password: ''
    }
  },
  methods: {

    // 管理员登录
    handleLogin(){
      axios.post('https://from2121:8443/admin/login',{
        adminID: this.adminID,
        password: this.password
      }).then(response => {

        if (response.data.code === 200){
          localStorage.setItem('adminID', this.adminID)

          if (this.$route.query.redirect){
            let redirect = this.$route.query.redirect
            this.$router.push(redirect)
            this.$message({
              showClose: true,
              message: '登录成功！',
              type: 'success'
            })
          }
          else{
            this.$router.push("/home")
            this.$message({
              showClose: true,
              message: '登录成功！',
              type: 'success'
            })
          }
        }
        else{
          this.$message({
            showClose: true,
            message: '用户名或密码错误',
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
.sign-in{
  width: 100%;
  height: 1000px;
  background-image: url(../assets/background.jpg);
  background-size: 100%;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  margin: -300px 0 0 -200px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0);
  overflow: hidden;
}
.login-title{
  font-size: 25px;
  color: #ffffff;
  margin: 20px;
}
.logoImg{
  width: 100px;
}
.input{
  margin-bottom: 30px;
}
.login-btn{

}
</style>
