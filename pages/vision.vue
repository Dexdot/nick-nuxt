<template>
  <main class="vision">
    <section class="vision-container u-center">
      <article class="quotes" ref="quotes">
        <p
          v-html="render(el)"
          v-for="(el, i) in slides[activeSlide]"
          :key="i"
        ></p>
      </article>

      <div class="vision-nav">
        <button
          @click="onClick('prev')"
          v-show="activeSlide !== 0"
          type="button"
        >
          Назад
        </button>
        <button
          @click="onClick('next')"
          v-show="activeSlide !== slides.length - 1"
          type="button"
        >
          Далее
        </button>

        <nuxt-link
          :class="[
            'u-center',
            'vision-link',
            { 'vision-link--hidden': activeSlide !== slides.length - 1 }
          ]"
          to="/black"
          type="button"
        >
          <img src="~assets/svg/moon.svg" alt="Moon" />
        </nuxt-link>
      </div>

      <button
        :class="[
          'vision-circle',
          { 'vision-circle--animated': isCircleAnimated },
          { 'vision-circle--hidden': activeSlide === slides.length - 1 }
        ]"
        ref="circle"
        type="button"
        @click="onCircleClick"
      >
        <img src="~assets/img/vision-circle.png" alt="Circle" />
        <img src="~assets/img/vision-circle-2.png" alt="Circle" />
      </button>

      <nuxt-link
        :class="[
          'u-center',
          'vision-link',
          'vision-link--circle',
          { 'vision-link--hidden': activeSlide !== slides.length - 1 }
        ]"
        to="/black"
        type="button"
      >
        <img src="~assets/svg/moon.svg" alt="Moon" />
      </nuxt-link>
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
    return {
      slides: getSlidesByHr(vision.fields),
      activeSlide: 0,
      dir: 'next',
      isCircleAnimated: false
    }
  },
  mounted() {
    this.$store.dispatch('dom/toggleDark', false)
    this.enterAnimation()
  },
  methods: {
    enterAnimation() {
      this.$nextTick(() => {
        const { quotes, circle } = this.$refs

        if (quotes) {
          setTimeout(() => {
            quotes.classList.add('blur')
          }, 200)

          setTimeout(() => {
            quotes.classList.add('is-faster')
          }, 2200)
        }

        if (circle) {
          this.isCircleAnimated = true
        }
      })
    },
    onCircleClick() {
      if (window.innerWidth <= 768) this.onClick('next')
    },
    onClick(dir = 'next') {
      this.dir = dir

      this.$refs.quotes.classList.remove('blur')
      this.$refs.quotes.addEventListener('transitionend', this.onTransitionEnd)
    },
    onTransitionEnd({ propertyName }) {
      if (propertyName !== 'opacity') return false

      if (this.dir === 'prev' && this.activeSlide > 0) {
        this.activeSlide--
      }

      if (this.dir === 'next' && this.activeSlide !== this.slides.length - 1) {
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
.vision-container
  background: #EDECED
  position: relative

  min-height: 100vh
  min-height: calc(var(--vh, 1vh) * 100)
  width: 100vw

  padding: 0 var(--unit)
  overflow: hidden
  flex-direction: column

.vision-container p:not(:first-child)
  line-height: 1.2

  @media (min-width: $tab-sm + 1)
    max-width: column-spans(2)

  @media (max-width: $tab-sm)
    align-self: flex-start

.vision-container /deep/ i
  +hoves(l)
  line-height: 0.96
  font-style: normal
  letter-spacing: -0.04em
  +yo('font-size', (375px: 36px, 1920px: 144px))

  display: block
  margin-bottom: 0.44em

  @media (max-width: $tab-sm)
    margin-bottom: 40px

.vision-circle
  position: absolute
  left: 50%

  width: 40vw
  height: 40vw

  transition: transform 1s ease-out, opacity 0.3s ease

  @media (min-width: $tab-sm + 1)
    pointer-events: none
    top: 50%
    transform: translate(-50%, -50%) scale(0)

  @media (max-width: $tab-sm)
    width: 200px
    height: 200px

    bottom: -16px
    transform: translate(-50%, 0) scale(0)

  img
    width: 100%
    height: 100%
    object-fit: contain

    &:first-child
      opacity: 0.8

      @media (max-width: $tab-sm)
        display: none

    &:last-child
      @media (min-width: $tab-sm + 1)
        display: none

  &::before
    @media (max-width: $tab-sm)
      content: ''
      display: block
      width: 56px
      height: 56px

      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)

      border-radius: 50%
      border: 1px solid #000

.vision-circle--hidden
  @media (max-width: $tab-sm)
    opacity: 0

.vision-circle--animated
  transform: translate(-50%, -50%) scale(1)

  @media (max-width: $tab-sm)
    transform: translate(-50%, 0) scale(1)


.vision-link
  transition: opacity 0.3s ease

.vision-link--circle
  position: absolute
  bottom: 56px
  left: 50%
  transform: translate(-50%, 0)
  
  width: 56px
  height: 56px

  border-radius: 50%
  border: 1px solid #000

  @media (min-width: $tab-sm + 1)
    display: none

  img
    width: 16px
    height: 16px

.vision-link--hidden
  opacity: 0
  pointer-events: none

.vision-nav
  z-index: 1
  position: absolute
  bottom: 24px
  left: calc(#{var(--unit)} + #{mix(3)})

  width: column-spans(2)
  display: flex
  align-items: center

  @media (max-width: $tab-sm)
    display: none

  button
    margin-right: 24px

  .vision-link
    margin-left: auto

.quotes
  position: relative
  z-index: 1

  color: transparent
  text-shadow: 0px 0px 15px #000
  opacity: 0
  transition: 2s

  width: 100%
  display: flex
  flex-direction: column
  align-items: flex-end

.quotes.blur
  text-shadow: 0px 0px 0px #000
  opacity: 1

.quotes.is-faster
  transition: 1s
</style>
