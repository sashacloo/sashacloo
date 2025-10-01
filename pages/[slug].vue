<template>
  <div class="page">
    <NuxtLink to="/" class="page-title button">
      <h2>
        {{ page.title }}
      </h2>
    </NuxtLink>

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
  import { createClient } from '@sanity/client'
  import { pageQuery, siteQuery } from '~~/data/queries'
  const query = `
    { 
      ${pageQuery},
      ${siteQuery},
    }
  `
  const route = useRoute()

  const sanity = createClient({
    projectId: '1ql581l8',
    dataset: 'production',
    apiVersion: '2025-02-20',
    useCdn: true,
  })
  const { page, site } = await sanity.fetch(query, { slug: route.params.slug })

  // Set and expose the default page background color for Post components to revert to
  const pageBgColor = useState('pageBgColor', () => page?.color?.hex || '')
  // Keep a global stack of active post colors; reset it on page mount/navigation
  const activePostColors = useState('activePostColors', () => [])

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

  onMounted(() => {
    // Reset any active post colors when arriving on this page
    activePostColors.value = []
    // Initialize the document background to the page color if present
    if (pageBgColor.value) {
      document.documentElement.style.backgroundColor = pageBgColor.value
    }
  })
</script>

<style lang="postcss" scoped>
.page {
  @apply flex flex-col justify-between items-center;

  a.page-title {
    color: inherit;
    text-decoration: none;
    position: fixed;
    display: flex;
    top: 9vw;

    @media (min-width: 1000px) {
      top: 6.5vw;
    }
    &.button {
      filter: blur(0.5px);
      font-size: 11px;
      font-family: Arial, Helvetica, sans-serif;
      background-color: #c8c8c888;
      color: rgb(73, 73, 73);
      padding: 0 1.3rem;
      border-radius: 2rem;
      cursor: pointer;
      z-index: 11111;
      transition: all 0.5s;
      /* transform: translateX(-50%); */

      &:hover {
        background-color: #51ff0088;
        filter: blur(0);
      } 
    }
    &::after {
      content: ' x';
      position: absolute;
      right: 0.8em;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }
    &:hover::after {
      opacity: 1;
    }
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

    &:first-child {
      width: 100vw;
      object-fit: cover;
    }
  }
}
</style>
