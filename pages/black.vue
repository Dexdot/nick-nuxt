<template>
  <div>
    <div
      class="black-bg"
      :style="{
        transform: `translate3d(0, ${this.scroll.scroll.y}px, 0)`
      }"
    >
      <div class="black-bg__inner"></div>
    </div>
    <Main :scroll="scroll" :isNextVisible="isNextVisible" :cases="blackCases" />
    <Next
      @intersect="onNextIntersect"
      @notintersect="onNextIntersect"
      to="/"
      :isDark="false"
      :isPageDark="true"
    >
      <span slot="title">There will be light</span>
      <span slot="text">Make a step and start over again </span>
    </Next>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import page from '~/mixins/page'
import Next from '~/components/Next'
import Main from '~/components/Main'

export default {
  mixins: [page],
  components: {
    Main,
    Next
  },
  head() {
    return {
      title: 'Black'
    }
  },
  data: () => ({
    isNextVisible: false
  }),
  computed: {
    ...mapGetters({
      blackCases: 'cases/blackCases'
    })
  },
  mounted() {
    this.toggleDark()
  },
  async fetch({ store }) {
    await store.dispatch('cases/loadBlackCases')
  },
  methods: {
    toggleDark() {
      const delay = document.readyState === 'complete' ? 900 : 0
      setTimeout(() => {
        this.$store.dispatch('dom/toggleDark', true)
      }, delay)
    },
    onNextIntersect(entry) {
      this.isNextVisible = entry.intersectionRatio >= 0.3
    }
  }
}
</script>

<style lang="sass" scoped>
.black-bg
  position: fixed
  top: calc(calc(var(--vh, 1vh) * 100) - 40px)
  right: var(--unit)

  width: 16px
  height: 16px


.black-bg__inner
  width: 100%
  height: 100%
  
  pointer-events: none
  background: var(--color-bg-dk)
  border-radius: 50%
  
  transform-origin: 50% 50%
  transform: scale(0)
</style>
