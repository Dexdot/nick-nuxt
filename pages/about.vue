<template>
  <main class="about">
    <div class="about-container">
      <article class="about__text-wrap">
        <p class="about__date">2016-2020</p>
        <div
          :class="[
            'about__text about__text--desktop',
            { 'about__text--animated': isTextAnimated }
          ]"
        >
          <p v-for="(p, i) in content.text" :key="i" v-html="render(p)"></p>
        </div>
        <div
          :class="[
            'about__text about__text--mob',
            { 'about__text--animated': isTextAnimated }
          ]"
        >
          <p v-for="(p, i) in mobileText" :key="i" v-html="render(p)"></p>
        </div>
      </article>

      <ul class="about__img-list">
        <li
          v-for="(item, i) in content.mediaList"
          :key="item.fields.file.url"
          :style="{ '--delay': `${(i + 1) * 0.1}s` }"
        >
          <figure class="about__img">
            <video
              v-if="isVideo(item)"
              :src="item.fields.file.url"
              autoplay
              playsinline
              loop
              muted
            />

            <BaseImage
              v-if="isImage(item)"
              :img="item"
              :alt="item.fields.title"
            />
          </figure>
        </li>
      </ul>

      <div class="about__info">
        <figure class="about__info-img">
          <video
            v-if="isVideo(content.mediaBig)"
            :src="content.mediaBig.fields.file.url"
            autoplay
            playsinline
            loop
            muted
          />

          <BaseImage
            v-if="isImage(content.mediaBig)"
            :img="content.mediaBig"
            :alt="content.mediaBig.fields.title"
          />
        </figure>

        <div class="about__info-contact">
          <ul>
            <li :style="{ '--delay': `0.05s` }">
              <a :href="`mailto:${this.content.email}`">{{
                this.content.email
              }}</a>
            </li>
            <li :style="{ '--delay': `0.01s` }">
              {{ this.content.postAddress }}
            </li>
            <li :style="{ '--delay': `0.15s` }">
              Saint Petersburg
            </li>
            <li :style="{ '--delay': `0.2s` }">
              Russia
            </li>
          </ul>

          <ul class="about__social">
            <li :style="{ '--delay': `0.25s` }">
              <a href="https://behance.net/stereocage" target="_blank"
                >behance</a
              >
            </li>
            <li :style="{ '--delay': `0.3s` }">
              <a href="https://dribbble.com/stereocage" target="_blank"
                >dribbble</a
              >
            </li>
            <li :style="{ '--delay': `0.35s` }">
              <a href="https://instagram.com/stereocage" target="_blank"
                >instagram</a
              >
            </li>
            <li :style="{ '--delay': `0.4s` }">
              <a href="https://facebook.com/stereocage" target="_blank"
                >facebook</a
              >
            </li>
          </ul>
        </div>

        <button
          class="about__credits"
          type="button"
          @click="$store.dispatch('dom/toggleModal', 'credits')"
        >
          Credits
        </button>
      </div>
    </div>

    <Next class="about-next" to="/vision" :isPageDark="true">
      <span slot="title">Vision</span>
      <span slot="text">Looking the world through<br />eyes of another</span>
    </Next>
  </main>
</template>

<script>
import page from '~/mixins/page'
import render from '~/mixins/render'

import Next from '~/components/Next'
import { isImage, isVideo, hasUnderline, copy } from '~/assets/scripts/helpers'

function createMobileText(content) {
  let textIndex
  let contentItemIndex
  let underlinedItem

  content.text.forEach((text, i) => {
    text.content.forEach((item, j) => {
      if (hasUnderline(item)) {
        underlinedItem = copy({ ...item })
        textIndex = i
        contentItemIndex = j
      }
    })
  })

  if (underlinedItem) {
    const textArray = copy([...content.text])
    textArray[textIndex].content.splice(contentItemIndex, 1)
    textArray.unshift({
      data: {},
      nodeType: 'paragraph',
      content: [underlinedItem]
    })

    return textArray
  }

  return copy(content.text)
}

