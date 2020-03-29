<template>
  <div id="app" :class="['page', { 'page--dark': isDark }]">
    <Menu />
    <Header />

    <div class="scroll-container">
      <nuxt ref="page" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from '~/components/Header'
import Menu from '~/components/Menu'

import initCSSProps from '~/assets/scripts/css-props'
import { detectDevices } from '~/assets/scripts/detect'

export default {
  name: 'App',
  components: {
    Header,
    Menu
  },
  data: () => ({
    detect: {},
    dir: {}
  }),
  computed: {
    ...mapGetters({
      isDark: 'dom/isDark',
      isModalActive: 'dom/isModalActive'
    }),
    page() {
      return this.$refs.page && this.$refs.page.$children[0]
    }
  },
  mounted() {
    initCSSProps()
    this.detect = detectDevices()
  },
  watch: {
    $route(to, from) {
      this.dir = { to, from }
    }
  }
}
</script>

<style lang="sass">
\:root
  --color-text-lt: #1F2020
  --color-bg-lt: #EDECED

  --color-text-dk: #FFFFFF
  --color-bg-dk: #000000

</style>

<style lang="sass" scoped>
.scroll-container
  overflow: hidden

.page--white .page:not(.dark)
  background: #fff

.page:not(.dark)
  transition: background 0.5s ease-in-out

  color: var(--color-text-lt)
  background: var(--color-bg-lt)

  /deep/ a
    &,
    &:visited,
    &:active,
    &:focus
      color: var(--color-text-lt)

.page.dark
  transition: background 0.5s ease-in-out

  color: var(--color-text-dk)
  background: var(--color-bg-dk)

  /deep/ a
    &,
    &:visited,
    &:active,
    &:focus
      color: var(--color-text-dk)
</style>
