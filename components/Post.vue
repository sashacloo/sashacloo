<template>
  <div
    class="post flex items-center justify-center"
    :class="[{ large: post.large }, {'in-grid': grid}]"
    ref="postWrapper"
    v-bind="filteredAttrs"
  >
    <!-- <div :class="['mediaItem', 'flex', 'items-center', 'justify-center', mediaItem._type]"> -->
    <div
      v-for="(mediaItem, index) in post.mediaItems" :key="index"
      :class="['mediaItem', mediaItem._type]"
    >

      <SanityImage
        v-if="mediaItem._type == 'imageObject'"
        :asset-id="mediaItem.assetId"
        auto="format"
      >
        <template #default="{ src }">
          <img
            :alt="mediaItem.caption"
            :src="src"
          />
        </template>
      </SanityImage>

      <VideoPlayer
        v-else-if="mediaItem._type == 'videoObject'"
        :src="mediaItem.video.asset.url"
        :soundToggle="mediaItem.soundToggle"
        :poster="mediaItem.image"
        :autoplay="true"
        :loop="true"
        :muted="true"
      />

      <div v-if="mediaItem.body">
        <SanityContent :blocks="mediaItem.body" />
      </div>

    </div>
    
    <div class="post-content">
        <h6 class="post-date">
          {{ date(post.publishedAt) }}
        </h6>
        <h2 class="post-title">
          {{ post.title }}
        </h2>
        <!-- <SanityContent v-if="post.body" :blocks="post.body" class="post-body" /> -->
    </div>
    
  </div>
</template>

<script setup>
  const grid = useState('grid') 

  import { useAttrs, computed } from 'vue';

  const props = defineProps({
    post: Object
  });

  const attrs = useAttrs();

  const filteredAttrs = computed(() => {
    const { "data-v-inspector": _, ...rest } = attrs;
    return rest;
  });
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

  
  @media (min-width: 1024px) {
    width: 50vw;
    min-height: 50vh;
    transition: all 0.5s;
    margin: auto; 

    .mediaItem {
      position: relative;
      margin: 20vh 0;
      
      img, video {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }

    &.large:not(.in-grid) {
      width: 100vw;
      height: auto;
      /* max-height: none; */
      
      .mediaItem {
        margin: 0;
      }
    }

    &.in-grid {
      @apply w-[20vw] h-[20vw] overflow-hidden;
      min-height: none;

      .mediaItem {
        margin: 0;
        padding: 2vw;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }


  }




/* 
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
  */

  &-content {
    /* filter: blur(0.5px); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    /* border-radius: 0 1em; */
    bottom: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    padding: 0.5em 1em;
    pointer-events: none;
    position: fixed;
    text-align: left;
    font-size: 13px;
    font-family: Helvetica, Arial, sans-serif;
    color: grey;
    transition: opacity .2s;
    opacity: 0;
    z-index: 50;


    @media (min-width: 1024px) {
      
      :hover > & {
        opacity: 100%;
        mix-blend-mode: difference;
      }
    }
  }
}
</style>
