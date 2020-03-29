let vuexScrollWatcher = '';

export default {
  mounted() {
    this.$nextTick(() => {
      this.lmS = new this.locoscroll({
        el: document.querySelector('.scroll-container'),
        smooth: true,
        getDirection: true
      });

      this.lmS.on('scroll', e => {
        this.scroll = { ...e };
      });

      this.lmS.update();
      this.lmS.setScroll(0, 0);

      this.subscribe();
    });
  },
  destroyed() {
    this.unsubscribe();
    this.lmS.destroy();
  },
  data: () => ({
    selector: '.scroll-container',
    scroll: { scroll: { x: 0, y: 0 } },
    lmS: null
  }),
  computed: {
    translateY() {
      return process.client
        ? {
            transform: `translate3d(0, ${this.y}px, 0)`
          }
        : {};
    },
    y() {
      return this.scroll.scroll.y;
    }
  },
  methods: {
    subscribe() {
      vuexScrollWatcher = this.$store.watch(
        (state, getters) => getters['dom/scrollDisabled'],
        scrollDisabled => {
          if (scrollDisabled) {
            window.removeEventListener(
              'keydown',
              this.lmS.scroll.checkKey,
              false
            );
          } else {
            window.addEventListener('keydown', this.lmS.scroll.checkKey, false);
          }
        }
      );

      this.$root.$on('update-scroll', this.updateScroll);
      window.addEventListener('resize', this.onLmsResize);
    },
    unsubscribe() {
      if (vuexScrollWatcher) vuexScrollWatcher();

      this.$root.$off('update-scroll', this.updateScroll);
      window.removeEventListener('resize', this.onLmsResize);
    },
    onLmsResize() {
      this.updateScroll();
    },
    updateScroll() {
      if (this.lmS) this.lmS.update();
    },
    stopScroll() {
      const scrollbar =
        this.lmS.scroll.scrollbar ||
        document.querySelector(`.${this.lmS.scrollbarClass}`);
      scrollbar.style.display = 'block';

      if (this.lmS) this.lmS.stop();
    },
    startScroll() {
      const scrollbar =
        this.lmS.scroll.scrollbar ||
        document.querySelector(`.${this.lmS.scrollbarClass}`);
      scrollbar.style.display = 'none';

      if (this.lmS) this.lmS.start();
    }
  },
  watch: {
    $route() {
      this.updateScroll();
    }
  }
};
