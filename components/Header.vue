<template>
  <header
    :class="['header', { 'header--dark': isHeaderDark, visible: !isScrolling }]"
  >
    <div class="container">
      <nuxt-link
        :class="[
          'header__logo',
          { 'header__logo--hidden': $route.name === 'about' }
        ]"
        to="/"
      >
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
        <div class="menu-btn__inner">
          <span class="menu-btn__circle"></span>
          <span class="menu-btn__circle"></span>
          <span class="menu-btn__circle"></span>
          <span class="menu-btn__circle"></span>
        </div>
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

.header .container
  display: flex
  align-items: flex-start
  justify-content: space-between


// Logo
.header__logo
  transition: opacity $trs
  
.header__logo--hidden
  opacity: 0
  pointer-events: none

.header__logo img
  display: block
  width: 96px
  height: auto


// Menu button
.menu-btn
  position: relative
  width: 40px
  height: 40px

  transition: opacity 0.25s ease

.menu-btn:hover
  opacity: 0.3

.menu-btn.active .menu-btn__inner
  transform: rotate(45deg)

.menu-btn__inner
  transition: transform 0.25s ease-in-out
  transform-origin: 50% 50%
  
  position: absolute
  top: 0
  right: 0

  display: flex
  flex-wrap: wrap
  width: 12px
  height: 12px

.menu-btn__circle
  background: var(--color-text-lt)
  border-radius: 50%

  min-width: 4px
  width: 4px
  height: 4px

.menu-btn__circle:nth-child(3),
.menu-btn__circle:nth-child(4)
  margin-top: 4px

.menu-btn__circle:nth-child(1),
.menu-btn__circle:nth-child(3)
  margin-right: 4px


// Dark
.header--dark
  color: var(--color-text-dk)

  .menu-btn__circle
    background: var(--color-text-dk)

  .header__logo
    +link(var(--color-text-dk))
</style>
