<template>
  <button
    class="pill-button"
    v-bind="$attrs"
    :type="type"
  >
    <span class="text">
      <slot />
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button'
  }
})
</script>

<style scoped>
.pill-button {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  display: inline-flex;
  cursor: pointer;
  border-radius: 50px;
  padding: 1.5px 15px 3px;
  background-image:
    radial-gradient(75% 50% at 50% 0%, #f5f5f5, transparent),
    radial-gradient(75% 35% at 50% 80%, #b0b0b0, transparent);
  box-shadow:
    inset 0 -2px 4px 1px rgba(40, 40, 40, 0.7),
    inset 0 -4px 4px 1px #b0b0b0,
    inset 0 0 2px 1px rgba(255, 255, 255, 0.25);

  transition-property: transform, background-color;
  transition-duration: 0.2s;
}
.pill-button:hover {
  transform: scale(1.04);
}
.pill-button:active {
  transform: scale(0.96);
  background-color: #4a4a4a;
}
.pill-button::after {
  content: "";
  position: absolute;
  top: 1px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50px;
  width: 80%;
  height: 40%;
  background-image: linear-gradient(to bottom, #f4feff, transparent);
  opacity: 0.75;
}

.pill-button .text {
  font-size: 11px;
  font-family: Helvetica, sans-serif;
  color: #ffffff;
  white-space: nowrap;
  user-select: none;
}

</style>
