<template>
  <div class="g-table-optional">
    <div class="_header">{{ title }}</div>
    <div class="_body">
      <div class="_optional">
        <div
          :class="['optional-item', select === obj ? 'selectStyle' : '']"
          v-for="(obj, index) in options"
          :key="index"
          @click="() => selectHandle(obj)"
        >
          <span class="ordernum">{{ index + 1 }}</span>
          <span class="content">{{ obj.name }}</span>
          <!-- <i
            class="iconfont icon-close"
            :style="{ visibility: select === obj ? 'unset' : 'hidden' }"
            @click.stop="() => deleteHandle(obj)"
          ></i> -->
        </div>
        <div
          class="empty"
          v-for="(i, index) in new Array(options.length % 4)"
          :key="`empty${index}`"
        >
          <div class="empty-content"></div>
        </div>
      </div>
      <div class="_pagination">
        <g-pagination :total="total" @change="onPageChange"></g-pagination>
      </div>
      <div class="_table">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-table-optional",
  props: ["title", "options", "total"],
  data() {
    return {
      select: {},
    };
  },
  watch: {
    select(v) {
      this.$emit("change", v);
    },
  },
  methods: {
    onPageChange({ current, size }) {
      console.log(size);
      this.page.pageSize = size || this.page.pageSize;
    },
    selectHandle(t) {
      this.select = t;
    },
    deleteHandle(t) {
      this.$emit("delete", t);
    },
  },
};
</script>

<style lang="scss">
.g-table-optional {
  margin: 15px 0px;
  min-width: 800px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  ._header {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 13px;
    font-weight: bolder;
    color: #666666;
    border-bottom: 1px solid #dee2e8;
  }

  ._body {
    padding: 0 20px;

    ._optional {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px 0;

      .optional-item {
        min-width: calc(25% - 45px);
        height: 40px;
        font-size: 13px;
        color: #000;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dee2e8;

        &.selectStyle {
          background-color: #0690f2;
          color: #ffffff;
        }

        &:hover {
          cursor: pointer;
          background-color: rgba(6, 144, 242, 0.11);
          color: #000;
        }

        .ordernum {
          width: 32px;
          margin-right: 14px;
          text-align: center;
        }

        .content {
          min-width: 200px;
        }

        .icon-close {
          font-size: 10px;
          padding: 10px;
          margin-left: auto;
        }
      }

      .empty {
        min-width: calc(25% - 45px);
        height: 0;

        .empty-content {
          min-width: 276px;
        }
      }
    }

    ._pagination {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 5px 0;
    }

    ._table {
      padding: 20px 0 0;

      .el-table {
        .el-table__header-wrapper {
          .has-gutter {
            tr > th {
              background-color: #eaedf1;
            }
          }
        }
        th {
          background: #eaedf1;
        }
      }
    }
  }
}
</style>
