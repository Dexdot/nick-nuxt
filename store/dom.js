export const state = () => ({
  modalName: '',
  isModalActive: false,
  scrollDisabled: false,
  isDark: false,
  storiesPayload: null,
  routeDir: {},
  isRouteAnimating: false
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
  },
  storiesPayload({ storiesPayload }) {
    return storiesPayload;
  },
  routeDir({ routeDir }) {
    return routeDir;
  },
  isRouteAnimating({ isRouteAnimating }) {
    return isRouteAnimating;
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
  },
  setStoriesPayload(state, storiesPayload) {
    state.storiesPayload = storiesPayload;
  },
  setRouteDir(state, routeDir) {
    state.routeDir = routeDir;
  },
  setRouteAnimating(state, isRouteAnimating) {
    state.isRouteAnimating = isRouteAnimating;
  }
};

export const actions = {
  toggleDark({ commit }, isDark) {
    commit('toggleDark', isDark);
  },
  closeModal({ commit, state }) {
    commit('setModalName', '');
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
  },
  setStoriesPayload({ commit }, storiesPayload) {
    commit('setStoriesPayload', storiesPayload);
  },
  setRouteDir({ commit }, routeDir) {
    commit('setRouteDir', routeDir);
  },
  setRouteAnimating({ commit }, isRouteAnimating) {
    commit('setRouteAnimating', isRouteAnimating);
  }
};
