<template>
  <button
    :class="['credits-btn', { 'credits-btn--visible': isVisible }]"
    @click="$emit('click')"
    type="button"
  >
    <span>Credits</span>
  </button>
</template>

<script>
import { isTouchDevice } from '~/assets/scripts/detect'

export default {
  data: () => ({
    isTouch: false,
    isVisible: false,
    timer: null
  }),
  mounted() {
    this.isTouch = isTouchDevice()

    this.isVisible = this.isTouch
    window.addEventListener('mousemove', this.mousemove.bind(this))
  },
  destroyed() {
    window.removeEventListener('mousemove', this.mousemove.bind(this))
  },
  methods: {
    mousemove() {
      if (this.isTouch) return false

      this.isVisible = true
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.isVisible = false
      }, 500)
    }
  }
}
</script>

<style lang="sass" scoped>
.credits-btn
  position: fixed
  top: calc(var(--vh, 1vh) * 92)
  left: var(--unit)

.credits-btn
  transition: opacity 0.25s ease
  opacity: 0
  pointer-events: none

  @media (max-width: 500px)
    opacity: 1
    pointer-events: none

.credits-btn.credits-btn--visible
  opacity: 1
  pointer-events: auto
</style>
