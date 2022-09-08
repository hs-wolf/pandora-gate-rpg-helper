<script setup lang="ts">
import { useAuthStore } from '@src/stores/auth';
import { useCharactersStore } from '@src/stores/characters';
import { CharacterCreateBody } from '@pandora-gate-rpg-helper/models';

const { t } = useI18n();
const authStore = useAuthStore();
const charactersStore = useCharactersStore();
const { charactersList, creatingCharacter } = storeToRefs(charactersStore);

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
</script>

<template>
  <div class="flex flex-col gap-4 lg:gap-8 w-full">
    <div
      v-if="authStore.currentUser"
      class="flex flex-col lg:flex-row justify-between items-center gap-4"
    >
      <p class="text-sm">
        {{
          charactersList.size
            ? t('characters.yours', [charactersList.size])
            : t('characters.none')
        }}
      </p>
      <div
        v-if="creatingCharacter"
        class="flex flex-col lg:flex-row justify-end items-center gap-2"
      >
        <icon-eos-icons:loading />
        <p>{{ t('characters.creating') }}</p>
      </div>
      <div v-else class="flex justify-end w-full lg:w-auto">
        <input
          type="text"
          :placeholder="t('characters.name')"
          v-model="characterName"
          class="form-input w-full rounded-l"
        />
        <button
          class="btn-green shrink-0 rounded-r"
          @click.prevent="createCharacter"
        >
          <icon-carbon:add class="text-lg" />
          <p class="hidden lg:block">{{ t('characters.new') }}</p>
        </button>
      </div>
    </div>
    <p v-else class="py-2 text-sm">
      {{ t('characters.no-auth') }}
    </p>
    <hr class="border-primary-gray-dark" />
    <div
      v-if="authStore.currentUser && charactersList.size"
      class="flex flex-col gap-4"
    >
      <div
        v-for="character in charactersList.values()"
        :key="character?.id"
        class="flex justify-between rounded shadow overflow-hidden"
      >
        <router-link
          :to="`/characters/${character?.id}`"
          class="btn-gray justify-start w-full break-all rounded-none"
        >
          {{ character?.name }}
        </router-link>
        <button
          class="btn-red rounded-none"
          @click.prevent="
            charactersStore.toggleConfirmRemoveDialog(true, character?.id)
          "
        >
          <icon-carbon:trash-can class="text-lg" />
        </button>
      </div>
    </div>
    <characters-confirm-remove />
  </div>
</template>

<style scoped lang="scss">
.form-input {
  @apply w-full p-2 bg-transparent border border-primary-gray outline-none;
}
</style>
