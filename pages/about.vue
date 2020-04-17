<template>
  <main class="about">
    <div class="about-container container">
      <section class="about__info u-flex">
        <article class="about__text">
          <p v-for="(p, i) in content.text" :key="i" v-html="render(p)"></p>
          <img class="sign" src="~assets/svg/sign.svg" alt="Подпись" />
        </article>

        <div class="about__contact">
          <p>Контакты</p>

          <ul>
            <li>
              <a :href="`mailto:${this.content.email}`">{{
                this.content.email
              }}</a>
            </li>
            <li>
              {{ this.content.postAddress }}
            </li>
            <li>
              Saint Petersburg
            </li>
            <li>
              Russia
            </li>
          </ul>

          <ul class="about__social">
            <li>
              <a href="https://behance.net/stereocage" target="_blank"
                >Behance</a
              >
            </li>
            <li>
              <a href="https://dribbble.com/stereocage" target="_blank"
                >Dribbble</a
              >
            </li>
            <li>
              <a href="https://instagram.com/stereocage" target="_blank"
                >Instagram</a
              >
            </li>
            <li>
              <a href="https://facebook.com/stereocage" target="_blank"
                >Facebook</a
              >
            </li>
            <li>
              <a href="https://github.com/Dexdot" target="_blank">Github</a>
            </li>
          </ul>

          <CreditsButton
            class="about-credits"
            @click="$store.dispatch('dom/toggleModal', 'credits')"
            :style="translateY"
          />
        </div>
      </section>

      <ul class="about__list u-flex">
        <li v-for="item in content.mediaList" :key="item.fields.file.url">
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

      <figure class="about__big">
        <video
          class="about__big-inner"
          v-if="isVideo(content.mediaBig)"
          :src="content.mediaBig.fields.file.url"
          autoplay
          playsinline
          loop
          muted
        />

        <BaseImage
          class="about__big-inner"
          v-if="isImage(content.mediaBig)"
          :img="content.mediaBig"
          :alt="content.mediaBig.fields.title"
        />

        <h1 class="about__title">
          <span>No one there</span><span>get back</span>
        </h1>
      </figure>
    </div>

    <Next class="about-next" to="/vision" :isPageDark="true">
      <span slot="title">Vision</span>
      <span slot="text">Looking the world through my eyes </span>
    </Next>
  </main>
</template>

<script>
import page from '~/mixins/page'
import render from '~/mixins/render'

import Next from '~/components/Next'
import CreditsButton from '~/components/CreditsButton'

import { isImage, isVideo } from '~/assets/scripts/helpers'

export default {
  mixins: [page, render],
  components: {
    CreditsButton,
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

    return { content }
  },
  mounted() {
    this.$store.dispatch('dom/toggleDark', true)

    setTimeout(() => {
      this.observe()
    }, 400)
  },
  methods: {
    observe() {
      const elements = this.$el.querySelectorAll(`
        .about__text > p,
        .sign,
        .about__contact > p,
        .about__contact li,
        .about-credits,
        .about__list li,
        .about__big-inner,
        .about__title
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
    isImage(item) {
      return isImage(item)
    },
    isVideo(item) {
      return isVideo(item)
    }
  }
}
</script>

<style lang="sass" scoped>
.about-next
  position: relative
  z-index: 1

.about-container
  min-height: 100vh
  padding-top: 5.6vh
  padding-bottom: 10.5%

  @media (max-width: 800px) and (min-height: 801px)
    padding-top: 240px
    padding-bottom: 320px

  @media (max-width: 800px) and (max-height: 800px)
    padding-top: 36vh
    padding-bottom: 48vh

.about__info
  padding-top: 8px
  padding-left: mix(3)
  margin-bottom: 12.2%

  @media (max-width: 800px)
    padding-left: 0
    flex-direction: column
    margin-bottom: 80px

.about__text
  width: mix(3)
  line-height: 1.625

  @media (max-width: 800px)
    width: 100%
    margin-bottom: 96px

.about__text p
  margin-bottom: 24px

.about__contact
  margin-left: gutters(1)

  @media (max-width: 800px)
    margin: 0

.about__contact ul
  padding-top: 24px

.about__contact ul li
  margin-bottom: 8px

.about__list
  padding-left: mix(3)
  margin-left: calc(#{gutters(1)} * -1)
  margin-bottom: 11.4%

  @media (max-width: 800px)
    padding: 0
    margin: 0
    flex-direction: column

.about__list > li
  margin-left: gutters(1)

  @media (max-width: 800px)
    margin-left: 0
    margin-bottom: 104px
    width: 100%

.about__list > li:nth-child(even) .about__img
  @media (max-width: 800px)
    margin-left: auto

.about__img
  position: relative
  width: column-spans(3)
  padding-bottom: 177.77%

  @media (max-width: 800px)
    width: 58.6vw
    padding-bottom: 118%

.about__img video,
.about__img img
  position: absolute
  top: 0
  left: 0

  width: 100%
  height: 100%
  object-fit: cover

.about__big
  position: relative
  width: calc(#{var(--unit)} + #{column-spans(7)})
  padding-bottom: 40.917%
  margin-left: calc(-1 * var(--unit))

  @media (max-width: 800px)
    margin-left: calc(-1 * var(--unit))
    width: 91.5vw
    padding-bottom: 72%

.about__big img
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  object-fit: cover

.about__title
  position: absolute
  top: 0
  left: 100%
  writing-mode: vertical-lr
  transform: rotate(-180deg) translateX(minus(gutters(1)))

  display: none
  flex-direction: column-reverse
  align-items: flex-end

  text-align: right
  text-transform: uppercase
  font-weight: 400
  +yo('font-size', (375px: 18px, 1920px: 48px, 2550px: 64px))

  @media (max-width: 800px)
    left: unset
    right: 0
    top: calc(100% + var(--unit))
    transform: rotate(-180deg)

    white-space: nowrap

.sign
  margin-top: 24px
  width: 182px
  height: auto

.is-mob,
.is-safari
  .about-credits
    transform: unset !important


// HOVER
.about__social
  display: inline-flex
  flex-direction: column
  align-items: flex-start

.about__social a
  transition: .4s cubic-bezier(.25,.1,.25,1)

.about__social:hover a
  opacity: 0.3

.about__social a:hover
  opacity: 1


// OBSERVER ANIMATION
.about__text > p,
.sign,
.about__contact > p,
.about__contact li,
.about__list li,
.about__big-inner,
.about__title
  opacity: 0
  transition: .9s cubic-bezier(.215,.61,.355,1)

  &.visible
    opacity: 1

.about-credits
  z-index: 2
  opacity: 0
  transition: opacity .9s cubic-bezier(.215,.61,.355,1)

  &.visible
    opacity: 1

  @media (max-width: 500px)
    opacity: 1
    position: static

    display: block
    margin-top: 32px
    transform: translateY(0) !important

@for $i from 1 through 6
  .about__text > *
    &:nth-child(#{$i})
      transition: 1.2s cubic-bezier(.215,.61,.355,1) (#{$i*0.1s})

@for $i from 1 through 3
  .about__list li
    &:nth-child(#{$i})
      transition: 1.2s cubic-bezier(.215,.61,.355,1) (#{$i*0.1s})
</style>
