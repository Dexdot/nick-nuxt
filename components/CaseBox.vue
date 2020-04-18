<template>
  <div>
    <div
      :class="[
        'case-box',
        {
          'case-box--no-mb': content.resetBottom,
          'case-box--fullscreen': content.fullscreen
        }
      ]"
      :style="{ backgroundColor: content.color || '#DDDDDD' }"
    >
      <template v-if="content.images.length > 1 && !content.disableSlider">
        <lory
          ref="slider"
          class="lory-images"
          :options="loryOptions"
          @lory-init="onLoryInit"
        >
          <item
            v-for="(img, i) in content.images"
            :key="i + img.fields.file.url"
          >
            <BaseImage
              v-if="isImage(img)"
              draggable="false"
              class="lory-image"
              :img="img"
              :alt="img.fields.title"
            />
            <video
              playsinline
              loop
              autoplay
              muted
              v-if="isVideo(img)"
              draggable="false"
              class="lory-image"
              :img="img"
            />
          </item>
        </lory>
        <ul class="case-box-dots u-center u-mla u-mra">
          <li
            class="u-center"
            v-for="(img, i) in content.images"
            :key="i + img.fields.file.url"
          >
            <button
              :class="['case-box-dot', { active: index === i }]"
              @click="slideTo(i)"
            ></button>
          </li>
        </ul>
      </template>

      <template v-else-if="content.images.length > 1 && content.disableSlider">
        <ul class="case-box__list">
          <li v-for="(img, i) in content.images" :key="i + img.fields.file.url">
            <BaseImage
              v-if="isImage(img)"
              :img="img"
              :alt="img.fields.title"
              draggable="false"
            />
            <video
              playsinline
              loop
              autoplay
              muted
              v-if="isVideo(img)"
              :src="img.fields.file.url"
              draggable="false"
            />
          </li>
        </ul>
      </template>

      <template v-else>
        <BaseImage
          v-if="isImage(content.images[0])"
          class="case-box-shadow"
          :img="content.images[0]"
          :alt="content.images[0].fields.title"
          draggable="false"
        />

        <video
          playsinline
          loop
          autoplay
          muted
          v-if="isVideo(content.images[0])"
          class="case-box-shadow"
          :src="content.images[0].fields.file.url"
          draggable="false"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { Lory, Item } from '~/components/Lory/index.js'
import { isImage, isVideo } from '~/assets/scripts/helpers'

export default {
  components: {
    Lory,
    Item
  },
  props: {
    content: Object
  },
  data: () => ({
    index: 0,
    lory: null,
    loryOptions: {
      slideSpeed: 800,
      enableMouseEvents: true,
      infinite: 1,
      ease: 'easeOutQuad'
    }
  }),
  methods: {
    onLoryInit(lory) {
      this.lory = lory
      this.$refs.slider.$el.addEventListener(
        'after.lory.slide',
        this.onSlide.bind(this)
      )
    },
    onSlide({ detail }) {
      this.index = detail.currentSlide - 1
    },
    slideTo(i) {
      if (this.lory) {
        this.lory.slideTo(i)
        this.index = i
      }
    },
    isImage,
    isVideo
  }
}
</script>

<style lang="sass" scoped>
// Slider items
.lory-images li
  vertical-align: middle

.case-box
  padding: 10.4% 12.7%

  @media (max-width: 700px)
    width: 100vw
    margin-left: calc(-1 * var(--unit))
    padding: 12.9% var(--unit)


// Fullscreen
.case-box--fullscreen
  width: 100vw
  margin-left: calc(-1 * #{mix(1)} - #{var(--unit)})
  @media (max-width: 900px)
    margin-left: calc(-1 * var(--unit))


// Reset margin bottom
.case-box:not(.case-box--no-mb)
  margin-bottom: gutters(1)

  @media (max-width: 900px)
    margin-bottom: 16px


// Shadow
.case-box-shadow
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.15)


// List
.case-box__list
  display: flex
  flex-direction: column

  > li:not(:last-child)
    margin-bottom: columns(1)
    @media (max-width: 900px)
      margin-bottom: 24px


// Dots
.case-box-dots
  margin-left: -16px
  transform: translateY(3vw)

  @media (max-width: 700px)
    transform: translateY(5vw)

.case-box-dots li
  margin-left: 16px
  width: 6px
  height: 6px

.case-box-dot
  border-radius: 50%
  background: var(--color-text-lt)
  opacity: 0.6
  transition: $trs

  width: 6px
  height: 6px

.case-box-dot.active
  opacity: 1


// Image / video
img, video
  outline: none
  display: block
  max-width: 100%
  width: 100%
  height: auto
</style>
