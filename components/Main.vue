<template>
  <main :class="['main', { 'main--dark': isDark }]">
    <no-ssr>
      <h1
        v-if="isDesktop"
        :class="['main-title', 't-h2', { soon: isSoon }]"
        :style="{
          transform: `translate3d(-50%, ${scrollY}px, 0)`
        }"
        ref="title"
      ></h1>
      <h1
        v-else
        v-show="!isNextVisible"
        :class="['main-title-mob', 't-h1', { soon: isSoon }]"
        :style="{
          transform: `translate3d(-50%, ${scrollY}px, 0)`
        }"
        ref="title-mob"
      >
        {{ titleMob }}
      </h1>
    </no-ssr>

    <ul class="cases">
      <li
        ref="cases"
        v-for="(project, caseIndex) in cases"
        :key="project.fields.slug"
        :class="['case', { 'case--soon': project.fields.soon }]"
        :data-title="project.fields.title"
      >
        <ul>
          <li
            v-for="(img, i) in project.fields.covers"
            :key="img.fields.file.fileName"
          >
            <span
              v-if="project.fields.soon"
              class="img"
              @mouseover="mouseover(project, i)"
              @mouseout="mouseout"
            >
              <div class="img__i">
                <video
                  v-if="isVideo(img)"
                  :src="img.fields.file.url"
                  autoplay
                  playsinline
                  loop
                  muted
                  @onloadeddata="firstCaseLoading += caseIndex === 0 ? 1 : 0"
                />

                <BaseImage
                  v-if="isImage(img)"
                  :img="img"
                  :alt="img.fields.title"
                  @complete="firstCaseLoading += caseIndex === 0 ? 1 : 0"
                />
              </div>
              <p
                v-if="project.fields.shortSubtitle && i === 0"
                class="case-subtitle"
              >
                {{ project.fields.shortSubtitle }}
              </p>
            </span>

            <nuxt-link
              v-else
              class="img"
              :to="`/case/${project.fields.slug}`"
              @mouseover.native="mouseover(project, i)"
              @mouseout.native="mouseout"
            >
              <div class="img__i">
                <video
                  v-if="isVideo(img)"
                  :src="img.fields.file.url"
                  autoplay
                  playsinline
                  loop
                  muted
                  @onloadeddata="firstCaseLoading += caseIndex === 0 ? 1 : 0"
                />

                <BaseImage
                  v-if="isImage(img)"
                  :img="img"
                  :alt="img.fields.title"
                  @complete="firstCaseLoading += caseIndex === 0 ? 1 : 0"
                />
              </div>
              <p
                v-if="project.fields.shortSubtitle && i === 0"
                class="case-subtitle"
              >
                {{ project.fields.shortSubtitle }}
              </p>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>

    <nuxt-link
      style="display: block"
      :to="$route.name === 'black' ? '/' : '/black'"
    >
      <Toggler />
    </nuxt-link>

    <div
      class="main-cover"
      :style="{
        transform: `translate3d(-50%, ${scrollY}px, 0)`
      }"
    ></div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { gsap } from 'gsap'
import charming from 'charming'

import { isImage, isVideo } from '~/assets/scripts/helpers'
import mainTransition from '~/assets/scripts/transitions/main'
import Toggler from '~/ui/Toggler'

export default {
  components: {
    Toggler
  },
  props: {
    scroll: {
      type: Object,
      default: () => ({})
    },
    isNextVisible: {
      type: Boolean,
      default: false
    },
    cases: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    chars: [],
    titleMob: '',
    isSoon: false,
    isDesktop: false,
    firstCaseLoading: 0
  }),
  computed: {
    ...mapGetters({
      isDark: 'dom/isDark'
    }),
    scrollY() {
      return this.scroll.lmS.smooth ? this.scroll.scroll.y : 0
    }
  },
  mounted() {
    // this.animateEnter()
    this.observeCases()
    this.onResize()
    window.addEventListener('resize', this.onResize.bind(this))
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    animateEnter() {
      mainTransition.enter({ el: this.$el })
      // if (document.readyState !== 'complete') {
      //   window.addEventListener('load', () => {
      //     mainTransition.enter({ el: this.$el })
      //   })
      // }
    },
    observeCases() {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            // Hide title if case is not visible
            if (
              !entry.isIntersecting &&
              entry.target.dataset.title === this.title
            ) {
              this.hideTitle()
            }

            if (entry.intersectionRatio >= 1) {
              if (!this.isDesktop)
                this.isSoon = entry.target.classList.contains('case--soon')

              this.titleMob = entry.target.dataset.title
            }
          })
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
      )

      this.$refs.cases.forEach(v => {
        observer.observe(v)
      })
    },
    mouseover(project) {
      if (!this.$refs.title) return false

      const { title, soon } = project.fields
      this.title = title
      this.isSoon = soon

      this.$refs.title.innerHTML = title
      charming(this.$refs.title)
      this.showTitle(true)
    },
    mouseout() {
      this.showTitle(false)
    },
    showTitle(show = true, cb) {
      const { title } = this.$refs
      if (!title) return false

      const chars = title.querySelectorAll('span')
      chars.forEach(char => {
        if (char.textContent === ' ') char.classList.add('is-space')
      })
      if (!show) this.isSoon = false

      gsap.killTweensOf(chars)

      gsap.fromTo(
        chars,
        {
          opacity: show ? 0 : 1,
          y: show ? 40 : 0
        },
        {
          opacity: show ? 1 : 0,
          y: show ? 0 : 40,
          ease: 'power3.out',
          duration: show ? 1 : 0.6,
          stagger: show ? 0.02 : 0,
          onComplete: () => {
            if (cb) cb()
          }
        }
      )
    },
    hideTitle() {
      const { title } = this.$refs
      if (!title) return false

      const chars = title.querySelectorAll('span')
      chars.forEach(char => {
        if (char.textContent === ' ') char.classList.add('is-space')
      })

      this.isSoon = false

      gsap.killTweensOf(chars)
      gsap.to(chars, {
        opacity: 0,
        y: -40,
        ease: 'power3.out',
        duration: 0.6
      })
    },
    onResize() {
      this.isDesktop = window.innerWidth >= 500
    },
    isImage,
    isVideo
  },
  watch: {
    firstCaseLoading(i) {
      if (i === 2 && document.readyState !== 'complete') this.animateEnter()
    }
  }
}
</script>

