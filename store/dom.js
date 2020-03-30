export const state = () => ({
  modalName: '',
  isModalActive: false,
  scrollDisabled: false,
  isDark: false
});

export const getters = {
  modalName({ modalName }) {
    return modalName;
  },
  isModalActive({ isModalActive }) {
    return isModalActive;
  },
  scrollDisabled({ scrollDisabled }) {
    return scrollDisabled;
  },
  isDark({ isDark }) {
    return isDark;
  }
};

export const mutations = {
  toggleDark(state, isDark) {
    state.isDark = isDark !== undefined ? isDark : !state.isDark;
  },
  disableScroll(state) {
    state.scrollDisabled = true;
  },
  enableScroll(state) {
    state.scrollDisabled = false;
  },
  setModalName(state, modalName) {
    state.modalName = modalName;
  },
  toggleModal(state, isModalActive) {
    state.isModalActive =
      isModalActive !== undefined ? isModalActive : !state.isModalActive;
  }
};

export const actions = {
  toggleDark({ commit }, isDark) {
    commit('toggleDark', isDark);
  },
  closeModal({ commit, state }, modalName) {
    commit('setModalName', modalName);
    commit('toggleModal', false);
    commit('enableScroll');
  },
  openModal({ commit, state }, modalName) {
    commit('setModalName', modalName);
    commit('toggleModal', true);
    commit('disableScroll');
  },
  toggleModal({ commit, state }, modalName) {
    commit('setModalName', modalName);
    commit('toggleModal');

    if (!state.isModalActive) {
      commit('disableScroll');
    } else {
      commit('enableScroll');
    }
  }
};
