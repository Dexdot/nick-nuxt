<template>
  <main>
    <article class="case">
      <h1 class="case__title t-h3">{{ project.title }}</h1>
      <p>{{ project.subtitle }}</p>

      <div class="case__cover">
        <BaseImage
          class="case__img"
          draggable="false"
          :img="project.cover"
          :alt="project.cover.fields.title"
          @complete="onBaseImageComplete"
        />

        <div
          class="case__preview"
          v-if="project.stories && project.stories.length > 1"
        >
          <ButtonPreview
            ref="preview"
            :list="project.stories"
            @click="showStories"
          />
        </div>
      </div>

      <section :style="[{ 'min-height': `${asideHeight}px` }]">
        <aside ref="aside">
          <ul>
            <li>
              <b>{{ project.clientLabel || 'Client' }}</b>
              <p>{{ project.client }}</p>
            </li>
            <li>
              <b>Role</b>
              <p>{{ project.role }}</p>
            </li>
            <li>
              <b>Date</b>
              <p>{{ project.date }}</p>
            </li>

            <template v-if="project.awards">
              <li>
                <b>Awards</b>
                <p>{{ project.awards }}</p>
              </li>
            </template>
          </ul>
        </aside>

        <ul class="case__content">
          <li
            v-for="(item, i) in content"
            :key="i + item.nodeType"
            :class="{
              case__text: isText(item),
              case__block: isBlock(item),
              'case__box--no-mb':
                isBox(item) && item.data.target.fields.resetBottom
            }"
          >
            <p v-if="isText(item)" v-html="render(item)"></p>

            <BaseImage
              class="case__img"
              draggable="false"
              :img="item.data.target"
              :alt="item.data.target.fields.title"
              @complete="onBaseImageComplete"
              v-if="isImage(item)"
            />

            <video
              class="case__img"
              v-if="isVideo(item)"
              :src="item.data.target.fields.file.url"
              draggable="false"
              autoplay
              playsinline
              loop
              muted
            />

            <CaseBox v-if="isBox(item)" :content="item.data.target.fields" />

            <CaseRow v-if="isRow(item)" :content="item.data.target.fields" />

            <MobileBox
              v-if="isMobileBox(item)"
              :content="item.data.target.fields"
            />

            <WideSlider
              v-if="isWideslider(item)"
              :content="item.data.target.fields"
            />
          </li>
        </ul>
      </section>

      <ul class="case__footer">
        <li
          class="u-flex"
          v-if="project.team && project.team.content.length > 0"
        >
          <div class="case__footer-col">
            <b>Team</b>
          </div>
          <div class="case__footer-col">
            <ul class="case__team">
              <li
                v-for="(item, i) in project.team.content"
                :key="i + item.nodeType"
              >
                <p v-if="isText(item)" v-html="render(item)"></p>
              </li>
            </ul>
          </div>
        </li>

        <li class="u-flex" v-if="project.contentAuthors">
          <div class="case__footer-col">
            <b>Content</b>
          </div>
          <div class="case__footer-col">
            <ul>
              <li
                v-for="(item, i) in project.contentAuthors"
                :key="i + project.slug"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </li>

        <li class="u-flex" v-if="project.etalon">
          <div class="case__footer-col">
            <b>Etalon</b>
          </div>

          <div class="case__footer-col">
            <a :href="project.etalon" target="_blank">
              {{ project.etalon.replace(/(^\w+:|^)\/\//, '') }}
            </a>
          </div>
        </li>
      </ul>
    </article>

    <Next v-if="nextCase" :to="nextCase.to" :isPageDark="false">
      <span slot="title">{{ nextCase.title }}</span>
      <span slot="text">
        {{ nextCase.subtitle }}
      </span>
    </Next>
  </main>
</template>


<script>
import { mapGetters } from 'vuex'

import Next from '~/components/Next'
import ButtonPreview from '~/components/ButtonPreview'
import CaseRow from '~/components/CaseRow'
import CaseBox from '~/components/CaseBox'
import MobileBox from '~/components/MobileBox'
import WideSlider from '~/components/WideSlider'

import page from '~/mixins/page'
import render from '~/mixins/render'
import { getRandomEntries } from '~/assets/scripts/helpers'

export default {
  mixins: [page, render],
  components: {
    ButtonPreview,
    Next,
    CaseRow,
    CaseBox,
    MobileBox,
    WideSlider
  },
  head() {
    const { project } = this
    const { title, subtitle, cover } = project

    return {
      title,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: subtitle
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: cover.fields.file.url
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: subtitle
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: cover.fields.file.url
        },
        {
          hid: 'description',
          name: 'description',
          content: subtitle
        }
      ]
    }
  },
  async asyncData({ store, params, error }) {
    const cases = await store.dispatch('cases/loadCases')

    const slug = params.id
    let project = cases.find(v => v.fields.slug === slug)

    if (!project) {
      try {
        project = await fetchCase(slug)
      } catch (e) {
        error({ statusCode: 404 })
      }
    }

    return { project: project.fields }
  },
  data: () => ({
    asideHeight: 100
  }),
  computed: {
    ...mapGetters({
      cases: 'cases/allCases'
    }),
    content() {
      return this.project ? this.project.content.content : {}
    },
    nextCase() {
      let nextCase = {
        title: 'About',
        subtitle: 'Digital designer & art director from St.Petersburg',
        to: '/about'
      }

      const filteredCases = this.cases.filter(
        v => v.fields.slug !== this.$route.params.id && !v.fields.soon
      )
      const randomCase = getRandomEntries(filteredCases, 1)[0]
      if (randomCase && 'fields' in randomCase) {
        const { title, subtitle, slug } = randomCase.fields

        nextCase = {
          title,
          subtitle,
          to: `/case/${slug}`
        }
      }

      return nextCase
    }
  },
  mounted() {
    this.$store.dispatch('dom/toggleDark', false)
    document.body.classList.add('body-white')
    window.addEventListener('resize', this.setAsideHeight)

    this.observe()
    this.startPreviews()
  },
  beforeDestroy() {
    document.body.classList.remove('body-white')
    window.removeEventListener('resize', this.setAsideHeight)
  },
  methods: {
    showStories() {
      const { stories, title, date, etalon } = this.project

      const payload = {
        title,
        subtitle: date,
        list: stories,
        url: etalon
      }

      this.$store.dispatch('dom/setStoriesPayload', payload)
      this.$store.dispatch('dom/toggleModal', 'stories')
    },
    observe() {
      const elements = this.$el.querySelectorAll(`.case__title,
      .case__title + p,
      .case__cover,
      .case__img,
      .case aside li,
      .case__content > li,
      .case__footer > li`)

      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.dataset.visible = 'true'
        })
      })

      elements.forEach(el => {
        this.observer.observe(el)
      })
    },
    onBaseImageComplete(img) {
      this.observer.observe(img)
    },
    startPreviews() {
      if (this.project.stories && this.project.stories.length > 1)
        this.$nextTick(this.$refs.preview.start)
    },
    setAsideHeight() {
      if (this.$refs.aside) this.asideHeight = this.$refs.aside.offsetHeight
    },
    isBlock: item =>
      item.nodeType === 'embedded-entry-block' &&
      ['row', 'box', 'mobileBox'].includes(
        item.data.target.sys.contentType.sys.id
      ),
    isRow: item =>
      item.nodeType === 'embedded-entry-block' &&
      item.data.target.sys.contentType.sys.id === 'row',
    isBox: item =>
      item.nodeType === 'embedded-entry-block' &&
      item.data.target.sys.contentType.sys.id === 'box',
    isMobileBox: item =>
      item.nodeType === 'embedded-entry-block' &&
      item.data.target.sys.contentType.sys.id === 'mobileBox',
    isWideslider: item =>
      item.nodeType === 'embedded-entry-block' &&
      item.data.target.sys.contentType.sys.id === 'wideslider'
  }
}
</script>

