<template>
  <transition name="menu">
    <section class="menu" v-show="active">
      <div class="menu__overlay"></div>

      <nav class="menu__nav">
        <ul>
          <li><MenuLink class="no-theme" to="/">Index</MenuLink></li>
          <li><MenuLink class="no-theme" to="/about">About</MenuLink></li>
          <li><MenuLink class="no-theme" to="/vision">Vision</MenuLink></li>
          <li><MenuLink class="no-theme" to="/black">Black</MenuLink></li>
        </ul>
      </nav>

      <nav class="menu__social">
        <ul class="u-flex u-aic">
          <li>
            <a
              class="no-theme"
              href="https://behance.net/stereocage"
              target="_blank"
              >Behance</a
            >
          </li>
          <li>
            <a
              class="no-theme"
              href="https://dribbble.com/stereocage"
              target="_blank"
              >Dribbble</a
            >
          </li>
          <li>
            <a
              class="no-theme"
              href="https://facebook.com/stereocage"
              target="_blank"
              >Facebook</a
            >
          </li>
          <li>
            <a
              class="no-theme"
              href="https://instagram.com/stereocage"
              target="_blank"
              >Instagram</a
            >
          </li>
        </ul>
      </nav>
    </section>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuLink from '~/components/MenuLink'

export default {
  components: {
    MenuLink
  },
  computed: {
    ...mapGetters({
      modalName: 'dom/modalName',
      isModalActive: 'dom/isModalActive'
    }),
    active() {
      return this.isModalActive && this.modalName === 'menu'
    }
  }
}
</script>

<style lang="sass" scoped>
/* ENTER */
.menu-enter
  pointer-events: none

  nav li
    opacity: 0
    transform: translateY(16px)

  .menu__overlay
    transform: translateY(101%)


.menu-enter-to
  pointer-events: auto

  .menu__overlay,
  nav li
    opacity: 1
    transform: translateY(0%)


.menu-enter-active
  transition: 1s ease-in-out

  .menu__overlay
    transition: 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)

@for $i from 1 through 4
  .menu-enter-active .menu__nav li:nth-child(#{$i})
    transition: 0.4s ease (#{$i*0.05s + 0.4s})

.menu-enter-active .menu__social li
  &:nth-child(1)
    transition: 0.4s ease 0.6s
  &:nth-child(2)
    transition: 0.4s ease 0.55s
  &:nth-child(3)
    transition: 0.4s ease 0.5s
  &:nth-child(4)
    transition: 0.4s ease 0.45s


/* LEAVE */
.menu-leave
  pointer-events: auto

  nav li
    opacity: 1

  .menu__overlay,
  nav li
    transform: translateY(0%)

.menu-leave-to
  pointer-events: none

  nav li
    opacity: 0

  .menu__overlay
    transform: translateY(101%)

.menu-leave-active
  transition: 1s ease-in-out

  .menu__overlay
    transition: 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)

@for $i from 1 through 4
  .menu-leave-active .menu__nav li:nth-child(#{$i})
    transition: 0.4s ease (#{$i*0.05s})

.menu-leave-active .menu__social li
  &:nth-child(1)
    transition: 0.4s ease 0.25s
  &:nth-child(2)
    transition: 0.4s ease 0.2s
  &:nth-child(3)
    transition: 0.4s ease 0.15s
  &:nth-child(4)
    transition: 0.4s ease 0.1s


// Menu styles
.menu
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
.menu__overlay
  background: #000
  position: absolute
  top: 0
  left: 0

  width: 100vw
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)

.menu__nav
  z-index: 1
  position: absolute
  top: 50%
  right: calc(#{var(--unit)} + #{mix(1)})
  transform: translateY(-50%)

  text-align: right

  @media (max-width: $mob)
    right: var(--unit)

nav /deep/ a
  +link(#fff)

.menu__social
  position: absolute
  bottom: 6%
  right: calc(#{var(--unit)} + #{mix(1)})

  @media (max-width: $mob)
    right: var(--unit)

  li
    margin-left: 16px
    @media (max-width: 360px)
      margin-left: 8px

  a
    +hoves(r)
    font-size: 16px
    opacity: 0.3

    @media (min-width: 2200px)
      font-size: 18px

    @media (max-width: $mob)
      font-size: 14px


// Link hover
.menu__nav .menu__link,
.menu__social a
  transition: 0.25s ease

.menu__nav .menu__link:not(.nuxt-link-exact-active)
  opacity: 0.3

.menu__nav .menu__link.nuxt-link-exact-active
  opacity: 1

.menu__nav:hover
  .menu__link:not(.nuxt-link-exact-active),
  .menu__link.nuxt-link-exact-active
    opacity: 1

.menu__nav
  .menu__link:not(.nuxt-link-exact-active):hover,
  .menu__link.nuxt-link-exact-active:hover
    opacity: 0.3

.menu__social a:hover
  opacity: 1
</style>
