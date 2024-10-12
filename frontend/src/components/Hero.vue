<template>
  <section
    class="pb-[80px] pt-[90px] lg:-mt-[80px] -mt-[90px] bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
  >
    <div class="container">
      <div class="md:flex items-center">
        <div class="md:w-[478px]">
          <div
            class="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight"
          >
            Version 2.0 is here
          </div>
          <h1
            class="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6"
          >
            Pathway to productivity
          </h1>
          <p class="text-xl text-[#010D3E] tracking-tight mt-6">
            Celebrate the joy of accomplishment with an app designed to track
            your progress, motivate your efforts, and celebrate your successes.
          </p>
          <div class="flex gap-1 items-center mt-[10px]">
            <router-link to="/profile">
              <button
                class="px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight bg-black text-white"
              >
                Get start for free
              </button>
            </router-link>
            <button
              class="px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight ext-black bg-transparent gap-1"
            >
              <span>Learn more</span>
              <img
                src="../assets/arrow-right.svg"
                alt="Arrow Icon"
                class="h-5 w-5"
              />
            </button>
          </div>
        </div>
        <div class="mt-20 md:mt-0 md:h-[548px] md:flex-1 relative">
          <img
            src="../assets/big.png"
            alt="Cog image"
            class="animate-up-down md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-20 z-1"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style scoped>
@keyframes upDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-up-down {
  animation: upDown 2s ease-in-out infinite; /* Adjust duration and timing as needed */
}
</style>
