<template>
  <section class="next">
    <div class="next-container">
      <nuxt-link :to="to">
        <h2 class="t-h2">
          <slot name="title"></slot>
        </h2>
      </nuxt-link>

      <p><slot name="text"></slot></p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    to: { type: [String, Object], default: '/' },
    isPageDark: { type: Boolean, default: true },
    isDark: { type: Boolean, default: true }
  },
  data: () => ({
    isAnimating: false,
    timer: 0,
    duration: 5000
  }),
  mounted() {
    this.observe()
  },
  beforeDestroy() {
    this.stopCount()
    this.observer.unobserve(this.$el)
  },
  methods: {
    startCount() {
      this.isAnimating = true

      this.timer = setTimeout(() => {
        this.isAnimating = false
        this.$router.push(this.to)
      }, this.duration)
    },
    stopCount() {
      clearTimeout(this.timer)
      this.isAnimating = false
    },
    observe() {
      this.observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.$emit('intersect', entry)
            } else {
              this.$emit('notintersect', entry)
            }

            if (entry.intersectionRatio >= 0.4) {
              this.$store.dispatch('dom/toggleDark', this.isDark)
              if (!this.isAnimating) {
                this.startCount()
              }
            } else {
              this.$store.dispatch('dom/toggleDark', this.isPageDark)
              this.stopCount()
            }
          })
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
      )
      this.observer.observe(this.$el)
    }
  }
}
</script>

<style lang="sass" scoped>
.next
  position: relative

  width: 100vw
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  padding-right: mix(1, 1)

  display: flex
  flex-direction: column
  justify-content: center
  align-items: flex-end

  text-align: right

  @media (max-width: 500px)
    padding-right: var(--unit)

.next-container h2
  display: block
  margin-bottom: 8px

  @media (max-width: 500px)
    font-size: 36px

  @media (max-width: 360px)
    font-size: 30px

.next-container p
  margin-left: auto
  max-width: 29em
  opacity: 0.4

  @media (max-width: 500px)
    max-width: 70%
</style>
