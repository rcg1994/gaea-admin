<template>
  <div class="hello">
    <el-button :loading="loading" type="primary" @click="updateName"
      >updateName</el-button
    >
    <br />
    <br />
    <el-button type="primary" @click="() => setName('王五')">setName</el-button>
    <br />
    <br />
    {{ userName }}
    <br />
    <br />
    {{ getHelloUser }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import Helper from "../libs/Helper";

const User = namespace("user");

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  @State user: any;
  @User.Getter("userName") userName: any;
  @User.Action updateNameAsync: any;
  @User.Mutation setName: any;

  num: number = 1;
  loading: boolean = false;

  @Watch("num")
  onNumChange(v: number) {
    console.log("change", v);
  }

  @Watch("user", { deep: true })
  onUserChange(v: any) {
    console.log("user change", v);
  }

  get getHelloUser(): string {
    return `你好，${this.userName}`;
  }

  mounted() {
    console.log("mounted");
    Helper.addEventListener("app/ready", this.appInit);
    Helper.dispatchEvent("app/ready");
  }

  destroyed() {
    console.log("destroyed");
    Helper.removeEventListener("app/ready", this.appInit);
  }

  async updateName() {
    this.loading = true;
    let re = await this.updateNameAsync();
    this.loading = false;
    console.log(re);
  }

  removeHandle() {
    Helper.removeEventListener("app/ready", this.appInit);
  }

  showHandle() {
    this.appInit();
  }

  appInit() {
    console.log("app/ready");
  }

  clickHandle(): void {
    this.num = this.num + 1;
    console.log("clickHandle", this.num);
  }
}
</script>
