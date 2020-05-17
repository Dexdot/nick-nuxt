<template>
  <section
    class="wideslider"
    :style="{ backgroundColor: content.color || '#1F2020' }"
  >
    <div v-swiper:swiper="swiperOptions">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide wideslider__li"
          v-for="(img, i) in content.images"
          :key="i + img.fields.file.url"
        >
          <BaseImage v-if="isImage(img)" :img="img" :alt="img.fields.title" />
          <video
            v-if="isVideo(img)"
            :src="img.fields.file.url"
            playsInline
            loop
            autoplay
            muted
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { isImage, isVideo } from '~/assets/scripts/helpers'

export default {
  props: ['content'],
  data: () => ({
    swiperOptions: {
      speed: 400,
      slidesPerView: 'auto',
      centeredSlides: true,
      slideToClickedSlide: true,
      grabCursor: true
    }
  }),
  beforeDestroy() {
    this.swiper.destroy(true, false)
  },
  methods: {
    isImage,
    isVideo
  }
}
</script>

<style lang="sass" scoped>
.wideslider
  padding: 15% 0
  width: 100vw

  margin-bottom: 9%
  margin-left: calc(-1 * #{mix(2)} - #{var(--unit)})

  @media (max-width: 900px)
    margin-bottom: 48px
    margin-left: calc(-1 * var(--unit))


.wideslider__li
  display: flex
  align-items: center
  justify-content: center
  width: calc(#{mix(11)} + #{gutters(1)} / 2)

  margin-left: 2.135vw
  margin-right: 2.135vw

  @media (max-width: 900px)
    width: column-spans(10)

  @media (max-width: $mob)
    width: calc(100vw - var(--unit) * 2)

  margin-left: var(--unit)
  margin-right: var(--unit)

  img, video
    display: block
    height: auto
    width: 100%
</style>
