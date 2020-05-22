import Vue from "vue";
import ElementUI from "element-ui";
import _ from "lodash";
import "xe-utils";
import VXETable from "vxe-table";
import VXETablePluginElement from "vxe-table-plugin-element";
import "vxe-table/lib/index.css";
import "vxe-table-plugin-element/dist/style.css";
import RouterTab from "./components/vue-router-tab/src/index.js";
import "./styles";
import "./components";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./libs/filter";

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.use(RouterTab);
Vue.use(VXETable);
VXETable.use(VXETablePluginElement);

Vue.prototype._ = _;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
