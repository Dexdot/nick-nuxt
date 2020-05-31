<template>
  <div
    :class="[
      'toggler u-center',
      { 'toggler--dark': isDark, visible: !isScrolling }
    ]"
    :style="translateY"
  >
    <svg
      v-if="isDark"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0)">
        <path
          d="M8 0.666504V1.99984"
          stroke="white"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 14V15.3333"
          stroke="white"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.81323 2.81348L3.7599 3.76014"
          stroke="white"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.24 12.2402L13.1867 13.1869"
          stroke="white"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.666748 8H2.00008"
          stroke="white"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14 8H15.3333"
          stroke="white"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.81323 13.1869L3.7599 12.2402"
          stroke="white"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.24 3.76014L13.1867 2.81348"
          stroke="white"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="8" cy="8" r="3" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
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
            transform: `translate3d(0, ${
              this.isMobile ? 0 : this.scrollY
            }px, 0)`
          }
        : {}
    }
  },
  data: () => ({
    isMobile: false,
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

      this.scrollY = scroll.y
      this.isMobile = lmS.isMobile

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
  stroke: var(--color-text-lt)

.toggler--dark svg
  stroke: var(--color-text-dk)

.toggler
  position: fixed
  top: calc(calc(var(--vh, 1vh) * 100) - 40px)
  right: var(--unit)

  width: 16px
  height: 16px
</style>
