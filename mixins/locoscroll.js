let vuexScrollWatcher = '';

export default {
  mounted() {
    this.$nextTick(() => {
      // Create scroll instance
      this.lmS = new this.locoscroll({
        el: document.querySelector('.scroll-container'),
        smooth: true,
        getDirection: true
      });

      // Handle scroll event
      this.lmS.on('scroll', e => {
        this.scroll = { ...e, lmS: this.lmS };
        this.$root.$emit('locoscroll', this.scroll);
      });

      // Update scroll
      this.lmS.update();

      // Reset scroll
      this.lmS.setScroll(0, 0);

      // Hide scrollbar
      this.toggleScrollbar(false);

      this.subscribe();
    });
  },
  destroyed() {
    this.unsubscribe();
    this.lmS.destroy();
  },
  data: () => ({
    isScrolling: false,
    scroll: { scroll: { x: 0, y: 0 } },
    lmS: null
  }),
  computed: {
    translateY() {
      return process.client
        ? {
            transform: `translate3d(0, ${this.scrollY}px, 0)`
          }
        : {};
    },
    scrollY() {
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

      // Listen 'update-scroll' event
      this.$root.$on('update-scroll', this.updateScroll);

      // Resize handler
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
      // this.toggleScrollbar(false)

      // Stop scroll
      if (this.lmS) this.lmS.stop();
    },
    startScroll() {
      // this.toggleScrollbar(true)

      // Start scroll
      if (this.lmS) this.lmS.start();
    },
    toggleScrollbar(show = true) {
      // Scrollbar node
      const scrollbar =
        this.lmS.scroll.scrollbar ||
        document.querySelector(`.${this.lmS.scrollbarClass}`);

      if (!scrollbar) return false;
      scrollbar.style.display = show ? 'block' : 'none';
    }
  },
  watch: {
    $route() {
      this.updateScroll();
    }
  }
};
