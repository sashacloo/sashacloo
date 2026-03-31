<template>
  <div class="header z-10 fixed top-0 left-0 right-0 flex items-center justify-between bg-gray-200">
    <Logo />
    <Button class="button-sashaklu">
      design by
      <span
        class="sasha-link"
        role="link"
        tabindex="0"
        @click.stop="handleUrl('https://sashaklu.com')"
        @keydown.enter.prevent="handleUrl('https://sashaklu.com')"
        @keydown.space.prevent="handleUrl('https://sashaklu.com')"
      >
        sasha klu
      </span>
    </Button>
    <Button @click="handleGrid" class="button-grid">
      {{ grid ? 'list' : 'grid' }}
    </Button>
    <Button @click="handleContact" class="button-contact">
      {{ contactText }}
    </Button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "~/components/Button.vue";

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

const handleUrl = (url) => {
  window.open(url, '_blank');
};

const handleContact = () => {
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
  mix-blend-mode: difference;

  .button-grid,
  .button-contact,
  .button-sashaklu {
    position: fixed;
    z-index: 11111;
    transition: all 0.5s;
  }
  .button-grid,
  .button-contact {
    @apply top-[1.5vw] 1000:top-[2vw];
  }
  .button-grid {
    @apply left-[0vw] 1000:left-[2.5vw];
  }
  .button-contact {
    @apply right-[0vw] 1000:right-[2.5vw];
  }
  .button-sashaklu {
    @apply bottom-[1.2vw] left-[1vw]
           1000:bottom-auto 1000:left-[50vw] 1000:top-[2vw]
           1000:-translate-x-1/2 1000:blur-[16px];
  }
  .sasha-link {
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 0.15em;
  }
  &:hover {
    .logo {
      filter: blur(21px);
    }
    .button-sashaklu {
      filter: blur(0);
    }
  }  
}
</style>
