<template>
  <div class="footer">
<<<<<<< HEAD
    <a ref="noopener" href="https://www.instagram.com/sashacloo/" class="link" target="_blank">
      IG
    </a>
    &nbsp;
    &nbsp;
    &nbsp;
    <a ref="noopener" href="https://soundcloud.com/sashacloo" class="link" target="_blank">
      Soundcloud
    </a>
    &nbsp;
    &nbsp;
    &nbsp;
    <a ref="noopener" href="mailto:sasha@cloo.ooo" class="link" target="_blank">
      Email
    </a>
  </div>
</template>

<script>
export default {
  name: 'FooterElement',
}
</script>

<style lang="scss" scoped>
  .footer {
    filter: blur(0.5px);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-family: var(--small), sans-serif;
    font-size: 13px;
    color: grey;
    margin: 0;
    text-align: center;
    padding: 1em;
      
    // @media (min-width: 1024px) {
    //   font-size: 22px;
    // }
=======
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
      
>>>>>>> 3acb38d (deploy to  sashacloo)
    a {
      text-transform: uppercase;
      text-decoration: none;
    }
  }
</style>
