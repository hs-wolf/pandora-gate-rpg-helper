<script setup lang="ts">
import { useCharactersStore } from '@src/stores/characters';
import {
  EffectFieldsList,
  FixedOperators,
  LinkedOperators,
  PercentageOperators,
} from '@pandora-gate-rpg-helper/models';

const { t } = useI18n();
const charactersStore = useCharactersStore();
const { currentCharacter } = storeToRefs(charactersStore);

const showForm = ref(false);
const editing = ref(false);
const saveEdits = () => {
  charactersStore.updateCharacter(currentCharacter.value?.id ?? '', {
    fixedEffects: currentCharacter.value?.fixedEffects,
    linkedEffects: currentCharacter.value?.linkedEffects,
    percentageEffects: currentCharacter.value?.percentageEffects,
  });
  editing.value = false;
};

const addFixedEffect = () => {
  currentCharacter.value?.fixedEffects.push({
    target: EffectFieldsList.ATTRIBUTE_AGILITY,
    operator: FixedOperators.SUM,
    value: 1,
  });
};

const addLinkedEffect = () => {
  currentCharacter.value?.linkedEffects.push({
    target: EffectFieldsList.ATTRIBUTE_AGILITY,
    targetOperator: FixedOperators.SUM,
    field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
    fieldOperator: LinkedOperators.MULTIPLICATION,
    value: 1,
  });
};

