<template>
  <div class="burning">
    <div class="logo">
      <n-link to="/" class="logo">
        <img src="/images/0xcert-burner.svg" alt="0xcert Burner" />
      </n-link>
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
  margin-bottom: 1rem;
  text-align: center;
}
</style>
