<template>
  <div
    class="post"
    ref="postWrapper"
  >
    <div v-if="post.images" ref="post-image" class="post-image">
      <SanityImage
        v-for="(image, index) in post.images" :key="index"
        :asset-id="image.assetId"
        auto="format"
      >
        <template #default="{ src }">
          <img
            :alt="post.title"
            :src="src"
          />
        </template>
      </SanityImage>
    </div>

    <div class="post-content">
      <div class="post-content-wrapper">
        <h6 class="post-date">
          {{ date(post.publishedAt) }}
        </h6>
        <h2 class="post-title">
          {{ post.title }}
        </h2>
        <!-- <SanityContent v-if="post.body" :blocks="post.body" class="post-body" /> -->
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    default: () => {}
  }
})

const date = (dateTime) => {
  const date = new Date(dateTime)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day = date.getDate()
  day = day < 10 ? '0' + day : day
  const strDate = year + '-' + month + '-' + day
  return strDate
}

const postWrapper = ref(null)

onMounted(() => {
  
  const callback = (entries, observer) => {
    const entry = entries[0];
    entry.isIntersecting ? document.documentElement.style.backgroundColor = props.post.color.hex : null
  }

  const options = {
    rootMargin: "0px 0px 0px",
    threshold: 0.5
  }

  const intersectionObserver = new IntersectionObserver(callback, options);
  intersectionObserver.observe(postWrapper.value);
})

onUnmounted(() => {
  intersectionObserver.disconnect();
})

// const Flickity =
//   typeof window !== 'undefined'
//     ? require('flickity')
//     : () => null

// Flickity.imagesLoaded =
//   typeof window !== 'undefined'
//     ? require('flickity-imagesloaded')
//     : () => null
    
// Flickity.fade =
//   typeof window !== 'undefined'
//     ? require('flickity-fade')
//     : () => null

// if (!Flickity) {
//   return
// }
// this.$flickity = new Flickity(this.$refs.postImage, {
//   pageDots: false,
//   prevNextButtons: false,
//   // cellAlign: 'left',
//   wrapAround: true,
//   imagesLoaded: true,
//   // on: {
//   //   change: (index) => {
//   //     if (this.hasDragged) {
//   //       this.$store.dispatch('global/galleryIndex', index + 1);
//   //     }
//   //   },
//   //   dragStart: () => {
//   //     this.hasDragged = true
//   //   },
//   // },
// });
</script>

<style lang="postcss" scoped>
.post {
  position: relative;
  overflow: hidden;

  &-image {
    overflow: hidden;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    img {
      margin: 1em;
      max-width: 90%;
      max-height: 80%;

      @media (min-width: 1024px) {
        max-height: 70%;
        max-width: 75%;
      }
    }
  }
  &-video {

    @media (min-width: 1024px) {
      height: 56.3vw;
    }
  }

  &-content {
    position: absolute;
    top: 20%;
    bottom: 20%;
    left: 15%;
    right: 15%;

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


      @media (min-width: 1024px) {
        
        :hover > & {
          opacity: 100%;
          mix-blend-mode: difference;
        }
      }
    }
  }
}

</style>