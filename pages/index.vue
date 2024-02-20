<template>
  <div class="page">

    <div class="posts">
      <Post v-for="(post, index) in posts" :key="index" :post="post" />
      <!-- <div v-for="(post, index) in posts" :key="index" :post="post" >
        Post: {{ index }} - {{ post.title }} .
      </div> -->
    </div>

  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { postsQuery, siteQuery } from '~~/data/queries'
  const query = `
    { 
      ${postsQuery},
      ${siteQuery},
    }
  `
  const { data } = await useSanityQuery(query)

  const { posts, site } = data?.value


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

<style scoped>
.page {
  @apply flex flex-col justify-between items-center;
}
</style>
