<template>
  <div class="layout">
    <Header />
    <slot />
    <!-- <Footer /> -->
  </div>
</template>

<style scoped>
.layout {
  @apply flex flex-col justify-between text-center min-h-[calc(90vh_-_60px)] 1000:min-h-[100vh];
}
</style>
