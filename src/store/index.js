import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedProduct: null
  },
  mutations: {
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    }
  },
  actions: {
    setProduct({ commit }, product) {
      commit('setSelectedProduct', product);
    }
  }
});
