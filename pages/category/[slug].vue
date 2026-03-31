<template>
  <div class="page">
    <div :class="['posts', { 'in-grid': grid }, { 'blur': blur }]">
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

import { createClient } from '@sanity/client'
import { postsByCategoryQuery, categoryBySlugQuery, siteQuery } from '~~/data/queries'

const route = useRoute()
const categorySlug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug

const query = `
  {
    ${postsByCategoryQuery},
    ${categoryBySlugQuery},
    ${siteQuery}
  }
`

const sanity = createClient({
  projectId: '1ql581l8',
  dataset: 'production',
  apiVersion: '2024-10-01',
  useCdn: true,
  apiHost: 'https://api.sanity.io',
})

const { data } = await useAsyncData(
  () => `categoryData:${categorySlug}`,
  async () => {
    try {
      return await sanity.fetch(query, { category: categorySlug })
    } catch (e) {
      console.error('Sanity fetch (category) failed:', e)
      return { posts: [], category: null, site: {} }
    }
  },
  {
    server: true,
    lazy: false,
  }
)

const { posts = [], category = null, site = {} } = data.value || {}

if (!category) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' })
}

useHead(() => {
  return {
    title: `sasha cloo | ${category?.title || categorySlug}`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: category?.description || 'category posts',
      },
    ],
    link: { rel: 'icon', type: 'icon/x-icon', href: 'icon.png' },
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
