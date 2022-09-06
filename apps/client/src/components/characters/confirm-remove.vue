<script setup lang="ts">
import { useCharactersStore } from '@src/stores/characters';

const { t } = useI18n();
const charactersStore = useCharactersStore();
const {
  currentCharacters,
  showConfirmRemoveDialog,
  removingCharacter,
  characterBeingRemoved,
} = storeToRefs(charactersStore);
</script>

<template>
  <div v-if="showConfirmRemoveDialog" class="modal">
    <div
      v-if="removingCharacter"
      class="card flex-col gap-2 max-w-dialog my-auto"
    >
      <div class="flex items-center gap-2">
        <icon-eos-icons:loading class="text-lg text-primary-red-dark" />
        <h1 class="text-lg text-primary-black">
          {{ t('characters-confirm-remove.title') }}
        </h1>
      </div>
    </div>
    <div v-else class="card flex-col gap-2 max-w-dialog my-auto">
      <div class="flex items-center gap-2">
        <icon-carbon:trash-can class="text-lg text-primary-red-dark" />
        <h1 class="text-lg text-primary-black">
          {{ t('characters-confirm-remove.title') }}
        </h1>
      </div>
      <i18n-t
        keypath="characters-confirm-remove.message"
        tag="p"
        scope="global"
        class="text-primary-black"
      >
        <template v-slot:name>
          <span class="font-bold">
            {{ currentCharacters.get(characterBeingRemoved)?.name ?? 'EMPTY' }}
          </span>
        </template>
      </i18n-t>
      <div class="flex items-center gap-2 mt-4">
        <button
          class="btn-red gap-2 flex-1"
          @click.prevent="
            charactersStore.removeCharacter(characterBeingRemoved)
          "
        >
          {{ t('general.yes') }}
        </button>
        <button
          class="btn-gray gap-2 flex-1"
          @click.prevent="charactersStore.toggleConfirmRemoveDialog(false, '')"
        >
          {{ t('general.no') }}
        </button>
      </div>
    </div>
  </div>
</template>
