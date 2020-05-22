<template>
  <div class="page page-test">
    <div class="creator-header">
      <g-header button>
        <g-button
          icon="icon-right-double"
          type="primary"
          @click="onBtnFffHandle"
        >
          fff
        </g-button>
      </g-header>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      visible: {
        goodsImportDialogVisible: false,
      },
    };
  },
  methods: {
    onBtnFffHandle() {
      this.openGoodsImportDialog();
    },
    openGoodsImportDialog() {
      this.visible.goodsImportDialogVisible = true;
    },
  },
};
</script>
<style>
.page-test {
}
</style>
