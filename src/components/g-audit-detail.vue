<template>
  <div class="g-audit-box">
    <div class="_audit-content">{{ content || "未填写" }}</div>
    <div class="_audit-footer">
      <span>{{ result }}</span>
      <span>签名：{{ name }}</span>
      <span>日期：{{ time | dateParse }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GAuditDetail",
  props: ["content", "result", "name", "time"],
};
</script>

<style lang="scss">
.g-audit-box {
  display: flex;
  width: calc(100% + 40px);
  margin: -8px -20px;
  padding: 20px 20px;
  flex-direction: column;
  background: #f2faff;
  ._audit-content {
    width: 100%;
    display: block;
    text-align: left;
    min-height: 90px;
    margin-bottom: 10px;
  }
  ._audit-footer {
    width: 100%;
    display: flex;
    > span {
      flex: 1;
      padding-left: 100px;
    }
  }
}
</style>
