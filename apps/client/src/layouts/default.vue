<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center min-w-screen min-h-screen">
    <navbar />
    <div
      class="flex-1 flex flex-col w-full lg:max-w-page p-4 lg:p-8 mt-[3.5rem] lg:mt-[4.5rem]"
    >
      <router-view />
    </div>
  </div>
</template>
