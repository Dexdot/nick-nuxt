<template>
  <transition name="stories">
    <section class="stories-section" v-show="active">
      <div class="stories-head" v-if="storiesPayload">
        <p class="t-ttu">{{ storiesPayload.title }}</p>

        <button
          class="stories-close"
          @click="$store.dispatch('dom/toggleModal', '')"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24 8L8 24" />
            <path d="M8 8L24 24" />
          </svg>
        </button>
      </div>

      <div
        v-if="storiesPayload"
        v-swiper:mySwiper.data="swiperOptions"
        @ready="onInit"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(story, i) in storiesPayload.list"
            :key="story.sys.id"
          >
            <div class="story-img" @click="onSlideClick($event, i)">
              <BaseImage
                class="story-img__i"
                v-if="isImage(story)"
                :img="story"
                :alt="story.fields.title"
              />
              <video
                v-if="isVideo(story)"
                class="story-img__i"
                :src="story.fields.file.url"
                playsinline
                autoplay
                muted
                loop
              />
            </div>
          </div>

          <div
            class="swiper-slide swiper-slide--last"
            v-if="storiesPayload.url"
          >
            <div
              class="story-img"
              @click="onSlideClick($event, storiesPayload.list.length)"
            >
              <a
                ref="link"
                :class="{
                  'long-text':
                    storiesPayload.url.replace(/(^\w+:|^)\/\//, '').length > 35
                }"
                :href="storiesPayload.url"
                target="_blank"
                @click.prevent
              >
                <span class="t-ttu">{{
                  storiesPayload.url.replace(/(^\w+:|^)\/\//, '')
                }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { isImage, isVideo } from '~/assets/scripts/helpers'

export default {
  data: () => ({
    swiper: {},
    swiperOptions: {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 'auto',
      autoHeight: true,
      centeredSlides: true,
      grabCursor: true
    }
  }),
  computed: {
    ...mapGetters({
      storiesPayload: 'dom/storiesPayload',
      modalName: 'dom/modalName',
      isModalActive: 'dom/isModalActive'
    }),
    active() {
      return this.isModalActive && this.modalName === 'stories'
    }
  },
  watch: {
    active(opening) {
      if (opening && this.swiper.data) {
        this.swiper.data.slideTo(0)
      }
    }
  },
  mounted() {},
  beforeDestroy() {
    this.swiper.data.destroy(true, false)
  },
  methods: {
    isImage,
    isVideo,
    onSlideClick(e, i) {
      const swiper = this.swiper.data

      const isLast =
        i === this.storiesPayload.list.length && i === swiper.activeIndex

      if (!this.storiesPayload.url || !isLast) {
        swiper.slideTo(i)
      } else if (isLast) {
        window.open(this.$refs.link.href)
      }
    },
    onInit() {
      this.$set(this.swiper, 'data', this.mySwiper)
    }
  }
}
</script>

<style lang="sass" scoped>
// Animation
.stories-enter,
.stories-leave-to
  opacity: 0
  pointer-events: none

.stories-enter-to,
.stories-leave
  opacity: 1
  pointer-events: auto

.stories-enter-active,
.stories-leave-active
  transition: 0.25s $ease-out

// Styles
.stories-head
  width: 100%
  display: flex
  align-items: center
  justify-content: space-between

  position: absolute
  top: 3.7%
  padding: 0 var(--unit)

  @media (max-width: 900px)
    top: 32px

.stories-section
  z-index: 3
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0

  padding-top: 13.4vh
  width: 100vw
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  overflow: hidden

  display: flex
  align-items: center
  justify-content: center

  background: #fff

  @media (min-width: 1001px) and (max-width: 1440px) and (max-height: 700px)
    align-items: flex-end
    padding-bottom: 24px

  @media (max-width: 1000px)
    padding-top: 0

  @media (max-width: $mob)
    padding-top: 40px

.stories-close
  cursor: pointer

  display: block
  width: 32px
  height: 32px

  @media (max-width: $mob)
    width: 24px
    height: 24px

.stories-close svg
  stroke: var(--color-text-lt)
  @media (max-width: $mob)
    width: 24px
    height: 24px

.story-img
  will-change: transform
  position: relative
  width: mix(3)

  &::before
    content: ''
    display: block
    width: 100%
    padding-bottom: 175.65%

    @media (max-width: $mob)
      padding-bottom: 160%

  @media (max-width: $mob)
    width: calc(100vw - (4 * var(--unit)))

.story-img__i
  position: absolute
  top: 0
  left: 0

  width: 100%
  height: 100%
  object-fit: cover

.swiper-slide
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)
  width: auto

  @media (max-width: $mob)
    transition: transform 0.2s ease

  .story-img
    margin-left: 1vw
    margin-right: 1vw
    @media (max-width: $mob)
      margin-left: 0.27vw
      margin-right: 0.27vw

.swiper-slide:not(.swiper-slide-active)
  transform: scale(0.89)

  @media (max-width: $mob)
    transform: scale(0.855)

.swiper-slide-active
  transform: scale(1)

// Last slide url
.swiper-slide--last
  .story-img::before
    background: #fff

  a
    border: 1px solid var(--color-text-lt)

    z-index: 1
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

    width: 99%
    height: 99%
    display: flex
    align-items: center
    justify-content: center

    span
      transform: rotate(-180deg)
      writing-mode: vertical-lr

      @media (max-width: 1440px)
        font-size: 12px

    &.long-text span
      font-size: 12px

      @media (max-width: 1440px)
        font-size: 11px
</style>
