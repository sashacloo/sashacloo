<template>
  <div class="page">
    <h2>
      {{ page.title }}
    </h2>

    <div class="images">
      <SanityImage
        v-for="(image, index) in page.images" :key="index"
        :asset-id="image.assetId"
        auto="format"
      >
        <template #default="{ src }">
          <img
            :alt="image.imageCaption"
            class="image"
            :src="src"
          />
        </template>
      </SanityImage>
    </div>

    <div class="posts">
      <Post v-for="(post, index) in page.posts" :key="index" :post="post" />
    </div>

  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { pageQuery, siteQuery } from '~~/data/queries'
  const query = `
    { 
      ${pageQuery},
      ${siteQuery},
    }
  `
  const route = useRoute()

  const { data } = await useSanityQuery(query, { slug: route.params.slug })

  const { page, site } = data?.value

  // console.log({page})

  useHead(() => {
    return {
      title: `sasha cloo | ${page.title}`,
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

  h2 {
    @apply text-center pt-[5vw] text-darkgrey;
    filter: blur(1.2px);
    font-size: 3.1vw;
    mix-blend-mode: difference;
  }
  .posts {
    @apply -mt-20;
  }
  .images {
    @apply flex flex-col justify-between items-center;
  }
  .image {
    @apply mb-[25vh];
    max-height: 100vh;
  }
}
</style>
