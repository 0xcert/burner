<template>
  <div class="burning">
    <img class="logo" src="/images/0xcert-burner.svg" alt="0xcert Burner" />
    <h1 class="text-center">
      0xcert Burner
    </h1>
    <div class="subtitle text-center mb-3">
      A dedicated mechanism for burning ZXC tokens.
    </div>
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
