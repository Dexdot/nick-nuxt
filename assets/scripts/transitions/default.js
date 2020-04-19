import transitions from '~/assets/scripts/transitions/index';

export default {
  mode: 'out-in',
  async enter(el, done) {
    const routeDir = this.$store.getters['dom/routeDir'];
    const transitionEnter =
      routeDir.from.name === routeDir.to.name ? 'cases' : routeDir.to.name;
    await transitions[transitionEnter].enter(el);
    done();
  },
  leave(el, done) {
    const isModalActive = this.$store.getters['dom/isModalActive'];
    const modalName = this.$store.getters['dom/modalName'];
    const isMenuActive = isModalActive && modalName === 'menu';
    const delay = isMenuActive ? 1040 : 0;
    if (isMenuActive) this.$store.dispatch('dom/toggleModal', '');

    // timeout - transition-duration
    setTimeout(async () => {
      const routeDir = this.$store.getters['dom/routeDir'];
      const transitionLeave =
        routeDir.from.name === routeDir.to.name ? 'cases' : routeDir.from.name;
      await transitions[transitionLeave].leave(el);

      // Scroll reset
      document.querySelector('.scroll-container').style.transform = '';
      window.scrollTo(0, 0);

      done();
    }, delay);
  }
};
