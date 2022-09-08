<route lang="yaml">
meta:
  requiresAuth: true
</route>

<script setup lang="ts">
import { useCharactersStore } from '@src/stores/characters';

const props = defineProps<{ id: string }>();

const charactersStore = useCharactersStore();

onBeforeMount(() => {
  charactersStore.selectCharacter(props.id);
});
</script>

<template>
  <div class="flex flex-col gap-4 lg:gap-8 w-full">
    <characters-main-info-form />
    <characters-basic-data-form />
    <characters-attributes-form />
    <characters-basic-stats-form />
    <characters-ranges-form />
    <characters-accuracies-form />
    <characters-physical-bonus-form />
    <characters-magical-bonus-form />
    <characters-expertises-form />
    <characters-effects-form />
    <characters-formulas-form />
  </div>
</template>
