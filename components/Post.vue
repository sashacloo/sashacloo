<template>
  <div
    class="post flex items-center justify-center"
    :class="[{ large: post.large }, {'in-grid': grid}]"
    ref="postWrapper"
    v-bind="filteredAttrs"
    @click="handlePostClick"
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
        :isLarge="post.large && !grid"
        :showToggle="!grid"
        :hoverSound="grid"
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

  import { useAttrs, computed, nextTick } from 'vue';

  const props = defineProps({
    post: Object,
    index: {
      type: Number,
      default: 0,
    },
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
  // Read the default page background color stored by the page component
  const pageBgColor = useState('pageBgColor')
  // Global ordered list of active post IDs and a map of ID->color
  const activePostOrder = useState('activePostOrder', () => [])
  const activePostColorsMap = useState('activePostColorsMap', () => ({}))

  // Keep a reference to the observer so we can properly disconnect on unmount
  let intersectionObserver = null

  const scrollIntoView = () => {
    if (!postWrapper.value) return
    // Try to scroll the posts container by a deterministic amount based on index
    const postsContainer = postWrapper.value.closest('.posts')

    if (!postsContainer) {
      // Fallback if no container; let browser handle it
      postWrapper.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    const viewport = postsContainer.clientHeight || window.innerHeight || 0
    if (!viewport) {
      postWrapper.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    const target = props.index * viewport
    postsContainer.scrollTo({ top: target, behavior: 'smooth' })
  }

  const handlePostClick = () => {
    if (!grid?.value) return
    grid.value = false
    nextTick(() => {
      // Give the layout a moment to settle after switching out of grid
      setTimeout(() => {
        scrollIntoView()
      }, 50)
    })
  }

  onMounted(() => {

    const callback = (entries) => {
      const entry = entries[0]
      const colorHex = props.post?.color?.hex
      const postId = props.post?._id
      if (entry.isIntersecting) {
        // Add to active order and map, then set background to this post's color if it exists
        if (postId && colorHex) {
          if (!activePostOrder.value.includes(postId)) {
            activePostOrder.value.push(postId)
          }
          activePostColorsMap.value[postId] = colorHex
          document.documentElement.style.backgroundColor = colorHex
        }
        return
      }
      // Leaving viewport: remove this post id and color
      if (!entry.isIntersecting && postId) {
        const idx = activePostOrder.value.indexOf(postId)
        if (idx !== -1) activePostOrder.value.splice(idx, 1)
        if (activePostColorsMap.value[postId]) {
          delete activePostColorsMap.value[postId]
        }
      }
      // Set to the most recent active post color in order, or fallback to page color
      for (let i = activePostOrder.value.length - 1; i >= 0; i--) {
        const id = activePostOrder.value[i]
        const c = activePostColorsMap.value[id]
        if (c) {
          document.documentElement.style.backgroundColor = c
          return
        }
      }
      if (pageBgColor?.value) {
        document.documentElement.style.backgroundColor = pageBgColor.value
      }
    }

    const options = {
      rootMargin: "0px 0px 0px",
      threshold: 0.5
    }

    intersectionObserver = new IntersectionObserver(callback, options)
    if (postWrapper.value) intersectionObserver.observe(postWrapper.value)
  })

  onUnmounted(() => {
    if (intersectionObserver) {
      intersectionObserver.disconnect()
      intersectionObserver = null
    }
  })

</script>

<style lang="postcss" scoped>
.post {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: auto; 
  overflow: hidden;
  transition: all 0.5s;
  scroll-snap-align: start;

  .mediaItem {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img, video {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;

      @media (min-width: 1024px) {
        max-width: 80%;
        max-height: 80%;
      }
    }
  }
    
  &.large:not(.in-grid) {
    .mediaItem {
      img, video {
        @media (min-width: 1024px) {
          max-width: 100%;
          max-height: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }

  &.in-grid {
    @apply w-[25vw] 1000:w-[20vw] h-[25vw] 1000:h-[20vw] overflow-hidden;
    min-height: auto;
    scroll-snap-align: none;

    .mediaItem {
      margin: 0;
      padding: 2vw;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }

  &-content {
    @apply left-[2.5vw] bottom-[1.2vw];
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    padding: 3px 17px 6px 17px;
    pointer-events: none;
    position: fixed;
    text-align: left;
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
