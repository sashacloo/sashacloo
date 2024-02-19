<template>
  <div class="page">


  </div>
</template>

<script setup>
  // import { onMounted } from 'vue'
  // import { pageQuery, siteSettingsQuery } from '~~/data/queries'

  // const { data } = await useSanityQuery(groq`{${pageQuery}}`, { slug: 'homepage' })
  // const { data: siteData } = await useSanityQuery(groq`{${siteSettingsQuery}}`)

  // const { page } = data?._rawValue

  // const { siteSettings } = siteData?.value

  // const { footer, header, seo } = siteSettings

  // useState('footer', () => footer)
  // useState('header', () => header)

  // useState('color', () => page.color.hex)
  // useState('bgColor', () => page.bgColor.hex)

  // onMounted(() => {
  //   document.documentElement.style.backgroundColor = page.bgColor.hex
  //   document.documentElement.style.color = page.color.hex
  // })

  useHead(() => {
    return {
      title: 'sasha cloo',
      meta: [
        { hid: 'description', name: 'description', content: 'welcome to the world of cloo' },
      ],
      // link: {rel: 'icon', type: 'icon/x-icon', href: 'icon.png'}
    }
  })
</script>

<style scoped>
.page {
  /* @apply bg-[#00ff00] flex flex-col justify-between items-center text-center min-h-[calc(90vh_-_60px)] 1000:min-h-[calc(100vh_-_60px)]; */
}
</style>
