<template>
  <div :class="['posts', {'in-grid': grid}, {'blur': blur}]">
    <Post
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
      :index="index"
    />
  </div>
</template>

<script setup>
  const grid = useState('grid')
  const blur = useState('blur')

  defineProps({
    posts: {
      type: Array,
      default: () => [],
    },
  })
</script>

<style lang="postcss" scoped>
.posts {
  transition: all 0.5s;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  max-height: 100vh;
  overflow-y: auto;

  &:not(.in-grid) {
    @apply 1000:pt-0;
  }
  &.in-grid {
    @apply grid grid-cols-4 1000:grid-cols-5;
    scroll-snap-type: none;
    max-height: none;
    overflow-y: visible;
  }
  &.blur {
    filter: blur(20px);
    transition: none;
  }
}
</style>
