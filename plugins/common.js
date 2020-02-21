import Vue from 'vue'

Vue.mixin({
  methods: {
    parseBalance(value) {
      if (typeof value === 'string') {
        value = parseInt(value)
      }
      const result = value / 10 ** 18
      return result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
})
