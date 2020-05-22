<template>
  <div ref="scrollElement" class="g-scroll" :class="{ 'scroll-dark': isDark }">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from "perfect-scrollbar";

export default {
  name: "GScroll",
  props: {
    isDark: {
      type: Boolean,
      default: false,
    },
    x: {
      type: Boolean,
      default: true,
    },
    y: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  updated() {
    this.update;
  },
  methods: {
    update() {
      this.$nextTick(() => {
        this.scroll && this.scroll.update();
      });
    },
  },
  mounted() {
    let scrollElement = this.$refs.scrollElement;
    this.scroll = new PerfectScrollbar(scrollElement, {
      suppressScrollX: !this.x,
      suppressScrollY: !this.y,
    });
    window.addEventListener("resize", this.update);
  },
  destroyed() {
    window.removeEventListener("resize", this.update);
  },
};
</script>

<style lang="scss">
.g-scroll {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
