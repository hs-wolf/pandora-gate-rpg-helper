<script setup lang="ts">
import {
  Character,
  EffectFieldsList,
  MagicalBonus,
} from '@pandora-gate-rpg-helper/models';

const props = defineProps<{ character: Character }>();

const { t } = useI18n();

const showData = ref(false);
const editing = ref(false);

const editableMagicalBonus = computed(() => props.character.magicalBonus);

const save = () => {
  // Call store here.
  editing.value = false;
};
</script>

<template>
  <div
    class="flex flex-col border border-primary-gray-dark rounded-md overflow-hidden"
  >
    <button
      class="flex items-center justify-between gap-2 px-4 py-2 bg-primary-gray-dark"
      @click.prevent="showData = !showData"
    >
      <p class="text-sm font-semibold">
        {{ t('characters-magical-bonus-form.title') }}
      </p>
      <icon-carbon:chevron-up v-if="showData" class="text-xl" />
      <icon-carbon:chevron-down v-else class="text-xl" />
    </button>
    <div v-if="showData" class="flex flex-col p-4 gap-4">
      <div class="flex flex-col gap-2">
        <div
          v-for="(key, index) in Object.keys(editableMagicalBonus)"
          :key="index"
          class="item-simple"
        >
          <h1 class="col-span-2">
            {{ t(`characters-magical-bonus-form.${key}`) }}
          </h1>
          <p v-if="editing" class="col-span-2 flex items-center gap-4">
            <input
              type="number"
              v-model="editableMagicalBonus[key as keyof MagicalBonus]"
              class="editing-input w-full"
            />
            <span>
              {{ character.getFieldFinalValue(key as EffectFieldsList) }}
            </span>
          </p>
          <p v-else class="col-span-2 flex items-center gap-2">
            <span class="text-sm font-normal">
              ({{ editableMagicalBonus[key as keyof MagicalBonus] }})
            </span>
            <span>
              {{ character.getFieldFinalValue(key as EffectFieldsList) }}
            </span>
          </p>
        </div>
      </div>
      <div v-if="editing" class="flex justify-end">
        <button class="btn-green" @click.prevent="save">
          <icon-carbon:save />
        </button>
      </div>
      <div v-else class="flex justify-end">
        <button class="btn-blue" @click.prevent="editing = !editing">
          <icon-carbon:edit />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-simple {
  @apply grid grid-cols-4 items-center gap-2;
  h1 {
    @apply text-sm text-primary-gray-light;
  }
  p {
    @apply font-semibold whitespace-nowrap;
  }
}
.editing-input {
  @apply px-2 py-1 bg-transparent border border-primary-gray rounded outline-none;
}
</style>
