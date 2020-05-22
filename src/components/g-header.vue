<template>
  <div :class="['g-header', alone ? 'alone' : '']" :style="hStyle">
    <el-button type="text" @click="backHandle" class="_back" v-show="!button">
      <i class="el-icon-arrow-left"></i>{{ backText }}
    </el-button>
    <div class="_title" v-show="!button">{{ title }}</div>
    <div v-show="button">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-header",
  props: {
    title: {
      type: String,
    },
    backText: {
      default: "返回",
    },
    hStyle: {},
    alone: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Boolean,
      default: false,
    },
    path: {
      type: String,
      default: "",
    },
  },
  mounted() {
    // console.log(this.hStyle, this.title, this.alone);
  },
  methods: {
    async backHandle() {
      let current = this.$route.path;
      if (this.path) {
        this.$router.push(this.path);
      } else {
        this.$router.go(-1);
      }
      this.$nextTick(() => {
        this.$routerTab.close(current, false, true);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.g-header {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: 1px solid #e9ecf1;
  position: relative;

  &.alone {
    background-color: #ffffff;
    border: none;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  }

  ._back {
    font-size: 14px;
    color: #666666;
    font-weight: 400;
    position: absolute;
    left: 12px;

    i {
      margin-right: 7px;
    }
  }

  ._title {
    font-size: 16px;
    font-weight: bolder;
    color: #333333;
  }
}
</style>
