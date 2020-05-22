<template>
  <div class="g-form-file" :class="{ 'is-detail': isDetail }">
    <div class="_items">
      <div class="_item" v-for="(file, i) in list" :key="file">
        <span class="_name">附件名称.pdf</span>
        <span class="_size">2.13MB</span>
        <span class="_progress" v-if="!isDetail">
          <span>
            <span :style="{ width: '50%' }"></span>
          </span>
          <b>50%</b>
        </span>
        <i
          v-if="!isDetail"
          class="iconfont icon-close"
          @click="() => list.splice(i, 1)"
        ></i>
        <el-button type="text" v-else>查看</el-button>
      </div>
    </div>
    <div v-if="!isDetail" class="_tool">
      <g-button @click="() => {}" :icon="icon">{{ name }}</g-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GFormFile",
  props: ["files", "name", "icon", "isDetail"],
  data() {
    return {
      list: [],
    };
  },
  watch: {
    files: {
      immediate: true,
      deep: true,
      handler(v) {
        this.list = v;
      },
    },
  },
};
</script>

<style lang="scss">
.g-form-file {
  width: 100%;
  &.is-detail {
    ._items ._item:last-child {
      border-bottom: none;
    }
  }
  ._item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;
    font-size: 13px;
    color: #333;
    &:last-child {
      margin-bottom: 13px;
    }
    .icon-close {
      font-size: 12px;
      color: #555;
      cursor: pointer;
      padding: 0 10px;
      margin-right: -10px;
      position: relative;
      top: 1px;
      margin-left: 10px;
      &:hover {
        color: #999;
      }
    }
    ._name {
      flex: 1;
      margin-right: 13px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    ._progress {
      display: flex;
      align-items: center;
      > span {
        display: inline-block;
        height: 12px;
        background: #eaedf1;
        border-radius: 6px;
        width: 100px;
        margin-right: 13px;
        margin-left: 13px;
        overflow: hidden;
        > span {
          display: block;
          height: 12px;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
          background: #0690f2;
          transition: all 0.3s;
        }
      }
    }
    .el-button {
      margin-right: -10px;
      margin-left: 30px;
    }
  }
  ._tool {
    .el-button {
      color: #0690f2;
      background: rgba(245, 245, 245, 1);
      border: 1px solid rgba(225, 225, 225, 1);
      font-weight: normal;
    }
    .icon-image {
      font-size: 20px;
    }
  }
}
</style>
