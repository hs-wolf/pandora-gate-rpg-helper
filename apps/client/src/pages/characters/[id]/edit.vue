<script setup lang="ts">
defineProps<{ id: string }>();
</script>

<template>
  <div class="flex flex-col gap-4 lg:gap-8 w-full">
    {{ id }}
  </div>
</template>
