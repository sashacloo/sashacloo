<template>
  <div class="page">
    <PostList :posts="posts" />
  </div>
</template>

<script setup>
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
}
</style>
