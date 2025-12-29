<template>
  <!-- <NuxtLink to="/" class="logo"> -->
  <div class="logo">
    <h1>
      cloo
    </h1>
  </div>
  <!-- </NuxtLink> -->
</template>

<style scoped>
  .logo {
    mix-blend-mode: difference;
    text-align: center;
    user-select: none;
    transition: all 0.5s;
    
    h1 {
      color: #000000;
      font-size: 13.1vw;
      line-height: 0.3;
      font-family: concielian;
      width: 100vw;
      text-shadow: 1px 2px 3px #ffffff;
      
      @media (min-width: 1024px) {
        font-size: 8vw;
        transition: filter 0.6s, color 0.6s;
      }
    }
    /* h2 {
      color: #ffffff;
      display: inline-block;
      padding: 0 0.7rem;
      border-radius: 2rem;
      transition: filter 0.5s, color 0.6s, text-shadow 0.6s;
      transform: translateY(0.1vw);
      position: fixed;
      bottom: 1.2vh;
      left: 1vw;
      
      @media (min-width: 1024px) {
        position: relative;
        filter: blur(16px);
        transform: translateY(-0.6vw);
        text-shadow: 0 0 0 #000000;
      }
    } */

    /* h2:hover {
      text-shadow: 0 2px 16px #000000;
    }
    h2::after {
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
    h2:hover::after { 
      background: #ffffff88;
    }     */
  }
</style>
