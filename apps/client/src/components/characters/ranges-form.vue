<script setup lang="ts">
import { useCharactersStore } from '@src/stores/characters';
import { EffectFieldsList, Ranges } from '@pandora-gate-rpg-helper/models';

const { t } = useI18n();
const charactersStore = useCharactersStore();
const { currentCharacter } = storeToRefs(charactersStore);

const showForm = ref(false);
const editing = ref(false);
const saveEdits = () => {
  charactersStore.updateCharacter(currentCharacter.value?.id ?? '', {
    ranges: currentCharacter.value?.ranges,
  });
  editing.value = false;
};
</script>

<template>
  <div
    v-if="currentCharacter"
    class="flex flex-col gap-4 p-4 bg-primary-gray-dark rounded-md overflow-hidden"
  >
    <button
      class="flex justify-between items-center gap-2 font-semibold"
      @click.prevent="showForm = !showForm"
    >
      <p>{{ t('characters-ranges-form.title') }}</p>
      <icon-carbon:chevron-up v-if="showForm" />
      <icon-carbon:chevron-down v-else />
    </button>
    <div v-if="showForm" class="flex flex-col gap-4">
      <div v-if="editing" class="flex flex-col gap-4">
        <div
          v-for="field in Object.keys(currentCharacter.ranges).sort()"
          :key="field"
          class="form-section"
        >
          <h1>{{ t(`characters-ranges-form.${field}`) }}</h1>
          <input
            type="number"
            v-model="currentCharacter.ranges[field as keyof Ranges]"
            class="form-input"
          />
          <p class="ml-4">
            {{ currentCharacter.getFieldFinalValue(field as EffectFieldsList) }}
          </p>
        </div>
        <button class="self-end btn-green rounded" @click.prevent="saveEdits">
          <icon-carbon:save class="text-xl" />
        </button>
      </div>
      <div v-else class="flex flex-col gap-4">
        <div
          v-for="field in Object.keys(currentCharacter.ranges).sort()"
          :key="field"
          class="display-section"
        >
          <h1>{{ t(`characters-ranges-form.${field}`) }}</h1>
          <span class="text-sm font-normal">
            ({{ currentCharacter.ranges[field as keyof Ranges] }})
          </span>
          <p>
            {{ currentCharacter.getFieldFinalValue(field as EffectFieldsList) }}
          </p>
        </div>
        <button
          class="self-end btn-blue rounded"
          @click.prevent="editing = !editing"
        >
          <icon-carbon:edit class="text-xl" />
        </button>
      </div>
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
