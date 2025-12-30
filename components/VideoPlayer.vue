<template>
  <div
    :class="['video-container', { large: isLarge }]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <video 
      playsinline
      ref="video"
      :src="src"
      :poster="poster"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      class="video-player"
    ></video>
    <Button
      v-if="soundToggle && showToggle"
      class="sound-toggle"
      @click="toggleMute"
    >
      {{ isMuted ? "sound off" : "sound on" }}
    </Button>
  </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted, watch } from 'vue'
import Button from '~/components/Button.vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  poster: {
    type: Object,
    default: () => {}
  },
  controls: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
  soundToggle: {
    type: Boolean,
    default: false,
  },
  isLarge: {
    type: Boolean,
    default: false,
  },
  showToggle: {
    type: Boolean,
    default: true,
  },
  hoverSound: {
    type: Boolean,
    default: false,
  },
});

const video = ref(null); // Reference to the video element
const isMuted = ref(true); // State for mute/unmute
const isHoverUnmuted = ref(false);

// Toggle mute/unmute
const toggleMute = () => {
  if (video.value) {
    video.value.muted = !video.value.muted; // Change the muted property
    isMuted.value = video.value.muted; // Update the state
  }
}

const handleMouseEnter = () => {
  if (!props.hoverSound || !video.value) return
  video.value.muted = false
  isMuted.value = video.value.muted
  isHoverUnmuted.value = true
}

const handleMouseLeave = () => {
  if (!props.hoverSound || !video.value) return
  video.value.muted = true
  isMuted.value = video.value.muted
  isHoverUnmuted.value = false
}

// When hoverSound becomes true (grid view), ensure video is muted so
// switching to grid always silences any playing audio.
watch(
  () => props.hoverSound,
  (newVal) => {
    if (!video.value) return
    if (newVal) {
      video.value.muted = true
      isMuted.value = true
      isHoverUnmuted.value = false
    }
  }
)

let intersectionObserver = null

onMounted(() => {
  const el = video.value
  if (!el) return

  const callback = (entries) => {
    const entry = entries[0]
    if (!el) return

    if (entry.isIntersecting) {
      if (props.autoplay) {
        el.play().catch(() => {})
      }
    } else {
      el.pause()
    }
  }

  intersectionObserver = new IntersectionObserver(callback, {
    threshold: 0.5,
  })

  intersectionObserver.observe(el)
})

onUnmounted(() => {
  if (intersectionObserver && video.value) {
    intersectionObserver.unobserve(video.value)
  }
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
})

</script>

<style scoped>
.video-container {
  /* Let the parent media item be the positioning context for overlays */
  position: static;
  width: 100%;
  height: auto;
}
.video-player {
  width: 100%;
  height: auto;
  outline: none;
  /* Fade-in for initial load */
  opacity: 0;
  animation: videoFadeIn 0.6s ease forwards;
}

@keyframes videoFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.sound-toggle {
  position: absolute;
  bottom: 1.5vw;
  right: 2vw;
  z-index: 10;

  @media (min-width: 1024px) {
    right: 2.5vw;
  }
}

.video-container.large {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.video-container.large .video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
