<template>
  <div class="video-container">
    <video
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

defineProps({
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
}
button {
  padding: 5px 15px;
  border-radius: 2em;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.5;
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgb(255, 255, 255);
}
</style>
