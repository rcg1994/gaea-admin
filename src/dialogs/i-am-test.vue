/* 弹窗测试 */
<template>
  <el-dialog
    append-to-body
    modal-append-to-body
    destroy-on-close
    title="弹窗测试"
    custom-class="creator-layout-dialog"
    :close-on-click-modal="false"
    :visible.sync="show"
    :width="width"
  >
    <div class="creator-button-box is-size-small">
      <g-button
        icon="icon-right-double"
        type="primary"
        @click="onBtnTestHandle"
      >
        test
      </g-button>
      <g-button icon="icon-refresh" type="default" @click="onBtnTest2Handle">
        test2
      </g-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "780px",
    },
  },
  data() {
    return {
      form: {},
      formRules: { test: true, test2: true },
      show: this.visible,
    };
  },
  watch: {
    show(v) {
      console.log(v);
      this.$emit("update:visible", v);
    },
    visible(v) {
      this.show = v;
    },
  },
  methods: {
    onBtnTest2Handle() {},
    onBtnTestHandle() {},
  },
};
</script>
<style>
.page-i-am-test {
}
</style>
