<template>
  <div class="page">
    <div :class="['posts', {'in-grid': grid}, {'blur': blur}]">
      <Post v-for="(post, index) in posts" :key="index" :post="post" />
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
    apiVersion: '2025-02-20',
    useCdn: true,
  })
  const { posts, site } = await sanity.fetch(query)



  // const { siteSettings } = siteData?.value

  // const { footer, header, seo } = siteSettings

  // useState('footer', () => footer)
  // useState('header', () => header)

  // useState('color', () => page.color.hex)
  // useState('bgColor', () => page.bgColor.hex)

  onMounted(() => {
    // console.log(posts)
    // console.log('site:', site.title)
    // document.documentElement.style.opacity = 1
    // document.documentElement.style.backgroundColor = page.bgColor.hex
    // document.documentElement.style.color = page.color.hex
  })

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
    @apply pt-[15vw] 1000:pt-[8vw];
    transition: all 0.5s;

    &:not(.in-grid) {
      @apply 1000:pt-0;
    }
    &.in-grid {
      @apply grid grid-cols-4 1000:grid-cols-5;
    }
    &.blur {
      /* filter: blur(20px); */
      transition: none;
    }
  }
}
</style>
