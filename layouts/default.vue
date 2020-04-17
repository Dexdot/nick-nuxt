<template>
  <div id="app" :class="['page', { 'page--dark': isDark }]">
    <Menu />
    <Credits />
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
import Credits from '~/components/Credits'

import initCSSProps from '~/assets/scripts/css-props'
import { detectDevices } from '~/assets/scripts/detect'

export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Credits
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
    window.$app = this

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

a:not(.no-theme)
  +link(var(--color-text-lt))

.page--dark a:not(.no-theme)
  +link(var(--color-text-dk))
</style>

<style lang="sass" scoped>
.scroll-container
  overflow: hidden

.page--white .page:not(.page--dark)
  background: #fff

.page:not(.page--dark)
  transition: background 0.5s ease-in-out

  color: var(--color-text-lt)
  background: var(--color-bg-lt)

.page--dark
  transition: background 0.5s ease-in-out

  color: var(--color-text-dk)
  background: var(--color-bg-dk)
</style>
