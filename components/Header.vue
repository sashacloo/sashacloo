<template>
  <div class="header z-10 fixed top-0 left-0 right-0 flex items-center justify-between bg-gray-200">
    <Logo />
    <Button v-if="currentCategory" class="button-category" @click="goHome">
      <span class="category-name">{{ currentCategory }}</span>
      <span class="category-close">✕</span>
    </Button>
    <Button @click="handleUrl('https://sashaklu.com')" class="button-sashaklu">
      design by
      <span class="sasha-link">
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
import { ref, computed } from "vue";
import { createClient } from '@sanity/client'
import Button from "~/components/Button.vue";

const grid = useState('grid', () => ref(false))
const blur = useState('blur', () => ref(false))
const route = useRoute()
const router = useRouter()

const sanity = createClient({
  projectId: '1ql581l8',
  dataset: 'production',
  apiVersion: '2024-10-01',
  useCdn: true,
  apiHost: 'https://api.sanity.io',
})

// The header renders before the page does, so it resolves the category itself
// rather than waiting for the page to hand it over — otherwise the pill would
// only appear after hydration. One small query, cached across navigations.
const { data: routeNames } = await useAsyncData('routeNames', async () => {
  try {
    return await sanity.fetch(`{
      'categories': *[_type == 'category']{ title, "slug": slug.current },
      'pageSlugs': *[_type == 'page' && defined(slug.current)].slug.current
    }`)
  } catch (e) {
    console.error('Sanity fetch (routeNames) failed:', e)
    return { categories: [], pageSlugs: [] }
  }
}, {
  server: true,
  lazy: false,
  default: () => ({ categories: [], pageSlugs: [] }),
})

// Both /poster and the older /category/poster list a category
const currentCategory = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  let slug = ''
  if (segments.length === 2 && segments[0] === 'category') {
    slug = segments[1]
  } else if (segments.length === 1) {
    slug = segments[0]
  }
  if (!slug) return ''

  const wanted = decodeURIComponent(slug).toLowerCase()
  const { categories = [], pageSlugs = [] } = routeNames.value || {}

  // A page of the same name wins the route, so it gets no category pill
  if (segments.length === 1 && pageSlugs.some((s) => (s || '').toLowerCase() === wanted)) return ''

  const match = categories.find(
    (c) => (c.slug || '').toLowerCase() === wanted || (c.title || '').toLowerCase() === wanted
  )
  return match ? (match.title || wanted) : ''
})

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

const goHome = () => {
  router.push('/')
}

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
  .button-sashaklu,
  .button-category {
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
  .button-category {
    @apply left-[50vw] top-[12.5vw] 1000:top-[7vw] -translate-x-1/2;
    z-index: 22222;
  }
  .category-close {
    margin-left: 0.4em;
  }
  .logo {
    pointer-events: none;
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
