<template>
  <div class="layout-main_header">
    <div class="layout-main_header_logo">
      GAEA-ADMIN
    </div>
    <div class="layout-main_header_tool">
      <creator-button v-if="!isPro" class="_creator">
        <i class="iconfont icon-creator"></i>
      </creator-button>
      <span class="_message is-touchable">
        <i class="iconfont icon-message"></i>
        <b>0</b>
      </span>
      <span class="_help is-touchable">
        <i class="iconfont icon-help"></i>
        <b>帮助</b>
      </span>
      <el-popover placement="bottom" width="200" trigger="click">
        <div></div>
        <span class="_avatar is-touchable" slot="reference">
          <img src="../../assets/avatar.png" alt="" />
          <b>管理员</b>
          <i class="iconfont icon-down"></i>
        </span>
      </el-popover>
    </div>
  </div>
</template>

<script>
import CreatorButton from "../../../creator/trigger.vue";

export default {
  components: {
    CreatorButton,
  },
  data() {
    return {
      isPro: process.env.NODE_ENV === "production",
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.layout-main_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &_logo {
    font-size: 16px;
    padding: 0 15px;
    img {
      height: 34px;
    }
  }
  &_tool {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    > span {
      position: relative;
      height: 40px;
      line-height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      &:first-child::before {
        display: none;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        height: 18px;
        width: 1px;
        background: #fff;
      }
    }
    ._creator {
      .g-creator-trigger {
        color: #ffb1b1;
        padding: 20px;
      }
    }
    ._message {
      color: #ffeda6;
      padding: 0 23px;
      .icon-message {
        margin-right: 4px;
      }
    }
    ._help {
      padding: 0 24px 0 22px;
      .icon-help {
        margin-right: 4px;
      }
    }
    ._avatar {
      display: flex;
      align-items: center;
      padding: 0 20px 0 23px;
      img {
        height: 32px;
        width: 32px;
        margin-right: 8px;
      }
      b {
        font-weight: 400;
      }
      .icon-down {
        margin-left: 10px;
        font-size: 12px;
        // transform: scale(0.8);
      }
    }
  }
  .is-touchable {
    cursor: pointer;
    &:active {
      background: rgba(0, 0, 0, 0.03);
    }
  }
}
.layout-main_header_btn {
  .el-form-item__content {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
