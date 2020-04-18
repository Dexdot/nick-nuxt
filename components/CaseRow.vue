<template>
  <div>
    <ul class="case-row u-flex">
      <li
        class="case-row__li"
        v-for="(img, i) in content.images"
        :key="i + img.fields.file.url"
      >
        <div
          v-if="content.box"
          class="case-box"
          :style="{ backgroundColor: content.color || '#DDDDDD' }"
        >
          <BaseImage
            v-if="isImage(img)"
            class="case-row__img case-box__img"
            :img="img"
            :alt="img.fields.title"
            draggable="false"
          />
          <video
            v-if="isVideo(img)"
            class="case-row__img case-box__img"
            :src="img.fields.file.url"
            playsinline
            autoplay
            muted
            loop
            draggable="false"
          />
        </div>

        <template v-else>
          <BaseImage
            v-if="isImage(img)"
            class="case-row__img"
            :img="img"
            :alt="img.fields.title"
            draggable="false"
          />
          <video
            v-if="isVideo(img)"
            class="case-row__img"
            :src="img.fields.file.url"
            playsinline
            autoplay
            muted
            loop
            draggable="false"
          />
        </template>
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
  }
}
</script>

<style lang="sass" scoped>
.case-row
  margin-left: calc(#{gutters(1)} * -1)
  margin-bottom: gutters(1)

  @media (max-width: 900px)
    margin-left: -16px

  @media (max-width: 700px)
    width: 100vw
    flex-direction: column
    margin-left: calc(-1 * var(--unit))

// LI
.case-row__li
  width: 50%
  margin-left: gutters(1)

  @media (max-width: 900px)
    margin-left: 16px

  @media (max-width: 700px)
    width: 100%
    margin-left: 0

.case-row__li:not(:last-child)
  @media (max-width: 700px)
    margin-bottom: 16px

.case-box
  padding: 10.4% 12.7%

  @media (max-width: 700px)
    padding: 12.9% var(--unit)

.case-box__img
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.15)

.case-row__img
  outline: none
  display: block
  max-width: 100%
  width: 100%
  height: auto
</style>
