<template>
  <div class="footer">
    sasha cloo
    <a ref="noopener" href="https://www.instagram.com/sashacloo/" class="link" target="_blank">
      IG
    </a>
    <a ref="noopener" href="https://soundcloud.com/sashacloo" class="link" target="_blank">
      Soundcloud
    </a>
    <a ref="noopener" href="mailto:sasha@cloo.ooo" class="link" target="_blank">
      Email
    </a>
    <!-- <div class="email">
      <EmailCapture />
    </div> -->
  </div>
</template>

<style scoped>
  .footer {
    @apply bg-[#ffff00] flex justify-around items-center text-center p-2;
      
    a {
      text-transform: uppercase;
      text-decoration: none;
    }
  }
</style>
