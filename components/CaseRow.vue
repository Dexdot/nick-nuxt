<template>
  <div>
    <ul class="case-row">
      <li
        class="case-row__li"
        v-for="(img, i) in content.images"
        :key="i + img.fields.file.url"
      >
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
  display: flex

  @media (min-width: $tab + 1)
    justify-content: space-between

  @media (max-width: $tab)
    flex-direction: column

.case-row__li
  @media (max-width: $tab)
    width: 100%
    
.case-row__li:first-child
  @media (min-width: $tab + 1)
    width: column-spans(2)

  @media (max-width: $tab)
    margin-bottom: 8px

.case-row__li:last-child
  @media (min-width: $tab + 1)
    width: column-spans(3)

.case-row__img
  display: block
  max-width: 100%
  width: 100%
  height: auto
</style>