<style lang="sass" scoped>
main
  overflow-x: hidden

// Case
.page:not(.dark) .case
  @media (max-width: 700px)
    background: #fff

.case
  font-size: 18px
  line-height: 1.6

  margin-left: auto
  margin-right: auto
  width: column-spans(8)
  min-height: 100vh
  padding-top: 11.5%
  padding-bottom: 10.5%

  @media (max-width: 900px)
    width: 100%
    padding-left: var(--unit)
    padding-right: var(--unit)

    padding-top: 33%
    padding-bottom: 35.8%

// Title
.case__title
  line-height: 1
  margin-bottom: 0.65em

// Content
.case >
  h1, p
    width: column-spans(4)
    margin-left: column-spans(4)

    @media (max-width: 900px)
      margin-left: 0
      width: 100%

.case__img,
.case__content /deep/ img,
.case__content /deep/ video
  @media (max-width: 500px)
    user-select: none
    pointer-events: none

.case__content > li >
  h2, h3,
  ul, ol,
  a, p
    width: column-spans(4)
    margin-left: column-spans(4)

    @media (max-width: 900px)
      margin-left: 0
      width: 100%

.case__content /deep/ a > b
  position: relative

.case__content /deep/ a > b::before
  content: ''
  position: absolute
  bottom: -4px
  left: 0

  width: 100%
  height: 1px

  background: var(--color-text-lt)
  transform-origin: 100% 50%
  transition: $trs

