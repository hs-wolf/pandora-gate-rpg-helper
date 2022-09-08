<script setup lang="ts">
import { router } from '@plugins/router';
import { useDataStore } from '@stores/data';

const { t } = useI18n();
const dataStore = useDataStore();
const { currentElements } = storeToRefs(dataStore);

useHead({ title: computed(() => t('data.head-title')) });
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex justify-between gap-2">
      <h1 class="text-2xl font-semibold">
        {{ t('data.elements', [currentElements.length]) }}
      </h1>
      <button class="btn-gray rounded" @click.prevent="router.push('/data')">
        <icon-carbon:view class="text-xl" />
      </button>
    </div>
    <div class="flex flex-col gap-4">
      <data-elements-form
        v-if="currentElements.length"
        v-for="element in currentElements"
        :key="element.id"
        :element="element"
      />
    </div>
  </div>
</template>
