<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      intersection: { threshold: 0.5 }
    }"
    class="post hero"
  >
    <video
      v-if="video"
      autoplay
      defer
      loop
      muted
      playsinline
      class="post-video"
    >
      <source :src="video.url" :type="video.mimeType">
    </video>

    <!-- <picture v-else-if="post.images" class="post-image">
      <source media="(max-width: 1439px)" :srcset="urlFor(post.images[0]).size(1600).url()">
      <source media="(min-width: 1440px)" :srcset="urlFor(post.images[0]).size(2400).url()">
      <img class="cover" :alt="post.title">
    </picture> -->

    <div v-else-if="post.images" ref="post-image" class="post-image">
      <img v-for="(image, index) in post.images" :key="index" :src="urlFor(image) + '?w=1600'" class="cover" :alt="post.title" />
    </div>

    <div class="post-content">
      <div class="post-content-wrapper">
        <h6 class="post-date">
          {{ date(post.publishedAt) }}
        </h6>
        <h2 class="post-title">
          {{ post.title }}
        </h2>
        <SanityContent v-if="post.body" :blocks="post.body" class="post-body" />
      </div>
    </div>
  </div>
</template>

<script>
import imageUrlBuilder from '@sanity/image-url'

export default {
  name: 'HeroSection',
  props: {
    post: {
      type: Object,
      default: ()=>{}
    }
  },
  computed: {
    video(){
      if (!this.post.video) return
      
      const { _type, asset } = this.post.video;
      const { extension, mimeType, url } = asset;

      return {
        _type,
        extension,
        mimeType,
        url,
      }
    },
  },
  methods: {
    visibilityChanged (isVisible, entry) {
      this.isVisible = isVisible
      if (isVisible && this.post.color) {
        document.documentElement.style.backgroundColor = this.post.color
      }
    },
    urlFor(source) {
      const builder = imageUrlBuilder(this.$sanity.config)
      return builder.image(source);
    },
    date(dateTime) {
      const date = new Date(dateTime)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = date.getDate()
      day = day < 10 ? '0' + day : day
      const strDate = year + '-' + month + '-' + day
      return strDate
    },
  },
}
</script>

<style lang="scss" scoped>
.post {
  position: relative;
  overflow: hidden;

  &-image,
  &-video {
    display: block;
    overflow: hidden;
  }

  &-image {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2vh;
    
    img {
      margin: 1em;
      max-width: 90%;
      max-height: 90%;

      @media (min-width: 1024px) {
        max-height: 70%;
        max-width: 80%;
      }
    }
  }
  &-video {

    @media (min-width: 1024px) {
      height: 56.3vw;
    }
  }
&-content {
    // background: #03a9f45c;
    position: absolute;
    top: 20%;
    bottom: 20%;
    left: 15%;
    right: 15%;
    overflow: hidden;

    &-wrapper {
      filter: blur(0.5px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      border-radius: 0 1em;
      bottom: 0;
      right: 0;
      width: 100%;
      overflow: hidden;
      padding: 0.5em 1em;
      pointer-events: none;
      position: fixed;
      text-align: left;
      font-size: 13px;
      color: grey;
      transition: opacity .2s;
      opacity: 0;
      mix-blend-mode: difference;

      @media (min-width: 1024px) {
        
        :hover > & {
          opacity: 100%;
          mix-blend-mode: difference;
        }
      }
    }
  }

  &-title {
    max-width: 760px;
  }

  p {
    margin: 0;
  }
}
</style>
