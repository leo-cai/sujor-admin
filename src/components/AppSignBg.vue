<template>
  <div class="sign-wrapper">
    <ul>
      <li v-for="i in 10" :key="i"></li>
    </ul>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../static/css/config.styl'

.sign-wrapper
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background linear-gradient(to bottom right, theme-green, theme-blue)
  ul
    li
      position absolute
      bottom 40px
      width 40px
      height 40px
      border-radius 50%
      background-color rgba(255, 255, 255, 0.1)
      list-style none
      animation square 15s infinite
      transition-timing-function linear
      &:nth-child(1)
        left 10%
      &:nth-child(2)
        left 20%
        width 90px
        height 90px
        animation-delay 2s
        animation-duration 7s
      &:nth-child(3)
        left 25%
        animation-delay 4s
      &:nth-child(4)
        left 40%
        width 60px
        height 60px
        animation-duration 8s
        background-color rgba(255, 255, 255, 0.25)
      &:nth-child(5)
        right 30%
      &:nth-child(6)
        right 10%
        width 120px
        height 120px
        animation-delay 3s
        background-color rgba(255, 255, 255, 0.2)
      &:nth-child(7)
        left 38%
        width 160px
        height 160px
        animation-delay 2s
      &:nth-child(8)
        right 45%
        width 40px
        height 40px
        animation-delay 4s
        animation-duration 15s
      &:nth-child(9)
        left 30%
        width 20px
        height 20px
        animation-delay 2s
        animation-duration 12s
        background-color rgba(255, 255, 255, 0.25)
      &:nth-child(10)
        right 20%
        width 160px
        height 160px
        animation-delay 5s
      @keyframes square
        0%
          opacity 0.5
          transform translateY(0px) rotate(45deg)
          border-radius 20%
        25%
          opacity 0.75
          transform translateY(-400px) rotate(90deg)
          border-radius 50%
        50%
          opacity 1
          transform translateY(-600px) rotate(135deg)
          border-radius 20%
        100%
          opacity 0
          transform translateY(-1000px) rotate(180deg)
          border-radius 50%
</style>
