/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import jwtDecode from 'jwt-decode';

export default createStore({
  state: {
    selectedProduct: null,
    isLoggedIn: false,
    isMerchant: false,
    isApproved: false,
    isAdmin: false,
  },
  mutations: {
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    },
    setAuthData(state, payload) {
      state.isLoggedIn = payload.isLoggedIn;
      state.isMerchant = payload.isMerchant;
      state.isApproved = payload.isApproved;
      state.isAdmin = payload.isAdmin;
    },
  },
  actions: {
    setProduct({ commit }, product) {
      commit('setSelectedProduct', product);
    },
    checkAuth({ commit }) {
      const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
      if (token) {
        const decoded = jwtDecode(token.split('=')[1]);
        commit('setAuthData', {
          isLoggedIn: true,
          isMerchant: decoded.approved !== undefined,
          isApproved: decoded.approved === true,
          isAdmin: decoded.isAdmin === true,
        });
      } else {
        commit('setAuthData', {
          isLoggedIn: false,
          isMerchant: false,
          isApproved: false,
          isAdmin: false,
        });
      }
    },
    async logout({ commit }) {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        commit('setAuthData', {
          isLoggedIn: false,
          isMerchant: false,
          isApproved: false,
          isAdmin: false,
        });
        console.log(`Navbar is ${this.state.isLoggedIn}`);
        window.location.href = '/';
      } else {
        console.log('Une erreur est survenue');
      }
    },
  },
});
