<script setup lang="ts">
import { useLocalesStore } from '@stores/locales';

const localesStore = useLocalesStore();
</script>

<template>
  <router-view :dir="localesStore.direction" />
</template>
