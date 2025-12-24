<template>
  <div :class="['video-container', { large: isLarge }]">
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
    <button v-if="soundToggle" @click="toggleMute">
      {{ isMuted ? "sound off" : "sound on" }}
    </button>
  </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue'

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
});

const video = ref(null); // Reference to the video element
const isMuted = ref(true); // State for mute/unmute

// Toggle mute/unmute
const toggleMute = () => {
  if (video.value) {
    video.value.muted = !video.value.muted; // Change the muted property
    isMuted.value = video.value.muted; // Update the state
  }
}

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
  position: relative;
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
button {
  filter: blur(0.3px);
  font-size: 11px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #888888;
  color: rgb(0, 0, 0);
  padding: 0 1rem;
  border-radius: 2rem;
  cursor: pointer;
  position: absolute;
  bottom: 1.5vw;
  right: 2vw;
  z-index: 10;
  user-select: none;
  transition: all 0.5s;

  @media (min-width: 1024px) {
    right: 2.5vw;
  }
}

button:hover {
  background-color: #ffffff;
  filter: blur(0);
}

/* .video-container.large button {
  top: auto;
  bottom: 20px;
} */

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
  object-fit: contain;
}
</style>
