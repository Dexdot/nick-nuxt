import transitions from '~/assets/scripts/transitions/index';

function handleMenu(ctx) {
  const isModalActive = ctx.$store.getters['dom/isModalActive'];
  const modalName = ctx.$store.getters['dom/modalName'];
  const isMenuActive = isModalActive && modalName === 'menu';
  if (isMenuActive) ctx.$store.dispatch('dom/toggleModal', '');

  return isMenuActive ? 1040 : 0;
}

function resetScroll() {
  document.querySelector('.scroll-container').style.transform = '';
  window.scrollTo(0, 0);
}

async function enter(el, done) {
  const routeDir = this.$store.getters['dom/routeDir'];
  const transitionEnter =
    routeDir.from.name === routeDir.to.name ? 'cases' : routeDir.to.name;

  await transitions[transitionEnter].enter({ el, ctx: this });
  this.$store.dispatch('dom/setRouteAnimating', false);

  done();
}

function leave(el, done) {
  this.$store.dispatch('dom/setRouteAnimating', true);
  const routeDir = this.$store.getters['dom/routeDir'];
  const delay = handleMenu(this);

  setTimeout(async () => {
    const transitionLeave =
      routeDir.from.name === routeDir.to.name ? 'cases' : routeDir.from.name;
    await transitions[transitionLeave].leave({ el, ctx: this });

    resetScroll();
    done();
  }, delay);
}

export default {
  mode: 'out-in',
  enter,
  leave
};
