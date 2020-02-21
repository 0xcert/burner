<template lang="html">
  <transition mode="out-in" name="fade">
    <div class="loading-page">
      <svg
        width="50px"
        height="50px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        class="lds-dual-ring"
        style="background: none;"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke-linecap="round"
          r="40"
          stroke-width="7"
          stroke="#3c8cff"
          stroke-dasharray="40"
          transform="rotate(100 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke-linecap="round"
          r="28"
          stroke-width="6"
          stroke="#fff"
          stroke-dasharray="42 42"
          stroke-dashoffset="20"
          transform="rotate(-100 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;-360 50 50"
            keyTimes="0;1"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  </transition>
</template>

<script>
export default {}
</script>

<style scoped>
.loading-page {
  align-items: center;
  display: flex;
  font-family: sans-serif;
  height: 100%;
  justify-content: center;
  min-height: 100px;
  width: 100%;
}

.spinner {
  fill: var(--white);
}
</style>
