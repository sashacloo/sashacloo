<template>
  <!-- <NuxtLink to="/" class="logo"> -->
  <div class="logo">
    <h1>
      cloo
    </h1>
    <a href="https://sashaklu.com" target="_blank">
      <h2>by sasha klu</h2>
    </a>
  </div>
  <!-- </NuxtLink> -->
</template>

<style scoped>
  .logo {
    color: grey;
    mix-blend-mode: difference;
    text-align: center;
    user-select: none;

    h1 {
      filter: blur(2px);
      font-size: 13.1vw;
      line-height: 0.3;
      font-family: concielian;
      width: 100vw;
      
      @media (min-width: 1024px) {
        font-size: 9vw;
        filter: blur(6px);
        transition: filter 0.6s, color 0.6s;
      }
    }
    h2 {
      font-size: 2.5vw;
      transform: translateY(2vw);
      display: inline-block;
      padding: 0 0.7rem;
      border-radius: 2rem;
      transition: filter 0.6s, color 0.6s, text-shadow 0.6s;
      transform: translateY(0.1vw);

      @media (min-width: 1024px) {
        font-size: 1.5vw;
        filter: blur(16px);
        transform: translateY(-1.3vw);
        text-shadow: 0 0 0 #000000;
      }
    }
    &:hover {
      h1 {
        filter: blur(21px);
        /* color: #ffffff; */
      }
      h2 {
        filter: blur(0);
        color: #ffffff;
      }
    } 
    h2:hover {
      text-shadow: 0 2px 16px #000000;
    }
  }
</style>
