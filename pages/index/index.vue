<template>
  <div class="column">
    <h1 class="text-center">
      0xcert Burner
    </h1>
    <div class="subtitle text-center mb-3">
      A dedicated mechanism for burning ZXC tokens.
    </div>
    <p>
      This unique mechanism enables ZXC tokens to be controlled by the market
      and <strong>not owned by anyone</strong>. The tokens are sent to the smart
      contract, <strong>the sole owner</strong> of the ZXC smart contract, where
      they get burned.
    </p>
    <p>
      With the form bellow anyone can participate and permanently burn a desired
      amount of ZXC tokens from their wallet. This will
      <strong>decrease the total token supply</strong> and consequently
      <strong>increase the scarcity.</strong>
    </p>
    <n-link class="button primary mt-2" to="/burner">Start burning</n-link>
    <n-link class="button-text ml-1" to="/history">Burning history</n-link>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '0xcert Burner'
    }
  }
}
</script>

<style lang="scss" scoped>
.column {
  text-align: center;

  @include breakpoint(medium) {
    padding: 0 4rem;
  }
}
</style>
