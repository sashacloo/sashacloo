<template>
  <div>
    <a href="https://soundcloud.com/sashacloo00" class="link">
      cloud
    </a>
    <a href="https://bandcamp.com/sashacloo00" class="link">
      camp
    </a>
    <a href="https://instagram.com/sashacloo00" class="link">
      gram
    </a>
  </div>
</template>

<script>
export default {
  name: 'NavLinks',
}
</script>

<style lang="scss" scoped>
  .link {
    background-color: white;
    border-radius: 3em;
    position: sticky;
    top: 10vw;
    // right: 2vw;
    padding: 0 2.6em;
    mix-blend-mode: overlay;
    z-index: 1;

    @media (min-width: 1024px) {
      body {
        font-size: 14px;
      }
    }
  }
</style>