const addPercentageEffect = () => {
  currentCharacter.value?.percentageEffects.push({
    target: EffectFieldsList.ATTRIBUTE_AGILITY,
    operator: PercentageOperators.SUM,
    value: 1,
  });
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
      <p>{{ t('characters-effects-form.title') }}</p>
      <icon-carbon:chevron-up v-if="showForm" />
      <icon-carbon:chevron-down v-else />
    </button>
    <div v-if="showForm" class="flex flex-col gap-4">
      <div v-if="editing" class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center gap-4">
            <div class="flex gap-2 text-primary-gray-light font-semibold">
              <p>{{ t('characters-effects-form.fixedEffects') }}</p>
              <p>{{ `(${currentCharacter.fixedEffects.length})` }}</p>
            </div>
            <button @click.prevent="addFixedEffect" class="text-primary-blue">
              <icon-carbon:add-alt class="text-xl" />
            </button>
          </div>
          <div
            v-for="(effect, index) in currentCharacter.fixedEffects"
            :key="index"
            class="flex items-center gap-2"
          >
            <div class="grid grid-cols-4 gap-[1px] w-full">
              <select
                v-model="effect.target"
                class="col-span-2 px-1 py-2 rounded-l bg-primary-gray"
              >
                <option v-for="field in EffectFieldsList" :value="field">
                  {{ t(`general.fields-list.${field}`) }}
                </option>
              </select>
              <select
                v-model="effect.operator"
                class="px-1 py-2 bg-primary-gray"
              >
                <option v-for="operator in FixedOperators" :value="operator">
                  {{ t(`general.operators.${operator.toLowerCase()}`) }}
                </option>
              </select>
              <input
                type="number"
                v-model="effect.value"
                class="p-2 bg-transparent border border-primary-gray rounded-r outline-none"
              />
            </div>
            <button
              @click.prevent="currentCharacter?.fixedEffects.splice(index, 1)"
            >
              <icon-carbon:trash-can
                class="shrink-0 text-primary-red text-xl"
              />
            </button>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center gap-2">
            <div class="flex gap-1 text-primary-gray-light font-semibold">
              <p>{{ t('characters-effects-form.linkedEffects') }}</p>
              <p>{{ `(${currentCharacter.linkedEffects.length})` }}</p>
            </div>
            <button @click.prevent="addLinkedEffect" class="text-primary-blue">
              <icon-carbon:add-alt class="text-xl" />
            </button>
          </div>
          <div
            v-for="(effect, index) in currentCharacter.linkedEffects"
            :key="index"
            class="flex items-center gap-2"
          >
            <div class="grid grid-cols-12 gap-[1px] w-full">
              <select
                v-model="effect.target"
                class="col-span-3 px-1 py-2 rounded-l bg-primary-gray"
              >
                <option v-for="field in EffectFieldsList" :value="field">
                  {{ t(`general.fields-list.${field}`) }}
                </option>
              </select>
              <select
                v-model="effect.targetOperator"
                class="col-span-2 px-1 py-2 bg-primary-gray"
              >
                <option v-for="operator in FixedOperators" :value="operator">
                  {{ t(`general.operators.${operator.toLowerCase()}`) }}
                </option>
              </select>
              <select
                v-model="effect.field"
                class="col-span-3 px-1 py-2 bg-primary-gray"
              >
                <option v-for="field in EffectFieldsList" :value="field">
                  {{ t(`general.fields-list.${field}`) }}
                </option>
              </select>
              <select
                v-model="effect.fieldOperator"
                class="col-span-2 px-1 py-2 bg-primary-gray"
              >
                <option v-for="operator in LinkedOperators" :value="operator">
                  {{ t(`general.operators.${operator.toLowerCase()}`) }}
                </option>
              </select>
              <input
                type="number"
                v-model="effect.value"
                class="col-span-2 p-2 bg-transparent border border-primary-gray rounded-r outline-none"
              />
            </div>
            <button
              @click.prevent="currentCharacter?.linkedEffects.splice(index, 1)"
            >
              <icon-carbon:trash-can
                class="shrink-0 text-primary-red text-xl"
              />
            </button>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center gap-4">
            <div class="flex gap-2 text-primary-gray-light font-semibold">
              <p>{{ t('characters-effects-form.percentageEffects') }}</p>
              <p>{{ `(${currentCharacter.percentageEffects.length})` }}</p>
            </div>
            <button
              @click.prevent="addPercentageEffect"
              class="text-primary-blue"
            >
              <icon-carbon:add-alt class="text-xl" />
            </button>
          </div>
          <div
            v-for="(effect, index) in currentCharacter.percentageEffects"
            :key="effect.target"
            class="flex items-center gap-2"
          >
            <div class="grid grid-cols-4 gap-[1px] w-full">
              <select
                v-model="effect.target"
                class="col-span-2 px-1 py-2 rounded-l bg-primary-gray"
              >
                <option v-for="field in EffectFieldsList" :value="field">
                  {{ t(`general.fields-list.${field}`) }}
                </option>
              </select>
              <select
                v-model="effect.operator"
                class="px-1 py-2 bg-primary-gray"
              >
                <option v-for="operator in FixedOperators" :value="operator">
                  {{ t(`general.operators.${operator.toLowerCase()}`) }}
                </option>
              </select>
              <input
                type="number"
                v-model="effect.value"
                class="p-2 bg-transparent border border-primary-gray rounded-r outline-none"
              />
            </div>
            <button
              @click.prevent="
                currentCharacter?.percentageEffects.splice(index, 1)
              "
            >
              <icon-carbon:trash-can
                class="shrink-0 text-primary-red text-xl"
              />
            </button>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <button class="self-end btn-green rounded" @click.prevent="saveEdits">
          <icon-carbon:save class="text-xl" />
        </button>
      </div>
      <div v-else class="flex flex-col gap-4">
        <div class="display-section">
          <h1 class="font-semibold">
            {{ t('characters-effects-form.fixedEffects') }}
          </h1>
          <div
            v-for="(effect, index) in currentCharacter?.fixedEffects"
            :key="index"
            class="flex items-center flex-wrap gap-2"
          >
            <h1>
              {{ t(`general.fields-list.${effect.target}`) }}
            </h1>
            <p>
              {{ t(`general.operators.${effect.operator.toLowerCase()}`) }}
            </p>
            <p>{{ effect.value }}</p>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <div class="display-section">
          <h1 class="font-semibold">
            {{ t('characters-effects-form.linkedEffects') }}
          </h1>
          <div
            v-for="(effect, index) in currentCharacter?.linkedEffects"
            :key="index"
            class="flex items-center flex-wrap gap-2"
          >
            <h1>
              {{ t(`general.fields-list.${effect.target}`) }}
            </h1>
            <p>
              {{
                t(`general.operators.${effect.targetOperator.toLowerCase()}`)
              }}
            </p>
            <p>({{ t(`general.fields-list.${effect.field}`) }}</p>
            <p>
              {{ t(`general.operators.${effect.fieldOperator.toLowerCase()}`) }}
            </p>
            <p>{{ effect.value }})</p>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <div class="display-section">
          <h1 class="font-semibold">
            {{ t('characters-effects-form.percentageEffects') }}
          </h1>
          <div
            v-for="(effect, index) in currentCharacter?.percentageEffects"
            :key="index"
            class="flex items-center flex-wrap gap-2"
          >
            <h1>
              {{ t(`general.fields-list.${effect.target}`) }}
            </h1>
            <p>
              {{ t(`general.operators.${effect.operator.toLowerCase()}`) }}
            </p>
            <p>{{ effect.value }}%</p>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <button
          class="self-end btn-blue rounded"
          @click.prevent="editing = true"
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
  @apply flex flex-col gap-2;
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
