<template>
  <nuxt-link v-if="!disable" class="menu__link" :to="to">
    <slot></slot>
  </nuxt-link>

  <span v-else class="menu__link">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    to: { type: [String, Object] },
    disable: { type: Boolean, default: false }
  }
}
</script>

<style lang="sass" scoped>
.menu__link
  +yo('font-size', (375px: 64px, 1920px: 96px))
  letter-spacing: -0.04em
  line-height: 0.96
</style>
