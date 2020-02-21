<template>
  <div class="burning">
    <n-link to="/">
      <img class="logo" src="/images/0xcert-burner.svg" alt="0xcert Burner" />
    </n-link>
    <nuxt-child />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.burning {
  margin: 0 auto;
  max-width: var(--max-width);
}

.logo {
  display: block;
  margin: 0 auto 1rem;
}
</style>
