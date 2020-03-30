<template>
  <header
    :class="['header', { 'header--dark': isDark, visible: !isScrolling }]"
  >
    <div class="container u-flex u-aic u-jcsb">
      <router-link class="t-ttu" to="/">Nick Adams</router-link>
      <button
        :class="['menu-btn', { active: isModalActive }]"
        @click="$emit('menu-btn-click')"
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
      isDark: 'dom/isDark',
      isModalActive: 'dom/isModalActive'
    })
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
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  z-index: 3
  position: fixed
  top: 6%
  left: 0

  width: 100vw
  transition: $trs

  @media (max-width: 500px)
    top: 32px

.header:not(.visible)
  opacity: 0

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

.header--dark
  color: var(--color-text-dk)

  .menu-btn__circle
    background: var(--color-text-dk)

  /deep/ a
    &,
    &:visited,
    &:active,
    &:focus
      color: var(--color-text-dk)
</style>
