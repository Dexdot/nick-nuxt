<template>
  <div class="mobile-box-container">
    <ul :class="[`mobile-box mobile-box--${content.images.length} u-flex`]">
      <li
        class="mobile-box__li"
        v-for="(img, i) in content.images"
        :key="i + img.fields.file.url"
      >
        <BaseImage
          v-if="isImage(img)"
          class="mobile-box__img"
          :img="img"
          :alt="img.fields.title"
          draggable="false"
        />
        <video
          v-if="isVideo(img)"
          class="mobile-box__img"
          :src="img.fields.file.url"
          playsinline
          autoplay
          muted
          loop
          draggable="false"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { isImage, isVideo } from '~/assets/scripts/helpers'

export default {
  props: {
    content: Object
  },
  methods: {
    isImage,
    isVideo
  },
  mounted() {
    this.$el.style.setProperty('--boxcolor', this.content.color || '#DDDDDD')
  }
}
</script>

<style lang="sass" scoped>
.mobile-box-container
  @media (min-width: 701px)
    background-color: var(--boxcolor)

.mobile-box
  display: flex
  align-items: center
  justify-content: center

  padding: 12.4% 0
  margin-left: -4.6vw
  margin-bottom: gutters(1)

  @media (max-width: 700px)
    margin-left: calc(-1 * var(--unit))
    width: 100vw
    flex-direction: column
    background-color: var(--boxcolor)

$cols: column-spans(3)
$gut-half: calc(gutters(1) / 2)

.mobile-box__li
  width: gutter-spans(3)
  margin-left: gutters(2)

  @media (max-width: 700px)
    width: 100%
    margin-left: 0

.mobile-box__li:not(:last-child)
  @media (max-width: 700px)
    margin-bottom: 16px

// 3 images
.mobile-box--3
  @media (max-width: 1520px)
    margin-left: -24px

  @media (max-width: 1260px)
    padding: 80px 0
    margin-left: 0
    justify-content: flex-start
    flex-direction: column

  @media (max-width: 700px)
    margin-left: calc(-1 * var(--unit))
    padding: 80px var(--unit)

  .mobile-box__li
    @media (max-width: 1520px)
      margin-left: 24px

    @media (max-width: 1260px)
      margin-left: 0
      width: 400px

    @media (max-width: 700px)
      width: 100%

  .mobile-box__li:not(:first-child)
    @media (max-width: 1260px)
      margin-top: 40px

// 2 images
.mobile-box--2
  @media (max-width: 1000px)
    margin-left: -24px

  @media (max-width: 700px)
    padding: 80px var(--unit)
    margin-left: calc(-1 * var(--unit))

  .mobile-box__li
    @media (max-width: 1000px)
      margin-left: 24px

    @media (max-width: 800px)
      width: 40%

    @media (max-width: 700px)
      width: 100%
      margin-left: 0

  .mobile-box__li:not(:first-child)
    @media (max-width: 700px)
      margin-top: 40px

// 1 image
.mobile-box--1
  @media (max-width: 700px)
    padding: 80px var(--unit)

  .mobile-box__li
    @media (max-width: 700px)
      width: 100%


// Img
.mobile-box__img
  outline: none

  display: block
  max-width: 100%
  width: 100%
  height: auto
</style>
