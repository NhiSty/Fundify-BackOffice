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
      selectedMerchant: localStorage.getItem('selectedMerchant') ? Number(localStorage.getItem('selectedMerchant')) : null,
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
      };
    },
    getSelectedMerchant(state) {
      return state.selectedMerchant;
    }
  },
  mutations: {
    setAuthData(state, payload) {
      state.id = payload.id;
      state.isLoggedIn = payload.isLoggedIn;
      state.isMerchant = payload.isMerchant;
      state.isApproved = payload.isApproved;
      state.isAdmin = payload.isAdmin;
    },
    setSelectedMerchant(state, payload) {
      state.selectedMerchant = payload;
      localStorage.setItem('selectedMerchant', payload);
    },
  },
  actions: {
    checkAuth({ commit }) {
      const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
      if (token) {
        const decoded = jwtDecode(token.split('=')[1]);
        commit('setAuthData', {
          id: decoded.id,
          isLoggedIn: true,
          isMerchant: decoded.approved === false,
          isApproved: decoded.approved === true,
          isAdmin: decoded.isAdmin === true,
        });
      } else {
        commit('setAuthData', {
          id: null,
          isLoggedIn: false,
          isMerchant: false,
          isApproved: false,
          isAdmin: false,
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
        });
        localStorage.removeItem('selectedMerchant');
        window.location.href = '/';
      } else {
        console.log(response);
        console.log('Une erreur est survenue');
      }
    },
  },
});

export default store;
