<template>
  <div class="container">
    <nuxt />
  </div>
</template>

<style lang="scss">
@import '~/assets/global';

.container {
  background: linear-gradient(var(--black), var(--dark));
  color: var(--white);
}

.max-width {
  max-width: var(--max-width);
}
</style>
