<template>
  <div class="mt-2 text-center">
    You have: {{ balance }} ZXC tokens in your wallet.
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
</template>

<script>
import { MetamaskProvider, Mutation } from '@0xcert/ethereum-metamask-provider'
import { ValueLedger } from '@0xcert/ethereum-value-ledger'

export default {
  data() {
    return {
      tokens: null,
      balance: null
    }
  },
  async created() {
    await this.connectMetamask()
  },
  methods: {
    async connectMetamask() {
      try {
        const provider = new MetamaskProvider()
        await provider.enable()
        const valueLedger = new ValueLedger(provider, process.env.zxcAddress)
        const accountId = provider.accountId
        this.balance = (await valueLedger.getBalance(accountId)) || '0'
      } catch (error) {}
    },
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

<style lang="scss" scoped></style>
