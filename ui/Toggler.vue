<template>
  <div
    :class="[
      'toggler u-center',
      { 'toggler--dark': isDark, visible: !isScrolling }
    ]"
    :style="translateY"
  >
    <svg
      v-if="$route.name === 'black'"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.8 8.8C4.32896 8.8 7.2 11.671 7.2 15.2C7.2 15.6418 7.55824 16 8 16C8.44176 16 8.8 15.6418 8.8 15.2C8.8 11.671 11.671 8.8 15.2 8.8C15.6418 8.8 16 8.44176 16 8C16 7.55824 15.6418 7.2 15.2 7.2C11.671 7.2 8.8 4.32896 8.8 0.8C8.8 0.35824 8.44176 0 8 0C7.55824 0 7.2 0.35824 7.2 0.8C7.2 4.32896 4.32896 7.2 0.8 7.2C0.35824 7.2 0 7.55824 0 8C0 8.44176 0.35824 8.8 0.8 8.8ZM8 4.28568C8.78528 5.9012 10.0987 7.21464 11.7143 8C10.0988 8.78528 8.78536 10.0987 8 11.7143C7.21472 10.0988 5.90128 8.78536 4.28568 8C5.90128 7.21472 7.21472 5.90128 8 4.28568Z"
        fill="white"
      />
    </svg>

    <svg
      v-else
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M13.9999 8.52667C13.8951 9.66147 13.4692 10.7429 12.7721 11.6445C12.075 12.5461 11.1356 13.2305 10.0637 13.6177C8.99188 14.0049 7.83192 14.0787 6.7196 13.8307C5.60728 13.5827 4.5886 13.023 3.78275 12.2172C2.97691 11.4113 2.41723 10.3927 2.16921 9.28033C1.92118 8.16801 1.99508 7.00806 2.38224 5.9362C2.7694 4.86434 3.45382 3.92491 4.35541 3.22784C5.257 2.53076 6.33847 2.10487 7.47327 2C6.80888 2.89884 6.48917 4.0063 6.57229 5.12094C6.65541 6.23559 7.13584 7.28337 7.9262 8.07373C8.71656 8.86409 9.76435 9.34452 10.879 9.42765C11.9936 9.51077 13.1011 9.19106 13.9999 8.52667V8.52667Z"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isTouchDevice } from '~/assets/scripts/detect'

export default {
  computed: {
    ...mapGetters({
      isDark: 'dom/isDark'
    }),
    translateY() {
      return process.client
        ? {
            transform: `translate3d(0, ${this.scrollY}px, 0)`
          }
        : {}
    }
  },
  data: () => ({
    isScrolling: false,
    scrollY: 0,
    scrollTimer: 0
  }),
  mounted() {
    this.$root.$on('locoscroll', this.onScroll.bind(this))
  },
  destroyed() {
    this.$root.$off('locoscroll', this.onScroll)
  },
  methods: {
    onScroll({ scroll, lmS }) {
      clearTimeout(this.scrollTimer)
      this.isScrolling = true

      const prop = lmS.isMobile ? 'smoothMobile' : 'smooth'
      this.scrollY = lmS[prop] ? scroll.y : 0

      this.scrollTimer = setTimeout(() => {
        this.isScrolling = false
      }, 50)
    }
  }
}
</script>

<style lang="sass" scoped>
.toggler
  transition: opacity 0.25s ease
  opacity: 0
  pointer-events: none
  
.toggler.visible
  opacity: 1
  pointer-events: auto

.toggler svg
  width: 16px
  height: 16px
  stroke: var(--color-text-lt)

.toggler--dark svg
  stroke: var(--color-text-dk)

.toggler
  position: fixed
  top: calc(calc(var(--vh, 1vh) * 100) - 64px)
  right: var(--unit)

  display: flex
  align-items: flex-end
  justify-content: flex-end

  width: 40px
  height: 40px

  @media (max-width: $mob)
    top: calc(calc(var(--vh, 1vh) * 100) - 72px)
</style>
