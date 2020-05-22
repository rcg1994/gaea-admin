<template>
  <div class="g-pagination">
    <span>
      共有<b>{{ page.total }}</b
      >条，每页显示行
    </span>
    <el-pagination
      ref="pagination"
      background
      @size-change="onPageSizeChange"
      @current-change="onPageChange"
      :current-page="page.current"
      :page-sizes="[20, 50, 100]"
      :page-size="page.size"
      layout="sizes, prev, pager, next"
      :total="page.total"
    ></el-pagination>
    <span class="_jumper">
      <el-input v-model="page.jump"></el-input>
      <el-button @click="() => this.onPageChange(page.jump)">跳转</el-button>
    </span>
  </div>
</template>

<script>
export default {
  name: "GPagination",
  props: ["total"],
  data() {
    return {
      page: {
        total: 400,
        size: 20,
        current: 1,
        jump: "",
      },
    };
  },
  watch: {
    total: {
      immediate: true,
      handler(v) {
        this.page.total = v;
      },
    },
  },
  mounted() {
    this.rebuildSize();
  },
  methods: {
    rebuildSize() {
      this.$nextTick(() => {
        this.$refs.pagination.$el.querySelector(
          ".el-pagination__sizes input"
        ).value = this.page.size;
      });
    },
    onPageSizeChange(n) {
      this.page.size = n;
      this.$emit("change", this.page);
      this.rebuildSize();
    },
    onPageChange(n) {
      this.page.current = Number(n);
      this.page.jump = "";
      this.$emit("change", this.page);
    },
  },
};
</script>

<style lang="scss">
.g-pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #777;
  font-size: 12px;

  > span b {
    color: #0690f2;
    margin: 0 8px;
  }

  ._jumper {
    display: flex;
    flex-direction: row;
    align-items: center;

    .el-input__inner {
      height: 34px;
      border-radius: 0;
      width: 48px;
      margin-left: 23px;
      margin-right: 9px;
      text-align: center;
      padding: 0;
    }

    .el-button {
      height: 34px;
      line-height: 34px;
      padding: 0 9px;
      color: #333;
      font-size: 12px;
      background: rgba(242, 245, 248, 1);
      border: 1px solid rgba(213, 213, 213, 1);
    }
  }
}
</style>
