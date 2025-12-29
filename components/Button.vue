<template>
  <div class="button-wrap">
    <button class="button">
      <span>
        <slot />
      </span>
    </button>
    <div class="button-shadow"></div>
  </div>
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
.button-wrap {
  position: relative;
  display: inline-flex;
  z-index: 2;
  border-radius: 999vw;
  background: transparent;
  pointer-events: none;
  transition: all 0.4s ease-out;
}
.button-shadow {
  --shadow-cuttoff-fix: 2em;
  position: absolute;
  width: calc(100% + 1em);
  height: calc(100% + 1em);
  top: -1em;
  left: -1em;
  filter: blur(2px);
  overflow: visible;
  pointer-events: none;
  transition: all 0.4s ease-out;
}
.button:hover + .button-shadow {
  top: -1.2em;
}
.button {
  --border-width: clamp(1px, 0.0625em, 4px);
  all: unset;
  cursor: pointer;
  position: relative;
  pointer-events: auto;
  z-index: 3;
  border-radius: 999vw;
  backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  transition: all 0.4s ease-out;
}
.button span {
  position: relative;
  display: block;
  text-shadow: 0 0.25em 0.05em rgba(0,0,0,0.1);
  transition: all 0.4s ease-out;
  padding: 3px 17px 6px 17px;
  white-space: nowrap;
  user-select: none;
}
.button:hover {
  transform: scale(0.975);
  backdrop-filter: blur(0.01em);
  -webkit-backdrop-filter: blur(0.01em);
}
.button:hover span {
  color: #ffffff;
}
.button::after {
  content: "";
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: 999vw;
  width: calc(100% - 1em);
  height: calc(100% - 1em);
  top: calc(0% + 1em / 2);
  left: calc(0% + 1em / 2);
  box-sizing: border-box;
  filter: blur(11px);
  transition: all 0.4s ease-out, 500ms ease;
}
.button:hover::after { 
  background: #ffffff88;
}
</style>