<style lang="sass" scoped>
.main
  min-height: 100vh

.main--dark
  .main-title,
  .main-title-mob
    &::before
      color: #fff

.main-cover
  z-index: 2
  position: fixed
  top: 0
  left: 50%
  width: 100%
  height: 100%
  pointer-events: none
  
.main-title
  pointer-events: none
  z-index: 1
  position: fixed
  top: 25vw
  left: 50vw
  margin-top: -0.5em

  @media (max-width: $mob)
    display: none

  /deep/ span
    display: inline-block
    will-change: transform, opacity
    &.is-space
      min-width: 0.3em

.main-title-mob
  pointer-events: none
  z-index: 1
  position: fixed
  top: 50vh
  left: 50vw

  white-space: nowrap
  text-align: center
  width: 100%
  margin-top: -0.5em
  display: none

  @media (max-width: $mob)
    max-width: 100%
    width: auto
    display: block

.is-mob .main-title-mob
  margin-top: 0
  transform: translate(-50%, -50%) !important

.img
  transition: transform .5s cubic-bezier(.455,.03,.515,.955)
  display: block
  position: relative

  &::before
    content: ''
    display: block
    width: 100%

.img__i
  position: absolute
  top: 0
  left: 0

  width: 100%
  height: 100%
  overflow: hidden
  transform: scaleX(1)

.img img,
.img video
  width: 100%
  height: 100%
  object-fit: cover
  transition: transform .8s cubic-bezier(.455,.03,.515,.955)
  transform: scaleX(1)

.case li
  opacity: 0
  transform: translateY(60%)

.case li:first-child .img:hover
  .case-subtitle
    opacity: 1

  img,
  video
    transform: scale3d(1.1, 1.1, 1)




.cases
  padding: 144px 0 37vh

  @media (max-width: $tab)
    padding: 204px 0 160px

.case-subtitle
  position: absolute
  top: calc(100% + 16px)
  left: 0

  transition: opacity .5s cubic-bezier(.455,.03,.515,.955)
  opacity: 0

  @media (max-width: $tab)
    display: none
  
.case
  position: relative

  &:not(:last-child)
    margin-bottom: 240px

    @media (max-width: $tab)
      margin-bottom: 160px


.case:nth-child(1),
.case:nth-child(15)
  padding-bottom: 80px
  
  @media (max-width: $tab)
    padding-bottom: 32px

  li:nth-child(1)
    margin-left: 32.13vw

    @media (max-width: $tab)
      margin-left: 19.2vw

  li:nth-child(2)
    position: absolute
    bottom: 0
    left: 11.66vw

    @media (max-width: $tab)
      left: 6.4vw

  li:nth-child(1) .img
    +case-a


  li:nth-child(2) .img
    +case-a-sm

  .case-subtitle
    left: unset
    right: 0
    text-align: right


.case:nth-child(2),
.case:nth-child(8)
  li
    margin-left: 7.5vw

    @media (max-width: $tab)
      margin-left: 4.266vw

  .img
    +case-b


.case:nth-child(3)
  .img
    +case-c
    margin-left: auto


.case:nth-child(4)
  .img
    +case-d
    margin: 0 auto


.case:nth-child(5),
.case:nth-child(13)
  .img
    +case-e

  .case-subtitle
    padding-left: 24px



.case:nth-child(6)
  li
    margin-left: 60.52vw

    @media (max-width: $tab)
      margin-left: 26.133vw

  .img
    +case-f


.case:nth-child(7)
  .img
    +case-e
    margin: 0 auto


.case:nth-child(9)
  .img
    +case-g
    margin-left: auto


.case:nth-child(10)
  .img
    +case-h
    margin: 0 auto


.case:nth-child(11)
  padding-bottom: 80px
  
  @media (max-width: $tab)
    padding-bottom: 32px

  li:nth-child(2)
    position: absolute
    bottom: 0
    right: 11.66vw

    @media (max-width: $tab)
      right: var(--unit)

  li:nth-child(1) .img
    +case-a
    margin-left: auto
    margin-right: 32.13vw

    @media (max-width: $tab)
      margin-right: 19.2vw


  li:nth-child(2) .img
    +case-a-sm

  .case-subtitle
    left: 0


.case:nth-child(12)
  .img
    +case-b
    margin-left: auto
    margin-right: 7.5vw

    @media (max-width: $tab)
      margin-left: 44.266vw



.case:nth-child(14)
  .img
    margin-left: auto
    +case-j


.case:nth-child(16)
  .img
    +case-k

  .case-subtitle
    padding-left: 24px


.case:nth-child(n + 17)
  display: none
</style>
