// Ask once per page load, not once per post
export default defineNuxtPlugin(() => {
  const { check } = useSanityUser()
  check()
})
