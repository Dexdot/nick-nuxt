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
          <span>Black</span>
          <img src="~assets/svg/moon.svg" alt="Moon" />
        </nuxt-link>
      </div>

      <button
        :class="[
          'vision-circle',
          { 'vision-circle--animated': isCircleAnimated },
          { 'vision-circle--last': activeSlide === slides.length - 1 }
        ]"
        :data-index="activeSlide + 1"
        ref="circle"
        type="button"
        @click="onCircleClick"
      >
        <img
          class="vision-circle__img"
          src="~assets/img/vision-circle.png"
          alt="Circle"
        />
        <img
          class="vision-circle__img"
          src="~assets/img/vision-circle-2.png"
          alt="Circle"
          ref="circle1"
        />
        <img
          class="vision-circle__img vision-circle__img--black"
          src="~assets/img/vision-circle-black.png"
          alt="Circle"
          ref="circleb"
        />
        <img
          class="vision-circle__moon"
          src="~assets/svg/moon-w.svg"
          alt="Moon"
        />
      </button>
    </section>
  </main>
</template>

<script>
import { gsap } from 'gsap'

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

    this.$nextTick(() => {
      if (document.readyState == 'complete') {
        setTimeout(() => {
          this.enterAnimation()
        }, 400)
      } else {
        window.addEventListener('load', this.enterAnimation.bind(this))
      }
    })
  },
  methods: {
    enterAnimation() {
      const { quotes, circle } = this.$refs

      if (quotes) {
        setTimeout(() => {
          quotes.classList.add('blur')
        }, 200)

        setTimeout(() => {
          circle.classList.add('is-faster')
          quotes.classList.add('is-faster')
        }, 2200)
      }

      if (circle) {
        this.isCircleAnimated = true
      }
    },
    onCircleClick() {
      if (window.innerWidth > 768) return false

      if (this.activeSlide !== this.slides.length - 1) {
        this.onClick('next')
      } else {
        this.$router.push('/black')
      }
    },
    onClick(dir = 'next') {
      this.dir = dir

      this.$refs.quotes.classList.remove('blur')
      this.$refs.quotes.addEventListener('transitionend', this.onTransitionEnd)

      this.animateCircle(0.56)
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
      this.animateCircle(1)
    },
    animateCircle(scale) {
      if (window.innerWidth > 768) return false

      const items = [this.$refs.circle1, this.$refs.circleb]
      gsap.set(items, { transition: 'unset' })

      gsap.to(items, {
        scale,
        duration: 0.8,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.set(items, { transition: '' })
        }
      })
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

.vision-container p:first-child
  text-align: right

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

  width: 50vw
  height: 50vw

  transition: 2s ease

  @media (min-width: $tab-sm + 1)
    pointer-events: none
    top: 50%
    transform: translate(-50%, -50%)

  @media (max-width: $tab-sm)
    width: 200px
    height: 200px

    bottom: -16px
    transform: translate(-50%, 0)

  &::before
    @media (max-width: $tab-sm)
      content: ''
      display: block
      width: 56px
      height: 56px

      z-index: 1
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)

      border-radius: 50%
      transition: $trs
      border: 1px solid #000

.vision-circle__img
  width: 100%
  height: 100%
  object-fit: contain
  transition: opacity $trs

  &:nth-child(1)
    @media (max-width: $tab-sm)
      display: none

.vision-circle__img:nth-child(2),
.vision-circle__img--black
  @media (min-width: $tab-sm + 1)
    display: none

.vision-circle__img--black,
.vision-circle__moon
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

.vision-circle__moon
  width: 16px
  height: 16px

  transition: opacity $trs
  pointer-events: none
  opacity: 0

  @media (min-width: $tab-sm + 1)
    display: none

.vision-circle:not(.vision-circle--animated)
  opacity: 0

.vision-circle[data-index="1"]
  @media (min-width: $tab-sm + 1)
    transform: translate(-50%, -50%) scale(0.6)

.vision-circle[data-index="2"]
  @media (min-width: $tab-sm + 1)
    transform: translate(-50%, -50%) scale(0.8)

.vision-circle[data-index="3"]
  @media (min-width: $tab-sm + 1)
    transform: translate(-50%, -50%) scale(1)

  .vision-circle__moon
    opacity: 1

.vision-circle:not(.vision-circle--last)
  .vision-circle__img--black
    @media (max-width: $tab-sm)
      opacity: 0

.vision-circle--last
  &::before
    border: 1px solid #c4c4c4

  .vision-circle__img:not(.vision-circle__img--black)
    @media (max-width: $tab-sm)
      opacity: 0

  .vision-circle__img--black
    @media (max-width: $tab-sm)
      opacity: 1

.vision-link
  transition: opacity 0.3s ease

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
    transform: translateY(-100%)
    margin-left: auto

    img
      margin-top: 2px
      margin-left: 4px

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

.vision-circle.is-faster
  transition: 1s ease

.quotes.is-faster
  transition: 1s
</style>
