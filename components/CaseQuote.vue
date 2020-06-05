<template>
  <div class="case-quote">
    <blockquote v-if="content.text" class="case-quote__text t-h2">
      {{ content.text }}
    </blockquote>
    <div class="case-quote__info">
      <p v-if="content.author">{{ content.author }}</p>
      <p v-if="content.description">{{ content.description }}</p>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    content: Object
  }
}
</script>

<style lang="sass" scoped>
.case-quote
  padding: 24px 0 24px mix(1)
  
  @media (max-width: $tab)
    padding: 8px 0 32px

.case-quote__text
  margin-bottom: 56px

  @media (max-width: $tab)
    margin-bottom: 16px

.case-quote__info
  @media (min-width: $tab + 1)
    margin-left: auto
    width: column-spans(1)

  @media (max-width: $tab)
    padding-left: 72px
</style>

