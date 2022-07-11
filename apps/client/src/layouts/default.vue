<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center min-w-screen min-h-screen">
    <navbar />
    <div class="flex-1 flex w-full desktop:max-w-page p-4 desktop:p-8">
      <router-view />
    </div>
  </div>
</template>
