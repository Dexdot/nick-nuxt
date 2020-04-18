<template>
  <nuxt-link class="menu__link t-h2" :to="to" @mouseenter.native="mouseenter">
    <slot></slot>
  </nuxt-link>
</template>

<script>
import { gsap } from 'gsap'
import charming from 'charming'
import { isTouchDevice } from '~/assets/scripts/detect'

export default {
  props: {
    to: { type: [String, Object] }
  },
  data: () => ({
    isTouch: false
  }),
  mounted() {
    this.isTouch = isTouchDevice()
    charming(this.$el)
  },
  methods: {
    mouseenter() {
      if (this.isTouch) return false

      const chars = this.$el.querySelectorAll('span')

      const tl = gsap.timeline({
        targets: chars
      })

      tl.to(chars, {
        opacity: 0,
        y: '-16%',
        duration: 0.2,
        ease: 'power2.inOut'
      }).fromTo(
        chars,
        {
          opacity: 0,
          y: '16%',
          skewX: -5
        },
        {
          opacity: 1,
          y: '0%',
          skewX: 0,
          duration: 0.6,
          ease: 'power1.inOut',
          stagger: 0.04
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.menu__link /deep/ span
  display: inline-block
  will-change: transform, opacity
</style>
