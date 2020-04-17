<template>
  <main class="vision" @click="onClick">
    <section class="vision-container u-center">
      <article class="quotes" ref="quotes">
        <p
          class="t-quote-body"
          v-html="render(el)"
          v-for="(el, i) in slides[activeSlide]"
          :key="i"
        ></p>
      </article>

      <div class="vision-counter" ref="counter">
        <span>{{ activeSlide + 1 }} / {{ slides.length }}</span>
      </div>
    </section>
  </main>
</template>

<script>
import page from '~/mixins/page'
import render from '~/mixins/render'
import { getSlidesByHr } from '~/assets/scripts/helpers'

export default {
  mixins: [page, render],
  head() {
    return {
      title: 'Vision'
    }
  },
  async asyncData({ store }) {
    const vision = await store.dispatch('other/loadVision')

    return { slides: getSlidesByHr(vision.fields), activeSlide: 0 }
  },
  mounted() {
    this.$store.dispatch('dom/toggleDark', false)

    this.$nextTick(() => {
      const { quotes, counter } = this.$refs
      if (!quotes) return false

      setTimeout(() => {
        quotes.classList.add('blur')
        counter.classList.add('visible')
      }, 200)

      setTimeout(() => {
        quotes.classList.add('is-faster')
      }, 2200)
    })
  },
  methods: {
    onClick() {
      this.$refs.quotes.classList.remove('blur')
      this.$refs.quotes.addEventListener('transitionend', this.onTransitionEnd)
    },
    onTransitionEnd({ propertyName }) {
      if (propertyName !== 'opacity') return false

      if (this.activeSlide === this.slides.length - 1) {
        this.activeSlide = 0
      } else {
        this.activeSlide++
      }

      const { quotes } = this.$refs
      if (!quotes) return false

      quotes.classList.add('blur')
      quotes.removeEventListener('transitionend', this.onTransitionEnd)
    }
  }
}
</script>

<style lang="sass" scoped>
.vision-next
  position: relative
  z-index: 1

.vision-counter span
  display: block
  transform: translateY(100%)
  opacity: 0
  transition: opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)

.vision-counter.visible span
  transform: translateY(0)
  opacity: 1

.vision-counter
  overflow: hidden
  font-size: 14px

  position: absolute
  bottom: 6%
  right: var(--unit)

  @media (max-width: 500px)
    right: 50%
    transform: translateX(50%)

.vision-container
  position: relative
  min-height: 100vh
  min-height: calc(var(--vh, 1vh) * 100)
  width: 100vw
  overflow: hidden
  flex-direction: column

.vision-container p
  line-height: 1.4444
  text-align: center

  max-width: column-spans(8)

  @media (max-width: 500px)
    text-align: left
    line-height: 1.3

    max-width: 100%
    padding-left: var(--unit)
    padding-right: var(--unit)

.vision-container /deep/ i
  +pf(i)

.quotes
  color: transparent
  text-shadow: 0px 0px 15px #000
  opacity: 0
  transition: 2s

.quotes.blur
  text-shadow: 0px 0px 0px #000
  opacity: 1

.quotes.is-faster
  transition: 1s
</style>
