<template>
  <div
    class="header z-10 fixed top-0 left-0 right-0 flex items-center justify-between bg-gray-200"
    :class="{ 'in-grid': grid }"
  >
    <Logo v-if="!grid" />

    <div v-if="grid" class="filters">
      <!-- desktop: every category on one line, between the feed and contact buttons -->
      <div class="filter-row">
        <Button
          v-for="category in categories" :key="category.path"
          class="filter-tag"
          :class="{ 'is-active': category.title === currentCategory }"
          :to="category.title === currentCategory ? '/' : category.path"
        >
          {{ category.title }}
        </Button>
      </div>

      <!-- mobile: the same list behind a dropdown -->
      <div class="filter-picker">
        <Button class="filter-trigger" @click="filterOpen = !filterOpen">
          {{ currentCategory || 'filter' }}
          <span class="filter-arrow" :class="{ 'is-open': filterOpen }" />
        </Button>
      </div>
    </div>

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
      {{ grid ? 'feed' : 'grid' }}
    </Button>
    <Button @click="handleContact" class="button-contact">
      {{ contactText }}
    </Button>
  </div>

  <Teleport to="body">
    <div v-if="grid && filterOpen" class="filter-backdrop" @click="filterOpen = false" />
    <div v-if="grid && filterOpen" class="filter-menu">
      <Button class="filter-option" to="/" @click="filterOpen = false">all</Button>
      <Button
        v-for="category in categories" :key="category.path"
        class="filter-option"
        :class="{ 'is-active': category.title === currentCategory }"
        :to="category.path"
        @click="filterOpen = false"
      >
        {{ category.title }}
      </Button>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from "vue";
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
      'categories': *[_type == 'category']{
        title,
        "slug": slug.current,
        "count": count(*[_type == 'post' && references(^._id)])
      } | order(count desc, title asc),
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

// The filter list shown in grid mode: biggest categories first
const categories = computed(() =>
  (routeNames.value?.categories || []).map((category) => ({
    title: category.title,
    path: `/${encodeURIComponent(category.slug || (category.title || '').toLowerCase())}`,
  }))
)

const filterOpen = ref(false)
watch(() => route.path, () => { filterOpen.value = false })

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
    @apply left-[50vw] top-[calc(12.5vw_-_50px)] 1000:top-[calc(7vw_-_50px)] -translate-x-1/2;
    z-index: 22222;
  }

  /* wrapper only — the two filter layouts place themselves */
  .filters {
    display: contents;
  }

  .filter-row {
    @apply hidden 1000:flex items-center justify-between top-[2vw];
    position: fixed;
    /* clear of the feed button on the left and contact on the right */
    left: calc(2.5vw + 75px);
    right: calc(2.5vw + 95px);
    z-index: 11111;
  }

  .filter-picker {
    @apply 1000:hidden flex flex-col items-center top-[1.5vw] left-[50vw] -translate-x-1/2;
    position: fixed;
    z-index: 11111;
  }

  .filter-arrow {
    display: inline-block;
    margin-left: 0.45em;
    vertical-align: middle;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid currentColor;
    transition: transform 0.2s;

    &.is-open {
      transform: rotate(180deg);
    }
  }

  .filter-tag,
  .filter-option,
  .filter-trigger {
    transition: all 0.5s;

    /* the pill itself lives inside Button, past this component's scope */
    &.is-active :deep(.button) {
      background-color: #00ff00;
      color: #000000;
    }
    &.is-active :deep(.button:hover span) {
      color: #000000;
    }
  }

  &.in-grid {
    /* the filter row and the dropdown both name the current category, and the
       row sat 6.5px on top of this pill — clicking the active tag clears it */
    .button-category {
      @apply hidden;
    }

    /* the filter row takes the top line, so the credit moves out of it */
    .button-sashaklu {
      @apply 1000:bottom-[1.2vw] 1000:left-[1vw] 1000:top-auto 1000:translate-x-0 1000:blur-none;
    }
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
/* Teleported to <body>, so it escapes the header's difference blend and can
   draw a flat panel. Outside .header, these rules live at the top level. */
.filter-backdrop {
  @apply 1000:hidden;
  position: fixed;
  inset: 0;
  z-index: 33332;
}

.filter-option.is-active :deep(.button),
.filter-option.is-active :deep(.button:hover span) {
  background-color: #00ff00;
  color: #000000;
}

.filter-menu {
  @apply 1000:hidden flex flex-col items-center gap-y-1 px-2 py-2;
  position: fixed;
  top: calc(1.5vw + 34px);
  left: 50vw;
  transform: translateX(-50%);
  z-index: 33333;
  background-color: #c8c8c8;
  border-radius: 1.4rem;
  max-height: 70vh;
  overflow-y: auto;
  color: rgb(73, 73, 73);
}
</style>