<script setup lang="ts">
import {
  Attributes,
  Character,
  EffectFieldsList,
} from '@pandora-gate-rpg-helper/models';

const props = defineProps<{ character: Character }>();

const { t } = useI18n();

const editableAttributes = computed(() => props.character.attributes);
const editingAttributes = ref(false);
const saveAttributes = () => {
  //call store here
  editingAttributes.value = false;
};

const showData = ref(false);
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
        {{ t('characters-attributes-form.title') }}
      </p>
      <icon-carbon:chevron-up v-if="showData" class="text-xl" />
      <icon-carbon:chevron-down v-else class="text-xl" />
    </button>
    <div v-if="showData" class="flex flex-col gap-4 p-4">
      <div
        v-for="attribute in Object.keys(character.attributes).sort()"
        :key="attribute"
        class="grid grid-cols-3 gap-4"
      >
        <div class="item-simple col-span-2">
          <icon-iconoir:gym
            v-if="attribute === EffectFieldsList.STRENGTH"
            class="text-primary-green shrink-0"
          />
          <icon-mdi:run-fast
            v-else-if="attribute === EffectFieldsList.AGILITY"
            class="text-primary-green shrink-0"
          />
          <icon-fa-solid:hand-sparkles
            v-else-if="attribute === EffectFieldsList.DEXTERITY"
            class="text-primary-green shrink-0"
          />
          <icon-ic:baseline-health-and-safety
            v-else-if="attribute === EffectFieldsList.VITALITY"
            class="text-primary-green shrink-0"
          />
          <icon-ri:mental-health-line
            v-else-if="attribute === EffectFieldsList.SPIRIT"
            class="text-primary-green shrink-0"
          />
          <icon-tabler:clover
            v-else-if="attribute === EffectFieldsList.LUCK"
            class="text-primary-green shrink-0"
          />
          <h1>{{ t(`characters-attributes-form.${attribute}.acronym`) }}</h1>
          <p v-if="editingAttributes" class="flex items-center gap-2">
            <input
              type="number"
              v-model="editableAttributes[attribute as keyof Attributes]"
              class="w-1/2 p-1 bg-transparent border border-primary-gray rounded outline-none"
            />
            <span>
              {{ character.getFieldFinalValue(attribute as EffectFieldsList) }}
            </span>
          </p>
          <p v-else class="flex items-center gap-1">
            <span class="text-sm font-normal">
              ({{ editableAttributes[attribute as keyof Attributes] }})
            </span>
            <span>
              {{ character.getFieldFinalValue(attribute as EffectFieldsList) }}
            </span>
          </p>
        </div>
        <div class="item-simple">
          <div class="item-simple">
            <h1>{{ t('characters-attributes-form.modificator.acronym') }}</h1>
            <p>
              {{ character.getAttributeMod(attribute as keyof Attributes) }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="editingAttributes" class="flex justify-end items-center gap-2">
        <button class="btn-green" @click.prevent="saveAttributes">
          <icon-carbon:save />
        </button>
      </div>
      <div v-else class="flex justify-end items-center gap-2">
        <button class="btn-blue" @click.prevent="editingAttributes = true">
          <icon-carbon:edit />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-simple {
  @apply flex items-center gap-2;
  h1 {
    @apply text-sm text-primary-gray-light;
  }
  p {
    @apply font-semibold break-all;
  }
}
</style>
