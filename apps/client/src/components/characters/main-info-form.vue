<script setup lang="ts">
import { useCharactersStore } from '@src/stores/characters';

const { t } = useI18n();
const charactersStore = useCharactersStore();
const { currentCharacter } = storeToRefs(charactersStore);

const editing = ref(false);
const saveEdits = () => {
  if (!currentCharacter.value?.name) {
    return;
  }
  charactersStore.updateCharacter(currentCharacter.value?.id ?? '', {
    name: currentCharacter.value?.name,
    guild: currentCharacter.value?.guild,
  });
  editing.value = false;
};
</script>

<template>
  <div v-if="currentCharacter" class="flex flex-col">
    <div v-if="editing" class="flex flex-col gap-4">
      <div class="grid grid-cols-5 items-center">
        <h1>{{ t('characters-main-info-form.name') }}</h1>
        <input
          type="text"
          v-model="currentCharacter.name"
          class="form-input col-span-4 rounded"
        />
      </div>
      <div class="grid grid-cols-5 items-center">
        <h1>{{ t('characters-main-info-form.guild') }}</h1>
        <input
          type="text"
          v-model="currentCharacter.guild"
          class="form-input col-span-4 rounded"
        />
      </div>
      <div class="flex justify-end">
        <button
          v-if="editing"
          class="btn-green rounded"
          @click.prevent="saveEdits"
        >
          <icon-carbon:save class="text-xl" />
        </button>
      </div>
    </div>
    <div v-else class="flex flex-col gap-4">
      <div class="flex justify-between gap-2">
        <p class="text-2xl font-bold">{{ currentCharacter.name }}</p>
        <button class="btn-blue rounded" @click.prevent="editing = true">
          <icon-carbon:edit class="text-xl" />
        </button>
      </div>
      <p>
        🔰
        {{
          currentCharacter.guild.length
            ? currentCharacter.guild
            : t('characters-main-info-form.no-guild')
        }}
      </p>
      <p class="text-primary-gray-light">
        {{
          currentCharacter.elements.length
            ? currentCharacter.elements.join(', ')
            : t('characters-main-info-form.no-element')
        }}
      </p>
      <p class="text-primary-gray-light">
        {{
          currentCharacter.jobs.length
            ? currentCharacter.jobs.join(', ')
            : t('characters-main-info-form.no-job')
        }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-section {
  @apply flex items-center;
  h1 {
    @apply p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap;
  }
  p {
    @apply font-semibold;
  }
  span {
    @apply text-xs;
  }
  input {
    @apply rounded-r;
  }
}
.display-section {
  @apply flex items-center gap-2;
  h1 {
    @apply text-primary-gray-light whitespace-nowrap;
  }
  p {
    @apply font-semibold;
  }
  span {
    @apply text-xs;
  }
}
.form-input {
  @apply w-full p-2 bg-transparent border border-primary-gray outline-none;
}
</style>
