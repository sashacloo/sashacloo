<template>
  <div class="header z-100 flex items-center justify-between bg-gray-200">
    <Logo />
    <button @click="handleGrid" class="button button-grid">{{ grid ? 'list' : 'grid' }}</button>

    <button class="button button-contact" @click="handleClick">
      {{ contactText }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const grid = useState('grid', () => ref(false))
const blur = useState('blur', () => ref(false))

const showEmail = ref(false);
const email = 'me' + '@' + 'sashaklu.com';

const contactText = ref("contact");

const handleGrid = () => {
  grid.value = !grid.value
  blur.value = true

  setTimeout(() => {
    blur.value = !blur.value
  }, 300);
};
const handleClick = () => {
  if (!showEmail.value) {
    showEmail.value = true;
    contactText.value = email;
  } else {
    copyToClipboard(email);
    contactText.value = "Email copied!";

    setTimeout(() => {
      contactText.value = email;
    }, 2000);
    setTimeout(() => {
      contactText.value = "contact";
    }, 5000);
  }
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).catch((err) => {
    console.error("Could not copy text: ", err);
  });
};
</script>

<style lang="postcss" scoped>

.header {
  /* @apply bg-[#ff00ff] flex flex-col justify-center items-center text-center p-2; */
    
  a {
    text-decoration: none;
  }
  .button {
    @apply fixed top-[10vw] 1000:top-[6.5vw];
    filter: blur(0.5px);
    font-size: 11px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #c8c8c888;
    color: rgb(73, 73, 73);
    padding: 0 1rem;
    /* border: 2px solid #c8c8c8; */
    border-radius: 2rem;
    cursor: pointer;
    z-index: 11111;
    transition: all 0.5s;
    /* transform: translateX(-50%); */

    &-grid {
      @apply left-[2vw] 1000:left-[1.5vw];
    }
    &-contact {
      @apply right-[2vw] 1000:right-[1.5vw];
    }
    &:hover {
      background-color: #51ff0088;
      /* border: 2px solid #51ff00; */
      filter: blur(0);
    } 
  }
}
</style>
