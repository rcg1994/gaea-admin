<template>
  <div class="layout-main">
    <main-header></main-header>
    <div class="layout-main_body">
      <main-aside></main-aside>
      <div class="layout-main_content" :class="menuCollapse && '_full'">
        <router-tab restore />
      </div>
    </div>
  </div>
</template>

<script>
import Helper from "../libs/Helper";
import MainHeader from "../components/for-layout/main-header.vue";
import MainAside from "../components/for-layout/main-aside.vue";

export default {
  components: {
    MainHeader,
    MainAside,
  },
  data() {
    return {
      loading: false,
      menuCollapse: localStorage.getItem("app/menu/collapse") === "1",
    };
  },
  methods: {
    startLoadingPage() {
      this.loading = true;
    },
    endLoadingPage() {
      this.loading = false;
    },
    onMenuCollapse(v) {
      setTimeout(() => {
        this.menuCollapse = v;
      }, 300);
    },
  },
  mounted() {
    Helper.addEventListener("app/route/change/start", this.startLoadingPage);
    Helper.addEventListener("app/route/change/end", this.endLoadingPage);
    Helper.addEventListener("app/menu/collapse", this.onMenuCollapse);
  },
  destroyed() {
    Helper.removeEventListener("app/route/change/start", this.startLoadingPage);
    Helper.removeEventListener("app/route/change/end", this.endLoadingPage);
    Helper.removeEventListener("app/menu/collapse", this.onMenuCollapse);
  },
};
</script>
