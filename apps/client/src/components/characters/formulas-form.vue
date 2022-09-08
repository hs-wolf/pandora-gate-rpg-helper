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
    fixedFormulas: currentCharacter.value?.fixedFormulas,
    linkedFormulas: currentCharacter.value?.linkedFormulas,
    percentageFormulas: currentCharacter.value?.percentageFormulas,
  });
  editing.value = false;
};

const addFixedFormula = () => {
  currentCharacter.value?.fixedFormulas.push({
    target: EffectFieldsList.STRENGTH,
    operator: FixedOperators.SUM,
    value: 1,
  });
};

const addLinkedFormula = () => {
  currentCharacter.value?.linkedFormulas.push({
    target: EffectFieldsList.STRENGTH,
    targetOperator: FixedOperators.SUM,
    field: EffectFieldsList.AGILITY,
    fieldOperator: LinkedOperators.MULTIPLICATION,
    value: 1,
  });
};

const addPercentageformula = () => {
  currentCharacter.value?.percentageFormulas.push({
    target: EffectFieldsList.STRENGTH,
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
      <p>{{ t('characters-formulas-form.title') }}</p>
      <icon-carbon:chevron-up v-if="showForm" />
      <icon-carbon:chevron-down v-else />
    </button>
    <div v-if="showForm" class="flex flex-col gap-4">
      <div v-if="editing" class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center gap-4">
            <div class="flex gap-2 text-primary-gray-light">
              <p>{{ t('characters-formulas-form.fixedEffects') }}</p>
              <p>{{ `(${currentCharacter.fixedFormulas.length})` }}</p>
            </div>
            <button @click.prevent="addFixedFormula" class="text-primary-blue">
              <icon-carbon:add-alt class="text-xl" />
            </button>
          </div>
          <div
            v-for="(effect, index) in currentCharacter.fixedFormulas"
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
              @click.prevent="currentCharacter?.fixedFormulas.splice(index, 1)"
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
            <div class="flex gap-1 text-primary-gray-light">
              <p>{{ t('characters-formulas-form.linkedEffects') }}</p>
              <p>{{ `(${currentCharacter.linkedFormulas.length})` }}</p>
            </div>
            <button @click.prevent="addLinkedFormula" class="text-primary-blue">
              <icon-carbon:add-alt class="text-xl" />
            </button>
          </div>
          <div
            v-for="(effect, index) in currentCharacter.linkedFormulas"
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
              @click.prevent="currentCharacter?.linkedFormulas.splice(index, 1)"
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
            <div class="flex gap-2 text-primary-gray-light">
              <p>{{ t('characters-formulas-form.percentageEffects') }}</p>
              <p>{{ `(${currentCharacter.percentageFormulas.length})` }}</p>
            </div>
            <button
              @click.prevent="addPercentageformula"
              class="text-primary-blue"
            >
              <icon-carbon:add-alt class="text-xl" />
            </button>
          </div>
          <div
            v-for="(effect, index) in currentCharacter.percentageFormulas"
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
                currentCharacter?.percentageFormulas.splice(index, 1)
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
        <div class="flex flex-col gap-2">
          <h1 class="text-primary-gray-light">
            {{ t('characters-formulas-form.fixedEffects') }}
          </h1>
          <div
            v-for="(effect, index) in currentCharacter?.fixedFormulas"
            :key="index"
            class="flex items-center gap-2"
          >
            <p class="font-semibold">
              {{ t(`general.fields-list.${effect.target}`) }}
            </p>
            <p>
              {{ t(`general.operators.${effect.operator.toLowerCase()}`) }}
            </p>
            <p>{{ effect.value }}</p>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <div class="flex flex-col gap-2">
          <h1 class="text-primary-gray-light">
            {{ t('characters-formulas-form.linkedEffects') }}
          </h1>
          <div
            v-for="(effect, index) in currentCharacter?.linkedFormulas"
            :key="index"
            class="flex items-center gap-2"
          >
            <p class="font-semibold">
              {{ t(`general.fields-list.${effect.target}`) }}
            </p>
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
        <div class="flex flex-col gap-2">
          <h1 class="text-primary-gray-light">
            {{ t('characters-formulas-form.percentageEffects') }}
          </h1>
          <div
            v-for="(effect, index) in currentCharacter?.percentageFormulas"
            :key="index"
            class="flex items-center gap-2"
          >
            <p class="font-semibold">
              {{ t(`general.fields-list.${effect.target}`) }}
            </p>
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
