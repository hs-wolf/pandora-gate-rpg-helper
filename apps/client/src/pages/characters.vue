<script setup lang="ts">
import { CharacterCreateBody } from '@pandora-gate-rpg-helper/models';
import { useCharactersStore } from '@src/stores/characters';

const charactersStore = useCharactersStore();
const { currentCharacters, creatingCharacter } = storeToRefs(charactersStore);

const characterName = ref('');

const createCharacter = async () => {
  if (!characterName.value) {
    return;
  }
  const body: CharacterCreateBody = {
    name: characterName.value,
  };
  await charactersStore.createCharacter(body);
  characterName.value = '';
};

onBeforeMount(async () => {
  await charactersStore.getUserCharacters();
});
</script>

<template>
  <div class="flex flex-col gap-4 lg:gap-8 w-full">
    <div class="flex flex-col lg:flex-row justify-between items-center gap-4">
      <p class="lg:whitespace-nowrap">
        {{
          currentCharacters.length
            ? `You have ${currentCharacters.length} characters.`
            : 'You have no characters yet, create one.'
        }}
      </p>
      <div
        v-if="creatingCharacter"
        class="flex flex-col lg:flex-row justify-end items-center gap-2 w-full"
      >
        <icon-eos-icons:loading />
        <p>Creating character</p>
      </div>
      <div
        v-else
        class="flex flex-col lg:flex-row justify-end items-center gap-2 w-full"
      >
        <input
          type="text"
          placeholder="Character name..."
          v-model="characterName"
          class="form-input pl-3 pr-8"
        />
        <button
          class="shrink-0 w-full lg:w-auto btn-green"
          @click.prevent="createCharacter"
        >
          Create new
        </button>
      </div>
    </div>
    <div v-if="currentCharacters.length" class="flex flex-col gap-4">
      <div
        v-for="character in currentCharacters"
        :key="character.id"
        class="flex justify-between items-center p-2 border border-primary-gray-dark rounded"
      >
        <p>{{ character.name }}</p>
        <button class="btn-blue">Edit</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-input {
  @apply w-full lg:w-auto py-2 bg-transparent border border-primary-gray rounded text-primary-white placeholder:text-primary-gray outline-none;
}
</style>
