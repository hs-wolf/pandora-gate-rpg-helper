<script setup lang="ts">
import { useLocalesStore } from '@stores/locales';

const localesStore = useLocalesStore();
</script>

<template>
  <div class="flex min-w-screen min-h-screen" :dir="localesStore.direction">
    <router-view />
  </div>
</template>
