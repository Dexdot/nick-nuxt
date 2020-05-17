<template>
  <div>
    <Main :scroll="scroll" :isNextVisible="isNextVisible" :cases="mainCases" />
    <Next
      @intersect="onNextIntersect"
      @notintersect="onNextIntersect"
      to="/about"
      :isPageDark="false"
    >
      <span slot="title">About</span>
      <span slot="text"
        >Digital designer & art director from St.Petersburg
      </span>
      <BaseImage
        slot="image"
        v-if="aboutImage"
        :img="aboutImage"
        :alt="aboutImage.fields.title"
      />
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
      title: 'Index'
    }
  },
  data: () => ({
    isNextVisible: false
  }),
  computed: {
    ...mapGetters({
      mainCases: 'cases/mainCases'
    })
  },
  mounted() {
    this.$store.dispatch('dom/toggleDark', false)
  },
  async asyncData({ store }) {
    // Cases
    await store.dispatch('cases/loadMainCases')

    // About image
    let about = store.getters['other/about']
    if (!about || !about.fields) about = await store.dispatch('other/loadAbout')

    const aboutImage = about.fields.mediaList[0]

    return { aboutImage }
  },
  methods: {
    onNextIntersect(entry) {
      this.isNextVisible = entry.intersectionRatio >= 0.3
    }
  }
}
</script>
