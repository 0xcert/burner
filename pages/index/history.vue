<template>
  <div>
    <h1 class="text-center">Burning history</h1>
    <transition name="fade" mode="out-in">
      <div v-if="state === 'loading'" key="loading" class="text-center">
        <loader />
        <p>Loading burning history...</p>
      </div>
      <div v-if="state === 'loaded'" key="loaded">
        <div class="table">
          <div class="tr">
            <div class="th date">Date</div>
            <div class="th amount">Amount</div>
            <div class="th tx">Transaction</div>
          </div>

          <div v-for="burn in history" :key="burn.ref" class="tr">
            <div class="td date" v-text="burn.completedAt" />
            <div class="td amount">{{ parseBalance(burn.amount) }} ZXC</div>
            <div class="td tx ellipsis">
              <a :href="`https://etherscan.io/tx/${burn.txHash}`">
                {{ burn.txHash }}
              </a>
            </div>
          </div>
        </div>
        <div class="text-center">
          <n-link class="button mt-2" to="/">Go back</n-link>
        </div>
      </div>
      <div v-if="state === 'error'" key="error" class="text-center">
        <h2>Something went wrong</h2>
        <p>{{ error }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
export default {
  components: {
    Loader
  },
  data() {
    return {
      state: 'loading',
      history: null,
      error: '',
      headers: ['Date', 'Amount', 'transaction']
    }
  },
  computed: {
    response() {
      return [
        {
          completedAt: '2020-02-12 at 16:03',
          burner: '0x29be44537fcF8e02708Cd618C407C78bDe1e0Af0',
          amount: 50000000000000000000,
          txHash:
            '0x1e5e37a792a01859148755c9d3ea880f76bc2ad37f0fee13776352e048056e43'
        },
        {
          completedAt: '2020-02-12 at 16:03',
          burner: '0x29be44537fcF8e02708Cd618C407C78bDe1e0Af0',
          amount: 50000000000000000000,
          txHash:
            '0x1e5e37a792a01859148755c9d3ea880f76bc2ad37f0fee13776352e048056e43'
        },
        {
          completedAt: '2020-02-12 at 16:03',
          burner: '0x29be44537fcF8e02708Cd618C407C78bDe1e0Af0',
          amount: 50000000000000000000,
          txHash:
            '0x1e5e37a792a01859148755c9d3ea880f76bc2ad37f0fee13776352e048056e43'
        },
        {
          completedAt: '2020-02-12 at 16:03',
          burner: '0x29be44537fcF8e02708Cd618C407C78bDe1e0Af0',
          amount: 50000000000000000000,
          txHash:
            '0x1e5e37a792a01859148755c9d3ea880f76bc2ad37f0fee13776352e048056e43'
        },
        {
          completedAt: '2020-02-12 at 16:03',
          burner: '0x29be44537fcF8e02708Cd618C407C78bDe1e0Af0',
          amount: 50000000000000000000,
          txHash:
            '0x1e5e37a792a01859148755c9d3ea880f76bc2ad37f0fee13776352e048056e43'
        },
        {
          completedAt: '2020-02-12 at 16:03',
          burner: '0x29be44537fcF8e02708Cd618C407C78bDe1e0Af0',
          amount: 50000000000000000000,
          txHash:
            '0x1e5e37a792a01859148755c9d3ea880f76bc2ad37f0fee13776352e048056e43'
        },
        {
          completedAt: '2020-02-12 at 16:03',
          burner: '0x29be44537fcF8e02708Cd618C407C78bDe1e0Af0',
          amount: 50000000000000000000,
          txHash:
            '0x1e5e37a792a01859148755c9d3ea880f76bc2ad37f0fee13776352e048056e43'
        },
        {
          completedAt: '2020-02-12 at 16:03',
          burner: '0x29be44537fcF8e02708Cd618C407C78bDe1e0Af0',
          amount: 50000000000000000000,
          txHash:
            '0x1e5e37a792a01859148755c9d3ea880f76bc2ad37f0fee13776352e048056e43'
        },
        {
          completedAt: '2020-02-12 at 16:03',
          burner: '0x29be44537fcF8e02708Cd618C407C78bDe1e0Af0',
          amount: 50000000000000000000,
          txHash:
            '0x1e5e37a792a01859148755c9d3ea880f76bc2ad37f0fee13776352e048056e43'
        }
      ]
    }
  },
  created() {
    this.fetchHistory()
  },
  methods: {
    fetchHistory() {
      try {
        const history = this.response
        this.history = history
        this.state = 'loaded'
      } catch (error) {
        this.error = error
        this.state = 'error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin-top: 2rem;

  .tr {
    display: flex;

    &:nth-child(even) {
      background: rgba(0, 0, 0, 0.4);
    }
  }

  .td,
  .th {
    font-size: 16px;
    padding: 10px;
  }

  .th {
    font-weight: 500;
  }

  .tx {
    flex-basis: 44%;
    justify-self: flex-end;
  }

  .date {
    flex-basis: 28%;
  }

  .amount {
    flex-basis: 20%;
    flex-grow: 1;
  }
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
