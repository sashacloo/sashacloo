<template>
  <!-- <NuxtLink to="/" class="logo"> -->
  <div class="logo">
    <h1>
      sasha cloo
    </h1>
  </div>
  <!-- </NuxtLink> -->
</template>

<style scoped>
  .logo {
    filter: blur(2px);
    font-size: 11.1vw;
    font-family: concielian;
    line-height: 0.5;
    color: grey;
    width: 100vw;
    height: 0;
    margin: 0;
    mix-blend-mode: difference;
    text-align: center;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    user-select: none;
    
    @media (min-width: 1024px) {
      line-height: 0.34;
      filter: blur(6px);
    }
  }
</style>
