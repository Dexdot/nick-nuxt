<template>
  <div>
    <section style="height: 100vh;"></section>
    <section style="height: 100vh;"></section>
  </div>
</template>

<script>
import page from '~/mixins/page'

export default {
  mixins: [page],
  head() {
    return {
      title: 'Index'
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
