<script setup lang="ts">
import { useCharactersStore } from '@src/stores/characters';

const props = defineProps<{ id: string }>();

const charactersStore = useCharactersStore();
const { charactersList } = storeToRefs(charactersStore);

const character = computed(() =>
  charactersList.value.find((character) => character?.id === props.id)
);
const editableName = ref(character.value?.name);

const editing = ref(false);

const save = () => {
  // call store here
  editing.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-4 lg:gap-8 w-full">
    <div class="flex justify-between items-center gap-2">
      <input
        v-if="editing"
        type="text"
        v-model="editableCharacter"
        class="editing-input"
      />
      <p v-else class="text-2xl font-bold">{{ character?.name }}</p>
      <button v-if="editing" @click.prevent="save">
        <icon-carbon:save class="text-primary-green" />
      </button>
      <button v-else @click.prevent="editing = true">
        <icon-carbon:edit class="text-primary-blue" />
      </button>
    </div>
    <p>
      {{ character?.guild ? character?.guild : 'No guild' }}
    </p>
    <!-- <p class="text-lg font-bold">{{ character?.elements }}</p> -->
    <!-- <p class="text-lg font-bold">{{ character?.jobs }}</p> -->
    <characters-basic-data-form :character="character!" />
    <characters-attributes-form :character="character!" />
    <characters-basic-stats-form :character="character!" />
    <characters-ranges-form :character="character!" />
    <characters-accuracies-form :character="character!" />
    <characters-physical-bonus-form :character="character!" />
    <characters-magical-bonus-form :character="character!" />
    <characters-effects-form :character="character!" />
  </div>
</template>

<style scoped lang="scss">
.editing-input {
  @apply px-2 py-1 bg-transparent border border-primary-gray rounded outline-none;
}
</style>
