<template>
  <div id="login">
    <div class="login_box">
      <!-- 头像 -->
      <div class="login_boxPic">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单 -->
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0"
        ref="loginFormRef"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="login_btn">
          <el-button type="primary" :plain="true" @click="login"
            >登录</el-button
          >
          <el-button type="info" @click="resetloginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //  点击重置
    resetloginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    // 验证是否登录成功
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status != 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");
        // 将登录成功之后的 token ，保存到客户端的 sessionStorage 中
        //项目中除了登录之外的其他API接口，必须在登录之后才能访问
        // token 只应在当前网站打开期间生效，所以 token 保存在 sessionStorage中
        console.log(res);
        window.sessionStorage.setItem("token", res.data.tolen);
        // 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push("/home");
      });
    },
  },
};
</script>



<style>
/* scoped   限制 css样式旨在当前页面有效果 */

#login {
  background: rgb(38, 74, 107);
  width: 100%;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_boxPic {
  width: 90px;
  height: 90px;
  border: 1px solid #f1f1f1;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  background: #fff;
  /* position: absolute; */
  /* left: 50%; */
  /* transform: translateY(-50%); */
  margin: 0 auto;
  margin-top: -45px;
}
.login_boxPic img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #f1f1f1;
}
.login_form {
  margin-top: 60px;
  padding: 0 20px;
}
.login_btn {
  display: flex;
  justify-content: flex-end;
}
</style>

