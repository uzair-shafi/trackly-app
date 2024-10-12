<template>
  <div
    class="flex flex-col bg-white w-full border-[1px] rounded-lg border-[#e3e3e3] z-1000"
  >
    <!-- Dropdown Header -->
    <div
      class="flex gap-2 border-b-[1px] rounded-t-lg p-4 border-[#eaeaea] w-full"
    >
      <img
        src="../assets/bell.svg"
        alt="notifications"
        class="h-[24px] w-[24px] cursor-pointer"
      />
      <p class="font-md text-[16px] text-black">Notifications</p>
    </div>

    <!-- Notifications List -->
    <div class="flex flex-col">
      <!-- Notification Item 1 -->
      <div
        class="flex flex-row gap-4 px-4 border-b-[1px] border-[#eaeaea] transition duration-200 cursor-pointer py-5 items-center"
      >
        <div
          class="w-[50px] h-[50px] flex bg-[#efefef] justify-center items-center rounded-full"
        >
          <img
            src="../assets/bell.svg"
            alt="notification"
            class="h-[20px] w-[20px] object-cover"
          />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[16px]">You don't have any notifications yet</p>
          <p class="text-[12px] font-semibold text-[#B2BEB5]"></p>
        </div>
      </div>

      <!-- Notification Item 2 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NotiDropdown",
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
