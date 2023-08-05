/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import jwtDecode from 'jwt-decode';

const store = createStore({
  state() {
    return {
      id: null,
      isLoggedIn: false,
      isMerchant: false,
      isApproved: false,
      isAdmin: false,
      merchantId: null,
      selectedMerchant: localStorage.getItem('selectedMerchant') ? Number(localStorage.getItem('selectedMerchant')) : null,
      token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    };
  },
  getters: {
    getAuthData(state) {
      return {
        id: state.id,
        isLoggedIn: state.isLoggedIn,
        isMerchant: state.isMerchant,
        isApproved: state.isApproved,
        isAdmin: state.isAdmin,
        merchantId: state.merchantId,
        token: state.token,
      };
    },
    getSelectedMerchant(state) {
      return state.selectedMerchant;
    },
  },
  mutations: {
    setAuthData(state, payload) {
      state.id = payload.id;
      state.isLoggedIn = payload.isLoggedIn;
      state.isMerchant = payload.isMerchant;
      state.isApproved = payload.isApproved;
      state.isAdmin = payload.isAdmin;
      state.merchantId = payload.merchantId;
      state.token = payload.token;
    },
    setSelectedMerchant(state, payload) {
      state.selectedMerchant = payload;
      localStorage.setItem('selectedMerchant', payload);
    },
  },
  actions: {
    checkAuth({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        commit('setAuthData', {
          id: decoded.id,
          isLoggedIn: true,
          isMerchant: decoded.merchantId !== null,
          isApproved: decoded.approved,
          isAdmin: decoded.isAdmin,
          merchantId: decoded.merchantId,
          token,
        });
      } else {
        commit('setAuthData', {
          id: null,
          isLoggedIn: false,
          isMerchant: false,
          isApproved: false,
          isAdmin: false,
          merchantId: null,
          token: null,
        });
      }
    },
    selectedMerchant({ commit }, merchantId) {
      commit('setSelectedMerchant', merchantId);
    },
    async logout({ commit }) {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/users/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        commit('setAuthData', {
          isLoggedIn: false,
          isMerchant: false,
          isApproved: false,
          isAdmin: false,
          merchantId: null,
          token: null,
        });
        localStorage.removeItem('selectedMerchant');
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        console.log(response);
        console.log('Une erreur est survenue');
      }
    },
  },
});

export default store;
