<template>
  <div class="page">
    <div :class="['posts', {'in-grid': grid}, {'blur': blur}]">
      <Post
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup>
  const grid = useState('grid') 
  const blur = useState('blur') 
  
  import { onMounted } from 'vue'
  import { createClient } from '@sanity/client'
  import { postsQuery, siteQuery } from '~~/data/queries'
  const query = `
    { 
      ${postsQuery},
      ${siteQuery},
    }
  `
  const sanity = createClient({
    projectId: '1ql581l8',
    dataset: 'production',
    apiVersion: '2024-10-01',
    useCdn: true,
    apiHost: 'https://api.sanity.io',
  })

  const { data, error } = await useAsyncData('indexData', async () => {
    try {
      return await sanity.fetch(query)
    } catch (e) {
      console.error('Sanity fetch (index) failed:', e)
      return { posts: [], site: {} }
    }
  }, {
    server: true,
    lazy: false,
  })
  const { posts, site } = data.value || { posts: [], site: {} }

  useHead(() => {
    return {
      title: 'sasha cloo',
      meta: [
        { hid: 'description', name: 'description', content: 'welcome to the world of cloo' },
      ],
      link: {rel: 'icon', type: 'icon/x-icon', href: 'icon.png'}
    }
  })
</script>

<style lang="postcss" scoped>
.page {
  @apply flex flex-col justify-between items-center;
  
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
}
</style>
