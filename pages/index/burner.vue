<template>
  <div class="mt-2 text-center">
    <transition name="fade" mode="out-in">
      <div v-if="state === 'loading'">
        <loader />
        Loading your account...
      </div>
      <div v-if="state === 'locking'">
        <loader />
        Locking back your tokens...
      </div>

      <div v-if="state === 'error'">
        <h2>Ooops, something went wrong</h2>
        <div v-if="error.original">
          <p>
            Looks like you've denied Metamask transaction signature. <br />
            Next time make sure to click <strong>Confirm</strong> button.
          </p>
          <div class="button primary mt-1" @click="resetApproval()">
            Start over
          </div>
        </div>
        <div v-else>
          <p>{{ error.message }}</p>
          <div class="button primary mt-1" @click="connectMetamask()">
            Try again?
          </div>
        </div>
      </div>

      <div v-if="state === 'ready'" key="ready">
        <h2>Prepare your tokens</h2>
        <p>
          You currently own
          <span class="big">{{ parseBalance(balance) }} ZXC</span>
          tokens in your wallet.
        </p>
        <p>How much of them you want to burn?</p>
        <ValidationObserver
          ref="observer"
          v-slot="{ passes, invalid }"
          class="form-group"
        >
          <ValidationProvider
            v-slot="{ errors }"
            :rules="{
              required: true,
              balance: balance,
              integer: true,
              min_value: 1
            }"
            name="amount"
          >
            <input
              v-model="amount"
              name="amount"
              placeholder="Enter amount of tokens you want to burn"
              type="text"
              class="input"
            />
            <span v-show="errors[0]" class="alert full">{{ errors[0] }}</span>
          </ValidationProvider>
          <button
            class="button primary mt-2"
            :disabled="invalid"
            @click="approveTokens()"
          >
            Let them burn
          </button>

          <n-link class="button-text ml-1" to="/">
            Not today
          </n-link>
        </ValidationObserver>
      </div>

      <div v-if="state === 'approving'" key="approving">
        <h2>Unlocking your tokens before burning</h2>
        <loader />
        <p v-if="!unlocked">
          Click <strong>Confiirm</strong> in MetaMask window to continue.
        </p>
        <p v-else>Unlocking your tokens...</p>
      </div>

      <div v-if="state === 'burning'" key="burning">
        <h2>Burning tokens</h2>
        <loader />
        <p v-if="!confirmed">
          Click <strong>Confirm</strong> in metamask window to continue.
        </p>
        <p v-else>Your tokens are now being burned...</p>
      </div>

      <div v-if="state === 'complete'" key="complete">
        <h2>Burning complete!</h2>
        <p>
          You have successfully burned
          <span class="big">{{ parseBalance(parsedAmount) }} ZXC</span>
          tokens and decreased the total supply!
        </p>
        <p>
          We admire your courage and your sacrifice will never be forgoten!
        </p>
        <div class="button primary mt-1" @click="connectMetamask()">
          Burn some more
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { MetamaskProvider, Mutation } from '@0xcert/ethereum-metamask-provider'
import { ValueLedger } from '@0xcert/ethereum-value-ledger'
import Loader from '~/components/Loader'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Loader
  },
  data() {
    return {
      title: 'Prepare for burn',
      state: 'loading',
      loading: false,
      provider: null,
      accoountId: '',
      valueLedger: null,
      amount: null,
      tokens: null,
      unlocked: false,
      confirmed: false,
      balance: null,
      error: ''
    }
  },
  computed: {
    parsedAmount() {
      const decs = 18
      // eslint-disable-next-line
      let [left = 0, right = 0] = this.amount.split('.')
      right = `${right}${Array(decs).join('0')}`.slice(0, decs)
      return `${left}${right}`
    }
  },
  async created() {
    await this.connectMetamask()
  },
  methods: {
    async connectMetamask() {
      try {
        this.provider = new MetamaskProvider()
        await this.provider.enable()
        this.valueLedger = new ValueLedger(
          this.provider,
          process.env.ZXC_ADDRESS
        )
        this.accountId = this.provider.accountId
        this.balance =
          (await this.valueLedger.getBalance(this.accountId)) || '0'
        this.amount = null
        this.unlocked = false
        this.confirmed = false
        this.state = 'ready'
        this.title = 'Prepare for burn'
      } catch (error) {
        this.error = error
        this.state = 'error'
      }
    },

    async resetApproval() {
      this.state = 'locking'
      this.title = 'Locking tokens...'
      const mutation = await this.valueLedger.approveValue(
        0,
        process.env.BURN_ADDRESS
      )
      this.unlocked = true
      await mutation.complete()
      this.connectMetamask()
    },

    async approveTokens() {
      try {
        if (!(await this.$refs.observer.validate())) {
          return
        }
        this.state = 'approving'
        this.title = 'Approving tokens...'
        const isUnlocked = await this.valueLedger.isApprovedValue(
          this.parsedAmount,
          this.provider.accountId,
          process.env.BURN_ADDRESS
        )

        if (!isUnlocked) {
          const mutation = await this.valueLedger.approveValue(
            this.parsedAmount,
            process.env.BURN_ADDRESS
          )
          this.unlocked = true
          await mutation.complete()
        }
        this.burnTokens()
      } catch (error) {
        this.error = error
        this.state = 'error'
      }
    },

    async burnTokens() {
      try {
        this.state = 'burning'
        this.title = 'Burning tokens...'
        const functionSignature = '0x42966c68' // burn
        const inputTypes = ['uint256']
        const attrs = {
          from: this.accountId,
          to: process.env.BURN_ADDRESS,
          data:
            functionSignature +
            this.provider.encoder
              .encodeParameters(inputTypes, [this.parsedAmount])
              .substr(2)
        }
        const res = await this.provider.post({
          method: 'eth_sendTransaction',
          params: [attrs]
        })
        this.confirmed = true
        const mutation = new Mutation(this.provider, res.result)
        await mutation.complete()
        this.state = 'complete'
        this.title = 'Burning complete!'
      } catch (error) {
        this.error = error
        this.state = 'error'
      }
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss" scoped>
.big {
  color: var(--white);
  font-size: 20px;
  font-weight: 500;
}
</style>
