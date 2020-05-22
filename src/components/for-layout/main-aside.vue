<template>
  <div class="layout-main_aside g-aside" :class="{ 'is-collapse': collapse }">
    <div @click="() => (collapse = false)" class="_open-button">
      <i class="iconfont icon-aside-right"></i>
    </div>
    <div @click="() => (collapse = true)" class="_toggle">
      <i class="iconfont icon-aside-left"></i>
    </div>
    <div class="layout-main_aside-content">
      <g-scroll ref="scroll" is-dark :x="false">
        <el-menu
          router
          class="_menu"
          :default-active="active"
          @open="handleOpen"
          @close="handleClose"
          background-color="#333"
          text-color="#bbb"
          active-text-color="#0690F2"
        >
          <el-submenu
            v-for="topMenu in menu"
            :key="topMenu.id"
            :index="topMenu.id"
          >
            <template slot="title">
              <span class="_parent">
                <i class="iconfont icon-down"></i>
                <img :src="menuIcon[topMenu.icon]" alt="" />
                <b>{{ topMenu.name }}</b>
              </span>
            </template>
            <template v-for="page in topMenu.children">
              <el-menu-item v-if="page.leaf" :key="page.id" :index="page.href">
                {{ page.name }}
              </el-menu-item>
              <el-submenu :key="page.id" :index="page.id" v-else>
                <template slot="title">
                  <span class="_parent">
                    <i class="iconfont icon-down"></i>
                    <b>{{ page.name }}</b>
                  </span>
                </template>
                <el-menu-item
                  v-for="final in page.children"
                  :key="final.id"
                  :index="final.href"
                >
                  {{ final.name }}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
        </el-menu>
      </g-scroll>
    </div>
  </div>
</template>

<script>
import Helper from "../../libs/Helper";
import { InfoManagePages } from "../../router/info-manage-pages";
import { fetchApiFake } from "../../services";

export default {
  data() {
    return {
      active: "",
      collapse: localStorage.getItem("app/menu/collapse") === "1",
      infoManagePages: InfoManagePages,
      menu: [],
      menuIcon: {
        main: require("../../assets/menu/jcxx.png"),
      },
    };
  },
  created() {
    this.getPages();
  },
  mounted() {
    console.log(this.$route.path);
    // this.active = this.$route.path;
  },
  watch: {
    collapse(v) {
      Helper.dispatchEvent("app/menu/collapse", v);
      localStorage.setItem("app/menu/collapse", v ? "1" : "0");
    },
    "$route.path"(path) {
      this.active = path;
    },
  },
  methods: {
    getPages() {
      return fetchApiFake().then(d => {
        if (d !== "fail") {
          d = [
            {
              name: "所有页面",
              icon: "main",
              id: "main",
              children: this.infoManagePages.map(item => {
                return {
                  name: item[0],
                  id: item[1],
                  href: item[1],
                  leaf: true,
                };
              }),
            },
          ];
          this.menu = Helper.sort(d);
          // this.$router.push(this.menu[0].children[0].href);
        }
      });
    },
    handleOpen() {
      Helper.sleep(400).then(() => {
        this.$refs.scroll.update();
      });
    },
    handleClose() {
      Helper.sleep(400).then(() => {
        this.$refs.scroll.update();
      });
    },
  },
};
</script>

<style lang="scss">
.layout-main_aside {
  user-select: none;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  ._menu {
    user-select: none;
    border-right: 0;
    width: 220px;
    z-index: 3;
    position: relative;
  }
  .layout-main_aside-content {
    flex: 1;
    overflow: hidden;
  }
  .el-submenu {
    .el-submenu__icon-arrow {
      display: none;
    }
    &__title {
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      cursor: pointer;
      ._parent {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding-left: 15px;
        font-size: 14px;
        img {
          height: 18px;
          margin-right: 5px;
        }
        .iconfont {
          font-size: 12px;
          position: absolute;
          color: #777;
          margin-right: 4px;
          transform: rotateZ(-90deg) scale(0.8);
          left: -10px;
          transition: transform 0.3s;
        }
        b {
          color: #bbb;
          font-weight: bold;
        }
      }
    }
    .el-menu-item {
      padding-left: 50px !important;
      padding-right: 20px !important;
      font-weight: bold;
      font-size: 13px;
      height: 44px;
      line-height: 44px;
      cursor: pointer;
      background: #262626 !important;
    }
    .el-submenu {
      .el-menu-item {
        padding-left: 65px !important;
      }
      .el-submenu__title {
        padding-left: 30px !important;
        height: 44px;
        line-height: 44px;
        ._parent {
          font-size: 13px;
          margin-left: 4px;
        }
      }
    }
    &.is-opened {
      > .el-submenu__title {
        background: #262626 !important;
        ._parent {
          .iconfont {
            transform: rotateZ(0) scale(0.8);
          }
        }
      }
    }
  }
  ._toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #444;
    color: #777;
    cursor: pointer;
    z-index: 3;
    position: relative;
    padding: 5px 0;
    i {
      font-size: 12px;
    }
    &:hover {
      background: #555;
      i {
        color: #999;
      }
    }
  }
  &.is-collapse {
    width: 0;
    ._open-button {
      left: 0;
    }
  }
  ._open-button {
    height: 36px;
    width: 30px;
    position: fixed;
    background: #c8cbd0;
    color: #333;
    z-index: 222;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    left: -36px;
    transition: left 0.6s;
    i {
      font-size: 12px;
    }
    &:hover {
      background: #c2c5ca;
    }
  }
}
</style>
