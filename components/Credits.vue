<template>
  <transition name="credits">
    <section class="credits" v-show="active">
      <div class="credits__overlay"></div>

      <nav class="credits__nav">
        <ul>
          <li>
            <button @click="$store.dispatch('dom/toggleModal', '')">
              <span>Design</span>
              <p>Nick Adams</p>
            </button>
          </li>
          <li>
            <a href="http://hvxzcb.com" target="_blank">
              <span>Development</span>
              <p>Kamil Sometimes</p>
            </a>
          </li>
          <li>
            <a href="https://darina.now.sh" target="_blank">
              <span>Management</span>
              <p>Darina Yurina</p>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      modalName: 'dom/modalName',
      isModalActive: 'dom/isModalActive'
    }),
    active() {
      return this.isModalActive && this.modalName === 'credits'
    }
  }
}
</script>

<style lang="sass" scoped>
/* ENTER */
.credits-enter
  pointer-events: none

  nav li
    opacity: 0
    transform: translateY(16px)

  .credits__overlay
    transform: translateY(101%)


.credits-enter-to
  pointer-events: auto

  .credits__overlay,
  nav li
    opacity: 1
    transform: translateY(0%)


.credits-enter-active
  transition: 1s ease-in-out

  .credits__overlay
    transition: 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)

@for $i from 1 through 3
  .credits-enter-active .credits__nav li:nth-child(#{$i})
    transition: 0.4s ease (#{$i*0.05s + 0.4s})


/* LEAVE */
.credits-leave
  pointer-events: auto

  nav li
    opacity: 1

  .credits__overlay,
  nav li
    transform: translateY(0%)

.credits-leave-to
  pointer-events: none

  nav li
    opacity: 0

  .credits__overlay
    transform: translateY(101%)

.credits-leave-active
  transition: 1s ease-in-out

  .credits__overlay
    transition: 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)

@for $i from 1 through 3
  .credits-leave-active .credits__nav li:nth-child(#{$i})
    transition: 0.4s ease (#{$i*0.05s})

.credits
  z-index: 2
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0

  width: 100vw
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)


// Overlay
.credits__overlay
  background: #000
  position: absolute
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)

.credits__nav
  z-index: 1
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  text-align: center

  width: 100%

.credits__nav span
  display: block
  opacity: 0.3
  margin-bottom: 4px

.credits__nav li:not(:last-child)
  display: block
  margin-bottom: 24px

nav /deep/ a
  +link(#fff)

// HOVER
.credits__nav
  display: flex
  flex-direction: column
  align-items: center

.credits__nav li
  transition: 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)

.credits__nav ul:hover li
  opacity: 0.3
  
.credits__nav ul li:hover
  opacity: 1
</style>
