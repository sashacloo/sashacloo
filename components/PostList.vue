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
    /* 50px below the header row, not 50px down the page — the header is fixed
       and ends at its own top offset plus the 28.5px button height */
    @apply pt-[calc(1.5vw_+_78.5px)] 1000:pt-[calc(2vw_+_78.5px)];
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
