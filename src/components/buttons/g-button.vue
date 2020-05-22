<template>
  <el-button
    class="g-button"
    :class="icon === 'icon-down' && '_more'"
    v-bind="$attrs"
    v-on="inputListeners"
  >
    <i v-if="icon !== 'icon-down'" class="iconfont" :class="icon"></i>
    <slot></slot>
    <i
      v-if="icon === 'icon-down'"
      class="iconfont"
      :class="{ _reverse: reverse, [icon]: true }"
    ></i>
  </el-button>
</template>

<script>
export default {
  name: "GButton",
  props: {
    icon: {
      type: String,
      required: true,
    },
    wait: {
      type: Number,
      default: 2000,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clickThrottle: this._.throttle(this.clickHandle, this.wait, {
        leading: true,
        trailing: false,
      }),
    };
  },
  computed: {
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        click: this.clickThrottle,
      });
    },
  },
  methods: {
    clickHandle(e) {
      e.stopPropagation && e.stopPropagation();
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      this.$emit("click");
    },
  },
};
</script>
