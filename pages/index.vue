<template>
  <div>
    <Logo />
    <!-- <Events :events="eventsAll.future" :events-past="eventsAll.past" /> -->
    <!-- <Links /> -->

    <Hero :post="featPost" />

    <div class="posts">
      <Post v-for="(post, index) in posts" :key="index" :post="post" />
    </div>

    <Footer />
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity"
import imageUrlBuilder from '@sanity/image-url'

const query = groq`
  {
    'posts': *[_type == 'post'] | order(publishedAt desc),
    'site': *[_type == 'site'][0],
    "events": *[_type == "event" && dateTime(coalesce(dateTime, '')) >= dateTime(now()) ]{
      "id": _id,
      "dateTime": dateTime,
      "mainImage": mainImage.asset->url,
      "title": title,
      "body": body,
      "linkURL": link.URL,
    } | order(dateTime asc),
    "eventsPast": *[_type == "event" && dateTime(coalesce(dateTime, '')) < dateTime(now()) ]{
      "id": _id,
      "dateTime": dateTime,
      "mainImage": mainImage.asset->url,
      "title": title,
      "body": body,
      "linkURL": link.URL,
    } | order(dateTime desc),
  }
`
export default {
  name: 'IndexPage',

  async asyncData({ $sanity, store }) {
    const data = await $sanity.fetch(query);
    const { posts, site, events, eventsPast } = data;
    const featPost = posts[0]

    const eventsAll = {
      'future': events,
      'past': eventsPast
    } 
    // store.dispatch('events', eventsAll)

    // store.dispatch('global/footerContent', footerContent)
    // store.dispatch('global/mainMenu', mainMenu)

    return { $sanity, eventsAll, posts: posts.slice(1), featPost, site }
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
  methods: {
    urlFor(source) {
      const builder = imageUrlBuilder(this.$sanity.config)
      return builder.image(source);
    },
  }
}
</script>

<style scoped>
.posts {
  text-align: center;
}
</style>
