<template>
  <div class="container">
    <div class="form-box" :style="{ transform: isRegistering ? 'translateX(80%)' : 'translateX(0%)' }">
      <!-- 注册 -->
      <div class="register-box" :class="{ hidden: !isRegistering }">
        <h1>register</h1>
        <input type="text" placeholder="用户名" v-model="registerData.username" />
        <input type="text" placeholder="手机号" v-model="registerData.phone" />
        <input type="password" placeholder="密码" v-model="registerData.password" />
        <input type="password" placeholder="确认密码" v-model="registerData.confirm_password" />
        <button @click="register">注册</button>
      </div>
      <!-- 登录 -->
      <div class="login-box" :class="{ hidden: isRegistering }">
        <h1>login</h1>
        <input type="text" placeholder="用户名" v-model="loginData.username" />
        <input type="password" placeholder="密码" v-model="loginData.password" />
<!--        <p class="forgot-password" @click="">忘记密码？</p>-->
        <button @click="login">登录</button>
      </div>
    </div>

    <div class="con-box left">
      <h2>WELCOME</h2>
      <img src="@/assets/vue.svg" alt="" />
      <p>已有账号</p>
      <button @click="switchToLogin">去登录</button>
    </div>

    <div class="con-box right">
      <h2>WELCOME</h2>
      <img src="@/assets/vue.svg" alt="" />
      <p>没有账号？</p>
      <button @click="switchToRegister">去注册</button>
    </div>
  </div>
</template>

<script>
import { Login, Register, CheckUsernameExist, CheckPhoneExist } from "@/api/api";

export default {
  data() {
    return {
      isRegistering: false,
      loginData: {
        username: '',
        password: ''
      },
      registerData: {
        username: '',
        phone: '',
        password: '',
        confirm_password: ''
      }
    };
  },
  methods: {
    switchToLogin() {
      this.isRegistering = false;
    },
    switchToRegister() {
      this.isRegistering = true;
    },

    async login() {
      if (!this.loginData.username || !this.loginData.password) {
        alert("请输入用户名和密码");
        return;
      }

      try {
        const response = await Login(this.loginData);
        console.log("登录成功:", response.data);

        this.$store.dispatch('login', response.data.access);
        this.$router.push('/index');
      } catch (error) {
        console.error("登录失败:", error.response?.data || error.message);
        alert("用户名或密码错误");
      }
    },

    async register() {
      if (this.registerData.password !== this.registerData.confirm_password) {
        alert("密码与确认密码不匹配，请重新输入！");
        return;
      }

      // **密码格式校验：至少8位，只能包含字母和数字**
      const passwordRegex = /^[A-Za-z0-9]{8,}$/;
      if (!passwordRegex.test(this.registerData.password)) {
        alert("密码必须至少8位，并且只能包含字母和数字！");
        return;
      }

      const phoneRegex = /^\d{11}$/;
      if (!phoneRegex.test(this.registerData.phone)) {
        alert("手机号必须为11位数字");
        return;
      }

      async function checkUsernameExist(username) {
        try {
          const response = await CheckUsernameExist(username);
          return response.data;
        } catch (error) {
          console.error('检查用户名是否存在时出错:', error.response?.data || error.message);
          throw error;
        }
      }

      async function checkPhoneExist(phone) {
        try {
          const response = await CheckPhoneExist(phone);
          return response.data;
        } catch (error) {
          console.error('检查手机号是否存在时出错:', error.response?.data || error.message);
          throw error;
        }
      }

      try {
        const checkResponse = await checkUsernameExist(this.registerData.username);
        if (checkResponse.exists) {
          alert("用户名已存在，请选择其他用户名");
          return;
        }

        const phoneResponse = await checkPhoneExist(this.registerData.phone);
        if (phoneResponse.exists) {
          alert("手机号已被注册，请使用其他手机号");
          return;
        }

        const response = await Register(this.registerData);
        console.log("注册成功:", response);
        this.switchToLogin();
      } catch (error) {
        console.error("注册失败:", error.response?.data || error.message);
      }
    }


  }
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.container{
  background-color: #fff;
  width: 650px;
  height: 415px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
  position: relative;
  top:18%;
}

.form-box{
  position: absolute;
  top: -10%;
  left: 5%;
  background-color: #899a8c;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}
.register-box,.login-box{
  /* 弹性布局 垂直排列 */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  user-select: none;
}
.hidden{
  display: none;
  transition: 0.5s;
}
h1{
  text-align: center;
  margin-bottom: 25px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 5px;
  font-size: 2.5em;
  user-select: none;
}

input{
  background-color: transparent;
  width: 70%;
  color: #fff;
  border: none;
  /* 下边框样式 */
  border-bottom: 1px solid rgba(255,255,255,0.4);
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}

input::placeholder{
  color: #fff;
}

input:focus{
  color: #444343;
  outline: none;
  border-bottom: 1px solid #444343;
  transition: 0.5s;
}

input:focus::placeholder{
  opacity: 0;
}

.form-box button{
  width: 70%;
  margin-top: 30px;
  background-color: #f6f6f6;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #536555;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}
.form-box button:hover{
  background-color: #536555;
  color: #f6f6f6;
  transition: background-color 0.5s ease;
}
.con-box{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
}
.con-box.left{
  left: -2%;
}
.con-box.right{
  right: -2%;
}
.con-box h2{
  color: #8e9aaf;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 4px;
  font-family: 'ShangGuB', sans-serif;
  user-select: none;
}
.con-box p{
  font-size: 12px;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
  user-select: none;
}
.con-box span{
  color: #536555;
  user-select: none;
}

.con-box img{
  width: 150px;
  height: 150px;
  opacity: 0.9;
  margin: 40px 0;
  user-select: none;
}

.con-box button{
  margin-top: 3%;
  background-color: #fff;
  color: #536555;
  border: 1px solid #536555;
  padding: 6px 10px;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
  user-select: none;
}
.con-box button:hover{
  background-color: #536555;
  color: #fff;
}

.forgot-password {
  color: #000000;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
  font-size: 0.6em;
}

</style>
