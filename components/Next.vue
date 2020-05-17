<template>
  <section :class="['next', { 'next--case': isCase }]">
    <div class="next-container">
      <nuxt-link class="next-title" :to="to">
        <h2 class="t-h1">
          <slot name="title"></slot>
        </h2>
      </nuxt-link>

      <div class="next-row">
        <p class="next-text"><slot name="text"></slot></p>
        <div class="next-img">
          <slot name="image"></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    to: { type: [String, Object], default: '/' },
    isCase: { type: Boolean, default: false },
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

.next-container
  @media (max-width: $tab-sm)
    display: flex
    flex-direction: column

    height: 100%
    padding: 42vh 8px 24px

.next-title
  display: block

  @media (max-width: $tab-sm)
    margin: 0 0 24px auto

.next-row
  display: flex

  @media (min-width: $tab-sm + 1)
    align-items: flex-end

  @media (max-width: $tab-sm)
    flex-direction: column
    flex: 1

.next-img
  width: columns(1)
  position: relative

  @media (max-width: $tab-sm)
    width: 56vw
    margin: auto 0 0 auto

  &::before
    content: ''
    display: block
    width: 100%
    padding-top: 56.25%

  img, video
    position: absolute
    top: 0
    left: 0

    width: 100%
    height: 100%

    object-fit: cover

.next-text
  opacity: 0.6
  max-width: columns(1)

  @media (max-width: $tab-sm)
    max-width: 13.5em


.next:not(.next--case)
  .next-img
    @media (min-width: $tab-sm + 1)
      display: none

  .next-row
    @media (max-width: $tab-sm)
      padding-left: 72px
  
    @media (min-width: $tab-sm + 1)
      bottom: 6.66%
      right: var(--unit)
      position: absolute

  .next-title
    @media (min-width: $tab-sm + 1)
      position: absolute
      top: 50%
      transform: translateY(-50%)
      left: gutter-spans(2)

  .next-text
    @media (max-width: $tab)
      max-width: columns(2)

    @media (max-width: $tab-sm)
      max-width: 13.5em


.next--case
  .next-container
    @media (min-width: $tab-sm + 1)
      display: flex
      flex-direction: column
      align-items: flex-end
      justify-content: flex-end

      height: 100%
      padding: 0 var(--unit) 40px

  .next-row
    @media (min-width: $tab-sm + 1)
      width: column-spans(4)
      justify-content: space-between

  .next-title
    @media (min-width: $tab-sm + 1)
      margin-bottom: 72px

  .next-text
    @media (min-width: $tab-sm + 1)
      padding-bottom: 24px
</style>
