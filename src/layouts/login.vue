<template>
  <div class="layout-login">
    <div class="_box">
      <div class="_form">
        <el-form>
          <el-form-item label="">
            <el-input
              placeholder="请输入账号"
              v-model="form.account"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="login" type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { fetchApiFake } from "../services";
export default {
  data() {
    return {
      form: {
        account: "001",
        password: "123456",
      },
    };
  },
  methods: {
    login() {
      return fetchApiFake({
        ...this.form,
      }).then(d => {
        if (d !== "fail") {
          Cookie.set("token", d.token);
          this.$router.push({
            path: "/",
          });
        }
      });
    },
  },
};
</script>
