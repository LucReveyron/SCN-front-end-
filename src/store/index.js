import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cam1: 'true',
    cam2: 'true',
    cam3: 'true'
  },
  mutations: {
    setCam(state, status){
      state.cam1 = status.camera1;
      state.cam2 = status.camera2;
      state.cam3 = status.camera3;
    }
  },
  actions: {
  },
  modules: {
  }
})
