<template>
  <h1 class="logo">
    sasha cloo
  </h1>
</template>

<style scoped>
  .logo {
    filter: blur(2px);
    font-size: 11.1vw;
    font-family: concielian;
    line-height: 0.34;
    color: grey;
    width: 100vw;
    height: 0;
    margin: 0;
    mix-blend-mode: difference;
    text-align: center;
    top: 0;
    position: fixed;
    z-index: 1;
    user-select: none;

    @media (min-width: 1024px) {
      filter: blur(6px);
    }
  }
</style>