export default {
  mixins: [page, render],
  components: {
    Next
  },
  head() {
    return {
      title: 'About'
    }
  },
  async asyncData({ store }) {
    const about = await store.dispatch('other/loadAbout')
    const { fields } = about
    const content = {}

    content.email = fields.email
    content.postAddress = fields.postAddress
    content.text = fields.text.content

    content.mediaList = [...fields.mediaList]
    content.mediaBig = { ...fields.mediaBig }

    const mobileText = createMobileText(content)

    return {
      isTextAnimated: false,
      content,
      mobileText
    }
  },
  mounted() {
    this.$store.dispatch('dom/toggleDark', true)

    this.$nextTick(() => {
      this.split()
    })
  },
  methods: {
    async split() {
      await import('~/assets/scripts/split-text')

      this.splitDesktop()
      this.splitMob()

      setTimeout(() => {
        this.observe()
      }, 400)
    },
    splitDesktop(type) {
      let split = new SplitText('.about__text--desktop p', { type: 'lines' })

      split = new SplitText('.about__text--desktop p', {
        type: 'lines',
        linesClass: 'about__text-line'
      })

      split.lines.forEach((line, i) => {
        line.style.setProperty('--delay', `${i * 0.05}s`)

        if (i === split.lines.length - 1) {
          line.addEventListener('transitionend', ({ propertyName }) => {
            if (propertyName === 'transform') this.isTextAnimated = true
          })
        }
      })
    },
    splitMob() {
      let split = new SplitText('.about__text--mob p', { type: 'lines' })

      split = new SplitText('.about__text--mob p', {
        type: 'lines',
        linesClass: 'about__text-line'
      })

      split.lines.forEach((line, i) => {
        line.style.setProperty('--delay', `${i * 0.05}s`)

        if (i === split.lines.length - 1) {
          line.addEventListener('transitionend', ({ propertyName }) => {
            if (propertyName === 'transform') this.isTextAnimated = true
          })
        }
      })
    },
    observe() {
      const elements = this.$el.querySelectorAll(`
        .about__date,
        .about__text p,
        .about__img-list li,
        .about__info-img,
        .about__info-contact li
      `)

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      })

      elements.forEach(el => {
        observer.observe(el)
      })
    },
    isImage,
    isVideo
  }
}
</script>

