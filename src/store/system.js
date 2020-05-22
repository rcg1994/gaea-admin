import { fetchApiFake } from "../services";

export default {
  namespaced: true,
  state: {
    version: [],
  },
  mutations: {
    setVersion(state, version) {
      state.version = version;
    },
  },
  actions: {
    updateVersionAsync({ state, commit, dispatch }) {
      return fetchApiFake().then(() => {
        commit("setVersion", "1.0.0");
        return "success";
      });
    },
  },
  getters: {
    version: state => state.version,
  },
};
