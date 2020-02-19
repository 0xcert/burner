<template>
  <div class="burning">
    <img class="logo" src="/images/0xcert-burner.svg" alt="0xcert Burner" />
    <h1 class="text-center">
      0xcert Burner
    </h1>
    <div class="subtitle text-center mb-3">
      A dedicated mechanism for burning ZXC tokens.
    </div>
    <div class="column">
      <p>
        This unique mechanism enables ZXC tokens to be controlled by the market
        and <strong>not owned by anyone</strong>. The tokens are sent to the
        smart contract, <strong>the sole owner</strong> of the ZXC smart
        contract, where they get burned.
      </p>
      <p>
        With the form bellow anyone can participate and permanently burn desired
        amount of ZXC tokens from their wallet. This will
        <strong>decrease a total token supply</strong> and consequently
        <strong>increase the token value.</strong>
      </p>
      <div class="mt-2 text-center">
        <div class="form-group mb-2">
          <input
            placeholder="Amount of tokens to burn"
            type="text"
            value=""
            class="input"
          />
        </div>
        <div class="button primary" @click="approveTokens()">
          Approve tokens for burning
        </div>
        <div class="button primary" @click="burnTokens()">
          Burn
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MetamaskProvider, Mutation } from '@0xcert/ethereum-metamask-provider'
import { ValueLedger } from '@0xcert/ethereum-value-ledger'

export default {
  methods: {
    async approveTokens() {
      try {
        const provider = new MetamaskProvider()
        await provider.enable()
        const valueLedger = new ValueLedger(provider, process.env.zxcAddress)
        const mutation = await valueLedger.approveValue(
          '1000000',
          process.env.burnAddress
        )
        await mutation.complete()
      } catch (error) {
        console.log(error)
      }
    },
    async burnTokens() {
      const provider = new MetamaskProvider()
      await provider.enable()
      const functionSignature = '0x42966c68' // burn
      const inputTypes = ['uint256']
      const attrs = {
        from: provider.accountId,
        to: process.env.burnAddress,
        // todo parse amount from input field
        data:
          functionSignature +
          provider.encoder.encodeParameters(inputTypes, ['1000000']).substr(2)
      }
      const res = await provider.post({
        method: 'eth_sendTransaction',
        params: [attrs]
      })
      const mutation = new Mutation(provider, res.result)
      await mutation.complete()
    }
  }
}
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

.column {
  @include breakpoint(medium) {
    padding: 0 4rem;
  }
}
</style>