.case__content /deep/ a:hover > b::before
  transform: scaleX(0)

.case__box--no-mb + li > .case__img
  margin-top: 0

.case__block
  @media (min-width: 901px)
    width: column-spans(10)
    margin-left: calc(-1 * #{mix(1)})

.case__text + li .wideslider,
.case__text + .case__block
  margin-top: 8.3%

  @media (max-width: 700px)
    margin-top: 80px

// Paragraph
.case p
  margin-bottom: 24px

.case__team /deep/ b
  +tt(m)

.case__team li:not(:first-child) /deep/ b
  display: block
  margin-top: 16px

.case__team p
  margin-bottom: 0

// Cover
.case__cover
  position: relative

.case__cover .case__img:not(video)
  @media (max-width: 700px)
    object-fit: cover
    height: 100vh


// Preview
.case__preview
  pointer-events: auto
  position: absolute
  right: calc(-1 * #{mix(2)})
  bottom: 4.5%
  @media (max-width: 900px)
    right: 0

// Images
.case__img
  display: block
  width: 100vw
  height: auto
  margin: 10.4% 0 10.4% calc(-1 * #{mix(2)} - #{var(--unit)})

  @media (max-width: 900px)
    margin: 48px 0 48px calc(-1 * #{var(--unit)})

// Footer
.case__footer
  padding-top: 4%

.case__footer > li
  min-height: 7em
  padding-top: 1.8em
  padding-bottom: 1.4em

  position: relative

.case__footer > li::before
  content: ''
  position: absolute
  bottom: 0
  left: 0

  width: 100%
  height: 1px
  background: var(--color-text-lt)
  opacity: 0.1

.case__footer-col:first-child
  @media (max-width: 700px)
    margin-right: 0
    width: column-spans(3)

.case__footer-col
  width: column-spans(4)

  @media (max-width: 900px)
    width: column-spans(5)

.case__footer-col:last-child
  @media (max-width: 700px)
    padding-left: 56px
    width: column-spans(9)
  @media (max-width: 360px)
    padding-left: 40px

.case__footer-col b
  +tt(m)


// Aside
aside
  max-width: 11em
  float: left

  @media (max-width: 900px)
    margin-bottom: 80px
    max-width: 80%
    float: unset

.case aside b
  +tt(m)

.case aside li
  margin-bottom: 32px

// OBSERVE ANIMATION
.case__title,
.case__title + p,
.case__img,
.case aside li,
.case__content > li,
.case__footer > li
  opacity: 0
  transition: .9s cubic-bezier(.215,.61,.355,1)

  &[data-visible="true"]
    opacity: 1

.case aside li,
.case__footer > li
  transform: translateY(16px)

  &[data-visible="true"]
    transform: translateY(0)

@for $i from 1 through 4
  .case aside li,
  .case__footer > li
    &:nth-child(#{$i})
      transition: 0.4s cubic-bezier(.25,.1,.25,1) (#{$i*0.05s})
</style>
