<template>
  <div>
    <h1 class="text-center">Burning history</h1>
    <transition name="fade" mode="out-in">
      <div v-if="state === 'loading'" key="loading" class="text-center">
        <loader />
        <p>Loading burning history...</p>
      </div>
      <div v-if="state === 'loaded' && history.length > 0" key="loaded">
        <div class="table">
          <div class="tr">
            <div class="th date">Date</div>
            <div class="th amount">Amount</div>
            <div class="th tx">Transaction</div>
          </div>

          <div v-for="burn in history" :key="burn.ref" class="tr">
            <div class="td date">
              <div class="xs-label">Date:</div>
              {{ formatDate(burn.completedAt) }}
            </div>
            <div class="td amount">
              <div class="xs-label">Amount:</div>
              {{ parseBalance(burn.amount) }} ZXC
            </div>
            <div class="td tx ellipsis">
              <div class="xs-label">Transaction:</div>
              <a
                target="_blank"
                :href="`https://etherscan.io/tx/${burn.txHash}`"
              >
                {{ burn.txHash }}
              </a>
            </div>
          </div>
        </div>
        <div class="text-center">
          <n-link class="button mt-2" to="/">Go back</n-link>
        </div>
      </div>
      <div v-if="state === 'loaded' && history.length < 1" class="text-center">
        <p>There's no burning events recorded so far.</p>
        <n-link class="button mt-2" to="/">Go back</n-link>
      </div>
      <div v-if="state === 'error'" key="error" class="text-center">
        <p>Something went wrong.</p>
        <p>{{ error }}</p>
        <div class="text-center">
          <n-link class="button mt-2" to="/">Go back</n-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { format } from 'date-fns'
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data() {
    return {
      state: 'loading',
      history: null,
      error: ''
    }
  },
  created() {
    this.fetchHistory()
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "yyyy-MM-dd 'at' h:mm a")
    },
    async fetchHistory() {
      try {
        const data = await this.$axios
          .get('/stats/burns')
          .then((res) => res.data.data)
        this.history = data
        this.state = 'loaded'
      } catch (err) {
        err.response.data.errors.forEach((err) => {
          const error = err.message
            ? err.message
            : `Error with code ${err.code} ocurred.`
          this.error = error
        })
        this.state = 'error'
      }
    }
  },
  head() {
    return {
      title: '0xcert Burner - History'
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin-top: 2rem;

  .tr {
    @include breakpoint(medium) {
      display: flex;
    }

    &:nth-child(even) {
      background: rgba(0, 0, 0, 0.4);
    }
  }

  .td,
  .th {
    font-size: 16px;
    padding: 5px 10px;

    @include breakpoint(medium) {
      padding: 10px;
    }
  }

  .th {
    font-weight: 500;

    @include breakpoint(small only) {
      display: none;
    }
  }

  .tx {
    flex-basis: 44%;
    justify-self: flex-end;

    @include breakpoint(small only) {
      width: calc(100vw - 2rem);
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
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

  &.tx {
    color: var(--primary-color);
  }
}

.xs-label {
  color: var(--white);
  font-weight: 500;

  @include breakpoint(medium) {
    display: none;
  }
}
</style>