<style lang="sass" scoped>
// Container
.about-container
  min-height: 100vh
  padding-top: 8px

  color: rgba(#fff, 0.6)

  @media (max-width: $tab-sm)
    padding: 32px 0 24px

  /deep/ a
    opacity: 0.6
    transition: opacity $trs

    &:hover
      opacity: 1


// Date
.about__date
  --delay: 0.8s

  position: absolute
  left: var(--unit)
  top: calc(3.75vw * 4.5)
  transform: translateY(-50%)

  @media (max-width: $tab-sm)
    font-size: 18px
    width: 2.5em

    top: 100%
    transform: translateY(-100%)

.about__text-wrap,
.about__img-list
  margin-bottom: 160px

  @media (max-width: $tab) and (min-width: $tab-sm + 1)
    margin-bottom: 80px


// Text wrap
.about__text-wrap
  position: relative

  @media (max-width: $tab-sm)
    margin-bottom: 40px


// Text
.about__text
  padding: 0 var(--unit)

.about__text /deep/ u
  +link(transparent)
  -webkit-text-stroke-width: 1px
  -webkit-text-stroke-color: rgba(#fff, 0.6)

.about__text--mob
  @media (min-width: $tab-sm + 1)
    display: none

  p:nth-child(n + 3)
    padding-left: 80px

.about__text--desktop
  @media (max-width: $tab-sm)
    display: none

  p:nth-child(1)
    max-width: 22.9em

  p:not(:nth-child(1))
    padding-left: mix(1)

  p:nth-child(n + 3)
    padding-right: mix(1)

.about__text p
  +hoves(l)
  letter-spacing: -0.04em
  line-height: 0.96
  font-size: 3.75vw

  @media (max-width: $tab-sm)
    font-size: 6.3vw


// Images list
.about__img-list
  display: flex
  padding: 0 var(--unit) 0 calc(#{var(--unit)} + #{mix(1)})

  @media (max-width: $tab-sm)
    padding: 0 var(--unit) 0 calc(#{var(--unit)} + 80px)
    flex-direction: column
    margin-bottom: 8px

  li:nth-child(n + 3)
    display: none

  li:nth-child(1)
    width: columns(1)

    @media (max-width: $tab-sm)
      margin-bottom: 8px
      width: 100%

    .about__img::before
      padding-top: 180.2%

      @media (max-width: $tab-sm)
        padding-top: 152%

  li:nth-child(2)
    margin-left: gutters(1)
    width: column-spans(3)

    @media (max-width: $tab-sm)
      margin: 0
      width: 100%

    .about__img::before
      padding-top: 57.45%

      @media (max-width: $tab-sm)
        padding-top: 65.94%


// Image
.about__img
  width: 100%
  position: relative

  &::before
    content: ''
    display: block
    width: 100%

  img, video
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover


// Info
.about__info
  display: flex
  position: relative

  @media (min-width: $tab-sm + 1)
    padding-bottom: 48px
    align-items: flex-end

  @media (max-width: $tab-sm)
    flex-direction: column
    align-items: flex-start


// Info image
.about__info-img
  position: relative

  @media (min-width: $tab-sm + 1)
    min-width: calc(#{var(--unit)} + #{column-spans(3)})
    width: calc(#{var(--unit)} + #{column-spans(3)})
    
  @media (max-width: $tab-sm)
    margin-bottom: 24px
    width: calc(100% - #{var(--unit)})

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


// Info contact
.about__info-contact
  @media (min-width: $tab-sm + 1)
    margin-left: auto

  @media (max-width: $tab-sm)
    margin: 0 0 24px var(--unit)

  @media (min-width: 1401px)
    min-width: column-spans(1)
    width: column-spans(1)

  @media (max-width: 1400px) and (min-width: $tab-sm + 1)
    margin-right: var(--unit)


// Credits
.about__credits
  z-index: 1

  @media (min-width: $tab-sm + 1)
    position: absolute
    bottom: 0
    left: calc(#{var(--unit)} + #{column-spans(3)})
    transform: translateX(-100%)

  @media (max-width: $tab-sm)
    margin: 0 var(--unit) 0 auto


// Social
.about__social
  padding-top: 24px

  @media (max-width: $tab-sm)
    font-size: 18px

.about__social a
  transition: .4s cubic-bezier(.25,.1,.25,1)
  &:hover
    opacity: 1


// Next
.about-next
  position: relative
  z-index: 1

  /deep/
    .next-row
      @media (max-width: $tab-sm)
        flex: unset

    .next-img
      @media (max-width: $tab-sm)
        display: none

    .next-container
      @media (max-width: $tab-sm)
        padding: 0 var(--unit) 64px
        justify-content: flex-end


// OBSERVER ANIMATION
.about__info-contact li,
.about__date,
  opacity: 0
  transition: .9s cubic-bezier(.215,.61,.355,1)
  transition-delay: var(--delay)

  &.visible
    opacity: 1

.about__info-img,
.about__img-list li
  opacity: 0
  transform: translateY(104px)
  transition: 0.8s cubic-bezier(0.45, 0, 0.55, 1)

  &.visible
    transform: translateY(0)
    opacity: 1
    

.about__text:not(.about__text--animated) /deep/ div
  overflow: hidden

.about__text /deep/ div > div
  transform: translateY(100%)
  transition: transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)
  transition-delay: var(--delay)

.about__text p.visible /deep/ div
  transform: translateY(0)
</style>
