<template>
  <div class="page">
    <PostList :posts="posts" />
  </div>
</template>

<script setup>
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
}
</style>
