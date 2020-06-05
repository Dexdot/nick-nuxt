<template>
  <ul class="previews-list" @click="$emit('click')">
    <li
      class="previews-li"
      v-show="i === index"
      v-for="(item, i) in list"
      :key="i + item.fields.file.url"
    >
      <button class="preview-btn">
        <BaseImage
          class="preview-btn"
          v-if="isImage(item)"
          :img="item"
          :alt="item.fields.title"
        />
        <video
          v-if="isVideo(item)"
          class="preview-btn"
          :src="item.fields.file.url"
          playsinline
          autoplay
          muted
          loop
        />
      </button>
    </li>
  </ul>
</template>

<script>
import { isImage, isVideo } from '~/assets/scripts/helpers'

export default {
  props: {
    large: Boolean,
    list: Array
  },
  data: () => ({
    index: 0,
    interval: null
  }),
  created() {
    this.notEmptyList = this.list && this.list.length > 1
  },
  methods: {
    isImage,
    isVideo,
    start() {
      if (!this.notEmptyList) return false

      this.interval = setInterval(() => {
        if (this.index === this.list.length - 1) {
          this.index = 0
        } else {
          this.index = this.index + 1
        }
      }, 300)
    },
    stop() {
      clearInterval(this.interval)
      this.index = 0
    }
  }
}
</script>

<style lang="sass" scoped>
.previews-li
  position: relative

  width: 96px
  height: 96px

  display: flex
  align-items: center
  justify-content: center

  border: 2px solid #fff
  border-radius: 50%

.preview-btn
  width: 88px
  height: 88px
  border-radius: 50%
  object-fit: cover
</style>
