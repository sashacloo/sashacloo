<template>
  <div class="page">
    <Logo />

    <div class="content">
      <div v-if="page.images" ref="page-image" class="page-image">
        <img v-for="(image, index) in page.images" :key="index" :src="urlFor(image) + '?w=1600'" class="cover" :alt="page.title" />
      </div>
      <div class="page-content">
        <div class="page-content-wrapper">
          <!-- <h2 class="page-title">
            {{ page.title }}
          </h2> -->
          <SanityContent v-if="page.body" :blocks="page.body" class="page-body" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
import imageUrlBuilder from '@sanity/image-url';

const query = groq`
  {
    'page': *[_type == 'page'][0],
    'site': *[_type == 'site'][0]
  }
`
export default {
  name: 'DefaultPage',

  async asyncData({ $sanity, store }) {
    const data = await $sanity.fetch(query);
    const { page, site } = data;

    // store.dispatch('global/footerContent', footerContent)
    // store.dispatch('global/mainMenu', mainMenu)

    return { $sanity, page, site }
  },
  head() {
    return {
      title: this.site.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.site.description,
        },
        ...this.facebookOGTags,
      ]
    }
  },
  computed: {
    facebookOGTags() {
      const { description, image, title, url, appID } = this.site;

      return [
        { property: 'fb:app_id', content: appID},
        { property: 'og:description', content: description },
        { property: 'og:image', content: image ? this.urlFor(image).size(1080).url() : '' },
        { property: 'og:image:width', content: '1080px' },
        { property: 'og:title', content: title },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url },
      ]
    }
  },
  mounted(){
    document.documentElement.style.backgroundColor = this.page.color
  },
  methods: {
    urlFor(source) {
      const builder = imageUrlBuilder(this.$sanity.config)
      return builder.image(source);
    },
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
}

.content {
  text-align: center;
  padding-top: 9vw;
  color: #8f91c0;
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap;
}

.page-image {
  margin: 0 auto;
}
</style>
