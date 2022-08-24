<script setup lang="ts">
import { useDataStore } from '@stores/data';

const { t } = useI18n();
const dataStore = useDataStore();
const { currentElements } = storeToRefs(dataStore);

useHead({ title: computed(() => t('data.head-title')) });
</script>

<template>
  <div class="flex flex-col gap-8">
    <h1 class="text-2xl font-semibold">
      {{ t('data.elements', [currentElements.length]) }}
    </h1>
    <div class="flex flex-col gap-4">
      <elements-form
        v-if="currentElements.length"
        v-for="element in currentElements"
        :key="element.id"
        :element="element"
      />
    </div>
  </div>
</template>
