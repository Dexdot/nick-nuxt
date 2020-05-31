<template>
  <main>
    <article class="case">
      <h1 class="case__title t-h1">{{ project.title }}</h1>

      <div class="case__cover">
        <BaseImage
          draggable="false"
          :img="project.cover"
          :alt="project.cover.fields.title"
          @complete="onBaseImageComplete"
        />
      </div>

      <h2 class="case__subtitle t-h2">{{ project.subtitle }}</h2>

      <section class="case__container">
        <div class="case__info-left">
          <p>{{ project.date }}</p>
        </div>

        <div class="case__info-right">
          <p>{{ project.role }}</p>
          <p class="case__info-client">{{ project.client }}</p>
        </div>

        <ul class="case__content">
          <li
            v-for="(item, i) in content"
            :key="i + item.nodeType"
            :class="{
              case__text: isText(item),
              case__block: isNotText(item),
              'case__block--first': item.isFirstBlock
            }"
            :set="(isImgLink = content[i + 1] && isImage(content[i + 1]))"
          >
            <div
              class="case__info-right case__info-right--inner"
              v-if="item.isFirstBlock"
            >
              <p>{{ project.role }}</p>
              <b>{{ project.client }}</b>
            </div>

            <div class="case__img-link" v-if="isImgLink">
              <p v-if="isText(item)" v-html="render(item)"></p>
              <img
                :src="content[i + 1].data.target.fields.file.url"
                :alt="content[i + 1].data.target.fields.title"
              />
            </div>

            <p v-else-if="isText(item)" v-html="render(item)"></p>

            <CaseRow v-if="isRow(item)" :content="item.data.target.fields" />
            <CaseQuote
              v-if="isQuote(item)"
              :content="item.data.target.fields"
            />
            <CaseBlock
              v-if="isBlock(item)"
              :content="item.data.target.fields"
            />
          </li>
        </ul>
      </section>

      <ul class="case__footer">
        <li v-if="project.clientLabel || project.client">
          <b v-if="project.clientLabel">{{ project.clientLabel }}</b>
          <p v-if="project.client">{{ project.client }}</p>
        </li>

        <li v-if="project.team && project.team.content.length > 0">
          <ul class="case__footer-list">
            <li
              v-for="(item, i) in project.team.content"
              :key="i + item.nodeType"
            >
              <p v-if="isText(item)" v-html="render(item)"></p>
            </li>
          </ul>
          <div
            class="case__footer-content case__footer-content--inner"
            v-if="project.contentAuthors"
          >
            <b>Content</b>

            <ul class="case__footer-list">
              <li
                v-for="(item, i) in project.contentAuthors"
                :key="i + project.slug"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </li>

        <li class="case__footer-content" v-if="project.contentAuthors">
          <b>Content</b>

          <ul class="case__footer-list">
            <li
              v-for="(item, i) in project.contentAuthors"
              :key="i + project.slug"
            >
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>

      <div class="case__etalon" v-if="project.etalon">
        <p>Etalon</p>

        <a :href="project.etalon" target="_blank">
          <b>{{ project.etalon.replace(/(^\w+:|^)\/\//, '') }}</b>
        </a>
      </div>
    </article>

    <Next v-if="nextCase" :to="nextCase.to" :isPageDark="false" isCase>
      <span slot="title">{{ nextCase.title }}</span>
      <span slot="text">
        {{ nextCase.subtitle }}
      </span>
      <BaseImage
        slot="image"
        v-if="nextCase.cover"
        :img="nextCase.cover"
        :alt="nextCase.cover.fields.title"
      />
    </Next>
  </main>
</template>


<script>
import { mapGetters } from 'vuex'

import Next from '~/components/Next'
import CaseQuote from '~/components/CaseQuote'
import CaseRow from '~/components/CaseRow'
import CaseBlock from '~/components/CaseBlock'

import page from '~/mixins/page'
import render from '~/mixins/render'
import { getRandomEntries } from '~/assets/scripts/helpers'
import { fetchCase } from '~/api/cases'

export default {
  mixins: [page, render],
  components: {
    CaseQuote,
    CaseRow,
    CaseBlock,
    Next
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
    let project = cases.find(v => v.slug === slug)

    if (!project) {
      try {
        project = await fetchCase(slug)
      } catch (e) {
        error({ statusCode: 404 })
      }
    }

    return { project }
  },
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
        const { title, subtitle, slug, cover } = randomCase.fields

        nextCase = {
          title,
          subtitle,
          cover,
          to: `/case/${slug}`
        }
      }

      return nextCase
    }
  },
  created() {
    const firstBlock = this.project.content.content.find(block => {
      return this.isNotText(block)
    })

    if (firstBlock) firstBlock.isFirstBlock = true
  },
  mounted() {
    this.$store.dispatch('dom/toggleDark', false)
    this.observe()
    window.$c = this.content
  },
  methods: {
    observe() {
      const elements = this.$el.querySelectorAll(`.case__content > li`)

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
    isNotText: function(item) {
      return this.isBlock(item) || this.isRow(item) || this.isQuote(item)
    },
    isBlock: item =>
      item.nodeType === 'embedded-entry-block' &&
      item.data.target.sys.contentType.sys.id === 'caseBlock',
    isRow: item =>
      item.nodeType === 'embedded-entry-block' &&
      item.data.target.sys.contentType.sys.id === 'caseRow',
    isQuote: item =>
      item.nodeType === 'embedded-entry-block' &&
      item.data.target.sys.contentType.sys.id === 'caseQuote'
  }
}
</script>


<style lang="sass" scoped>
.case
  padding: 24vh var(--unit) 0

  @media (max-width: $tab)
    padding: 168px var(--unit) 40px

.case__title
  text-align: right
  margin: 0 0 24px auto

  @media (max-width: $tab)
    margin: 0 0 8px auto

.case__cover
  width: 100vw
  margin-left: minus(var(--unit))
  margin-bottom: 24px

  @media (max-width: $tab)
    margin-bottom: 8px
  
  img
    display: block
    width: 100%
    height: auto

    @media (max-width: $tab)
      height: 100vh
      object-fit: cover

.case__subtitle
  margin-bottom: 80px

  @media (min-width: $tab + 1)
    max-width: mix(4)

  @media (max-width: $tab)
    margin-bottom: 16px

.case__container
  position: relative

.case__info-left
  @media (min-width: $tab + 1)
    float: left

  @media (max-width: $tab)
    margin-bottom: 40px

.case__info-client
  margin-top: 24px
  display: block

.case__info-right
  @media (min-width: $tab + 1)
    width: columns(1)
    float: right

.case__info-right:not(.case__info-right--inner)
  @media (max-width: $tab)
    display: none

.case__info-right--inner
  margin-bottom: 40px

  @media (min-width: $tab + 1)
    display: none

.case__text
  @media (min-width: $tab + 1)
    max-width: column-spans(2)
    margin: 0 0 24px mix(1)

  @media (max-width: $tab)
    margin-bottom: 24px

.case__block:not(:last-child)
  margin-bottom: 24px

  @media (max-width: $tab)
    margin-bottom: 8px

.case__block--first
  margin-top: 22vh

  @media (max-width: $tab)
    margin-top: 40px

.case__content
  margin-bottom: 24px

.case__img-link
  display: flex
  align-items: center

  img
    margin-left: 2px
  
.case__footer
  display: flex
  flex-wrap: wrap
  
  @media (min-width: $tab + 1)
    padding-bottom: 240px
    
  @media (max-width: $tab)
    margin-top: -48px
    margin-left: -12px
    padding-bottom: 48px

.case__footer > li
  @media (max-width: $tab)
    margin-top: 48px
    margin-left: 12px
    width: calc(50% - 12px)

.case__footer-list > li /deep/ b
  display: block

.case__footer-list > li:not(:first-child) /deep/ b
  margin-top: 24px

.case__etalon
  @media (min-width: $tab + 1)
    padding-bottom: 48px
    margin-left: auto
    width: columns(1)

.case__etalon a
  display: block
  margin-top: 2px

.case__footer-content:not(.case__footer-content--inner)
  @media (max-width: $tab)
    display: none

.case__footer-content--inner
  margin-top: 24px
  
  @media (min-width: $tab + 1)
    display: none

.case__footer > li
  @media (min-width: $tab + 1)
    width: mix(1)
</style>
