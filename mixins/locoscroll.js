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
      window.lmS = this.lmS;

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
    scroll: { scroll: { x: 0, y: 0 }, lmS: { smooth: false } },
    lmS: null
  }),
  computed: {
    translateY() {
      if (process.client && this.lmS) {
        const prop = this.lmS.isMobile ? 'smoothMobile' : 'smooth';
        const y = this.lmS[prop] ? this.scrollY : 0;

        return {
          transform: `translate3d(0, ${y}px, 0)`
        };
      }

      return {};
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
      // Stop scroll
      if (this.lmS) this.lmS.stop();
    },
    startScroll() {
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
