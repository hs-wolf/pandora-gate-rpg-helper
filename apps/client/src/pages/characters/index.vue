<script setup lang="ts">
import { router } from '@src/plugins/router';
import { useCharactersStore } from '@src/stores/characters';
import { CharacterCreateBody } from '@pandora-gate-rpg-helper/models';

const { t } = useI18n();
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
          currentCharacters.size
            ? t('characters.yours', [currentCharacters.size])
            : t('characters.none')
        }}
      </p>
      <div
        v-if="creatingCharacter"
        class="flex flex-col lg:flex-row justify-end items-center gap-2 w-full"
      >
        <icon-eos-icons:loading />
        <p>{{ t('characters.creating') }}</p>
      </div>
      <div v-else class="flex justify-end items-center gap-2 w-full">
        <input
          type="text"
          :placeholder="t('characters.name')"
          v-model="characterName"
          class="form-input"
        />
        <button class="lg:w-auto btn-green" @click.prevent="createCharacter">
          <icon-carbon:add />
          <p class="hidden lg:block text-sm">{{ t('characters.new') }}</p>
        </button>
      </div>
    </div>
    <hr class="border-primary-gray-dark" />
    <div v-if="currentCharacters.size" class="flex flex-col gap-4">
      <div
        v-for="character in currentCharacters.values()"
        :key="character?.id"
        class="flex justify-between items-center gap-2 rounded"
      >
        <button
          class="btn-gray justify-start gap-2 w-full break-all"
          @click.prevent="router.push(`/characters/${character?.id}`)"
        >
          {{ character?.name }}
        </button>
        <button
          class="btn-blue gap-2"
          @click.prevent="router.push(`/characters/${character?.id}/edit`)"
        >
          <icon-carbon:edit />
        </button>
        <button
          class="btn-red gap-2"
          @click.prevent="
            charactersStore.toggleConfirmRemoveDialog(true, character?.id)
          "
        >
          <icon-carbon:trash-can />
        </button>
      </div>
    </div>
    <characters-confirm-remove />
  </div>
</template>

<style scoped lang="scss">
.form-input {
  @apply w-full lg:w-auto lg:min-w-dialog p-2 bg-transparent border border-primary-gray rounded text-sm text-primary-white placeholder:text-primary-gray outline-none;
}
</style>
