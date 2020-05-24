<template>
  <header
    :class="['header', { 'header--dark': isHeaderDark, visible: !isScrolling }]"
  >
    <div class="container u-flex u-aic u-jcsb">
      <nuxt-link class="header__logo" to="/">
        <img
          v-show="!isHeaderDark"
          src="~assets/svg/logo.svg"
          alt="Nick Adams."
        />
        <img
          v-show="isHeaderDark"
          src="~assets/svg/logo-w.svg"
          alt="Nick Adams."
        />
      </nuxt-link>
      <button
        :class="['menu-btn', { active: isModalActive }]"
        @click="onMenuBtnClick"
      >
        <span class="menu-btn__circle"></span>
        <span class="menu-btn__circle"></span>
        <span class="menu-btn__circle"></span>
        <span class="menu-btn__circle"></span>
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    isScrolling: false
  }),
  computed: {
    ...mapGetters({
      modalName: 'dom/modalName',
      isModalActive: 'dom/isModalActive',
      isDark: 'dom/isDark'
    }),
    isHeaderDark() {
      return this.isModalActive
        ? ['menu', 'credits'].includes(this.modalName)
        : this.isDark
    }
  },
  mounted() {
    this.handleScroll()
  },
  methods: {
    handleScroll() {
      let scrollTimer

      this.$root.$on('locoscroll', () => {
        clearTimeout(scrollTimer)
        this.isScrolling = true

        scrollTimer = setTimeout(() => {
          this.isScrolling = false
        }, 50)
      })
    },
    onMenuBtnClick() {
      const modalName = this.isModalActive ? '' : 'menu'
      this.$store.dispatch('dom/toggleModal', modalName)
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  z-index: 3
  position: fixed
  top: 24px
  left: 0

  width: 100vw
  transition: $trs

  @media (max-width: $mob)
    top: 8px

.header:not(.visible)
  opacity: 0


// Logo
.header__logo img
  display: block
  width: 96px
  height: auto


// Menu button
.menu-btn
  display: flex
  flex-wrap: wrap

  width: 24px
  height: 24px
  margin-left: -4px
  margin-top: -4px

  transition: transform 0.25s ease-in-out, opacity 0.25s ease
  transform-origin: 50% 50%

.menu-btn:hover
  opacity: 0.3

.menu-btn.active
  transform: rotate(45deg)

.menu-btn__circle:nth-child(2)
  margin-right: 30%

.menu-btn__circle
  background: var(--color-text-lt)
  border-radius: 50%

  width: 4px
  height: 4px
  margin-left: 4px
  margin-top: 4px


// Dark
.header--dark
  color: var(--color-text-dk)

  .menu-btn__circle
    background: var(--color-text-dk)

  .header__logo
    +link(var(--color-text-dk))
</style>
