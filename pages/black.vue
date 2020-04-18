<template>
  <div>
    <Main :scroll="scroll" :isNextVisible="isNextVisible" :cases="blackCases" />
    <Next
      @intersect="onNextIntersect"
      @notintersect="onNextIntersect"
      to="/"
      :isDark="false"
      :isPageDark="true"
    >
      <span slot="title">There will be light</span>
      <span slot="text">Make a step and start over again </span>
    </Next>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import page from '~/mixins/page'
import Next from '~/components/Next'
import Main from '~/components/Main'

export default {
  mixins: [page],
  components: {
    Main,
    Next
  },
  head() {
    return {
      title: 'Black'
    }
  },
  data: () => ({
    isNextVisible: false
  }),
  computed: {
    ...mapGetters({
      blackCases: 'cases/blackCases'
    })
  },
  mounted() {
    this.$store.dispatch('dom/toggleDark', true)
  },
  async fetch({ store }) {
    await store.dispatch('cases/loadBlackCases')
  },
  methods: {
    onNextIntersect(entry) {
      this.isNextVisible = entry.intersectionRatio >= 0.3
    }
  }
}
</script>
