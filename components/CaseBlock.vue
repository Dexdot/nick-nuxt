<template>
  <div>
    <div class="case-block">
      <div
        class="case-block__img"
        :style="{
          '--width': content.imageWidth || 3,
          '--offset': content.imageOffset || 0
        }"
        v-if="content.image"
      >
        <BaseImage
          v-if="isImage(content.image)"
          :img="content.image"
          :alt="content.image.fields.title"
          draggable="false"
        />

        <video
          v-if="isVideo(content.image)"
          :src="content.image.fields.file.url"
          playsinline
          autoplay
          muted
          loop
          draggable="false"
        />
      </div>

      <div
        class="case-block__text case-block__text--1"
        :style="{
          '--width': content.text1Width || 3,
          '--offset': content.text1Offset || 0
        }"
        v-if="content.text1 && content.text1.content.length > 0"
      >
        <div
          v-for="(item, i) in content.text1.content"
          :key="i + item.nodeType"
        >
          <p v-if="isText(item)" v-html="render(item)"></p>
        </div>
      </div>

      <div
        class="case-block__text case-block__text--2"
        :style="{
          '--width': content.text2Width || 3,
          '--offset': content.text2Offset || 0
        }"
        v-if="content.text2 && content.text2.content.length > 0"
      >
        <div
          v-for="(item, i) in content.text2.content"
          :key="i + item.nodeType"
        >
          <p v-if="isText(item)" v-html="render(item)"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import render from '~/mixins/render'
import { isImage, isVideo } from '~/assets/scripts/helpers'

export default {
  mixins: [render],
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
.case-block
  position: relative

.case-block__img
  @media (min-width: $tab + 1)
    margin-left: mix(var(--offset))
    width: column-spans(var(--width))

  @media (max-width: $tab)
    margin-bottom: 8px

  img, video
    display: block
    width: 100%
    height: auto

.case-block__text
  @media (min-width: $tab + 1)
    position: absolute
    top: 0
    left: mix(var(--offset))
    width: column-spans(var(--width))

.case-block__text--1
  @media (max-width: $tab)
    margin-bottom: 16px

.case-block__text--2
  @media (max-width: $tab)
    margin-bottom: 32px
</style>
