import { copyObject } from '~/assets/scripts/helpers';
import { fetchMain, fetchBlack } from '~/api/cases';

export const state = () => ({
  mainCases: [],
  blackCases: [],
  cache: {
    mainCases: [],
    blackCases: []
  }
});

export const getters = {
  cache({ cache }) {
    return cache;
  },
  allCases({ mainCases, blackCases }) {
    return [...mainCases, ...blackCases];
  },
  mainCases({ mainCases }) {
    return mainCases;
  },
  blackCases({ blackCases }) {
    return blackCases;
  }
};

export const mutations = {
  setCache(state, cache) {
    state.cache = cache;
  },
  setMainCases(state, mainCases) {
    state.mainCases = [...mainCases];
  },
  setBlackCases(state, blackCases) {
    state.blackCases = [...blackCases];
  }
};

export const actions = {
  async loadCases({ dispatch }) {
    const main = await dispatch('loadMainCases');
    const black = await dispatch('loadBlackCases');
    return [...main, ...black];
  },
  async loadMainCases({ commit, getters }) {
    const cachedCases = getters.cache.mainCases;

    // Get data from cache or API
    const mainCases =
      cachedCases && cachedCases.length > 0 ? cachedCases : await fetchMain();

    // Save data in cache
    const cache = copyObject(getters.cache);
    cache.mainCases = mainCases;
    commit('setCache', cache);

    commit('setMainCases', mainCases);
    return mainCases;
  },
  async loadBlackCases({ commit, getters }) {
    const cachedCases = getters.cache.blackCases;

    // Get data from cache or API
    const blackCases =
      cachedCases && cachedCases.length > 0 ? cachedCases : await fetchBlack();

    // Save data in cache
    const cache = copyObject(getters.cache);
    cache.blackCases = blackCases;
    commit('setCache', cache);

    commit('setBlackCases', blackCases);
    return blackCases;
  }
};
