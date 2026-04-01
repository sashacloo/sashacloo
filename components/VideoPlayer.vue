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
      v-if="soundToggle && showToggle && isInView"
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
const isMuted = ref(props.muted); // State for mute/unmute
const isHoverUnmuted = ref(false);
const isInView = ref(false);

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
    } else {
      video.value.muted = props.muted
      isMuted.value = video.value.muted
    }
  }
)

let intersectionObserver = null

onMounted(() => {
  const el = video.value
  if (!el) return

  if (props.hoverSound) {
    el.muted = true
  } else {
    el.muted = props.muted
  }
  isMuted.value = el.muted

  const callback = (entries) => {
    const entry = entries[0]
    if (!el) return

    if (entry.isIntersecting) {
      isInView.value = true
      if (props.autoplay) {
        el.play().catch(() => {
            el.muted = true
            isMuted.value = true
            el.play().catch(() => {})
          })
      }
    } else {
      isInView.value = false
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.video-player {
  width: 100%;
  height: auto;
  object-fit: contain;
  outline: none;
  /* Fade-in for initial load */
  opacity: 0;
  animation: videoFadeIn 0.6s ease forwards;
}

@media (min-width: 1024px) {
  .video-player {
    width: 78%;
    height: 78%;
  }
}

.video-container.large .video-player {
  width: 100vw;
  height: 100svh;
  object-fit: contain;
}

@media (min-width: 1024px) {
  .video-container.large .video-player {
    object-fit: cover;
  }
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
  /* Mobile: pin to viewport so it stays visible and aligns with footer buttons */
  position: fixed;
  bottom: max(1.2vw, env(safe-area-inset-bottom));
  right: 1vw;
  z-index: 11111;

  @media (min-width: 1024px) {
    /* Desktop: keep anchored to the media area */
    position: absolute;
    bottom: 1.5vw;
    right: 2.5vw;
    z-index: 10;
  }
}

</style>
