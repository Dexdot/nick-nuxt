import { copyObject } from '~/assets/scripts/helpers';
import { fetchAbout, fetchVision } from '~/api/other';

export const state = () => ({
  about: {},
  vision: {},
  cache: {
    about: {},
    vision: {}
  }
});

export const getters = {
  cache({ cache }) {
    return cache;
  },
  about({ about }) {
    return about;
  },
  vision({ vision }) {
    return vision;
  }
};

export const mutations = {
  setCache(state, cache) {
    state.cache = cache;
  },
  setAbout(state, about) {
    state.about = { ...about };
  },
  setVision(state, vision) {
    state.vision = { ...vision };
  }
};

export const actions = {
  async loadAbout({ commit, getters }) {
    const cachedAbout = getters.cache.about;

    // Get data from cache or API
    const about =
      cachedAbout && Object.keys(cachedAbout).length > 0
        ? cachedAbout
        : await fetchAbout();

    // Save data in cache
    const cache = copyObject(getters.cache);
    cache.about = about;
    commit('setCache', cache);

    commit('setAbout', about);
    return about;
  },
  async loadVision({ commit, getters }) {
    const cachedVision = getters.cache.vision;

    // Get data from cache or API
    const vision =
      cachedVision && Object.keys(cachedVision).length > 0
        ? cachedVision
        : await fetchVision();

    // Save data in cache
    const cache = copyObject(getters.cache);
    cache.vision = vision;
    commit('setCache', cache);

    commit('setVision', vision);
    return vision;
  }
};
