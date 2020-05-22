<template>
  <div class="g-form-box-item">
    <div class="_title">{{ title }}：</div>
    <div class="_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-form-box-item",
  props: {
    title: {
      type: String,
      required: true,
    },
    prop: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.g-form-box-item {
  display: flex;
  align-items: center;

  ._title {
    font-size: 13px;
    color: #333333;
    line-height: 50px;
    align-self: stretch;
    width: 160px;
    display: flex;
    justify-content: flex-end;
    border-right: 1px solid #d9e5ee;
    box-sizing: border-box;
    background-color: #f2faff;
    padding-right: 21px;
  }

  ._content {
    flex: 1;
    min-width: 0;
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    align-items: center;

    .el-input__inner {
      border-radius: 0;
    }

    .el-radio {
      color: #333333;
      font-weight: 400;

      .el-radio__label {
        font-size: 13px;
      }

      .el-radio__input.is-checked + .el-radio__label {
        color: #333333;
      }

      &.is-checked {
        .el-radio__inner {
          border: 1px solid #d5d5d5;
          background-color: #fff;

          &::after {
            width: 6px;
            height: 6px;
            background-color: #333333;
          }
        }
      }
    }

    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;

      .el-checkbox {
        // width: 16%;
        height: 25px;
        line-height: 25px;

        .el-checkbox__label {
          font-size: 13px;
          color: #333333;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
