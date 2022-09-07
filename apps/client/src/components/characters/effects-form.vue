<script setup lang="ts">
import {
  Character,
  EffectFieldsList,
  FixedOperators,
  LinkedOperators,
  PercentageOperators,
} from '@pandora-gate-rpg-helper/models';

const props = defineProps<{ character: Character }>();

const { t } = useI18n();

const editableFixedEffects = computed(() => props.character.fixedEffects);
const editableLinkedEffects = computed(() => props.character.linkedEffects);
const editablePercentageEffects = computed(
  () => props.character.percentageEffects
);
const editingEffects = ref(false);
const saveEffects = () => {
  // Call store here
  editingEffects.value = false;
};

const addFixedEffect = () => {
  editableFixedEffects.value.push({
    target: EffectFieldsList.STRENGTH,
    operator: FixedOperators.SUM,
    value: 1,
  });
};

const addLinkedEffect = () => {
  editableLinkedEffects.value.push({
    target: EffectFieldsList.STRENGTH,
    targetOperator: FixedOperators.SUM,
    field: EffectFieldsList.AGILITY,
    fieldOperator: LinkedOperators.MULTIPLICATION,
    value: 1,
  });
};

const addPercentageEffect = () => {
  editablePercentageEffects.value.push({
    target: EffectFieldsList.STRENGTH,
    operator: PercentageOperators.SUM,
    value: 1,
  });
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
        {{ t('characters-effects-form.title') }}
      </p>
      <icon-carbon:chevron-up v-if="showData" class="text-xl" />
      <icon-carbon:chevron-down v-else class="text-xl" />
    </button>
    <div v-if="showData" class="flex flex-col gap-4 p-4">
      <div v-if="editingEffects" class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center gap-2">
            <div class="flex gap-1 text-primary-gray-light text-sm">
              <p>{{ t('characters-effects-form.fixedEffects') }}</p>
              <p>{{ `(${editableFixedEffects.length})` }}</p>
            </div>
            <button @click.prevent="addFixedEffect" class="text-primary-blue">
              <icon-carbon:add-alt />
            </button>
          </div>
          <div
            v-for="(effect, index) in editableFixedEffects"
            :key="index"
            class="flex flex-col gap-2"
          >
            <div class="flex items-center gap-2">
              <div class="grid grid-cols-4 gap-[1px] w-full">
                <select
                  v-model="effect.target"
                  class="col-span-2 p-1 rounded-l text-primary-black bg-primary-gray-light"
                >
                  <option v-for="field in EffectFieldsList" :value="field">
                    {{ t(`characters-effects-form.fields-list.${field}`) }}
                  </option>
                </select>
                <select
                  v-model="effect.operator"
                  class="p-1 text-primary-black bg-primary-gray-light"
                >
                  <option v-for="operator in FixedOperators" :value="operator">
                    {{
                      t(
                        `characters-effects-form.operators.${operator.toLowerCase()}`
                      )
                    }}
                  </option>
                </select>
                <input
                  type="number"
                  v-model="effect.value"
                  class="px-2 py-1 bg-transparent border border-primary-gray-light rounded-r outline-none"
                />
              </div>
              <button @click.prevent="editableFixedEffects.splice(index, 1)">
                <icon-carbon:trash-can class="shrink-0 text-primary-red" />
              </button>
            </div>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center gap-2">
            <div class="flex gap-1 text-primary-gray-light text-sm">
              <p>{{ t('characters-effects-form.linkedEffects') }}</p>
              <p>{{ `(${editableLinkedEffects.length})` }}</p>
            </div>
            <button @click.prevent="addLinkedEffect" class="text-primary-blue">
              <icon-carbon:add-alt />
            </button>
          </div>
          <div
            v-for="(effect, index) in editableLinkedEffects"
            :key="index"
            class="flex flex-col gap-2"
          >
            <div class="flex items-center gap-2">
              <div class="grid grid-cols-12 gap-[1px]">
                <select
                  v-model="effect.target"
                  class="col-span-3 p-1 rounded-l bg-primary-gray-light text-primary-black"
                >
                  <option v-for="field in EffectFieldsList" :value="field">
                    {{ t(`characters-effects-form.fields-list.${field}`) }}
                  </option>
                </select>
                <select
                  v-model="effect.targetOperator"
                  class="col-span-2 p-1 bg-primary-gray-light text-primary-black"
                >
                  <option v-for="operator in FixedOperators" :value="operator">
                    {{
                      t(
                        `characters-effects-form.operators.${operator.toLowerCase()}`
                      )
                    }}
                  </option>
                </select>
                <select
                  v-model="effect.field"
                  class="col-span-3 p-1 bg-primary-gray-light text-primary-black"
                >
                  <option v-for="field in EffectFieldsList" :value="field">
                    {{ t(`characters-effects-form.fields-list.${field}`) }}
                  </option>
                </select>
                <select
                  v-model="effect.fieldOperator"
                  class="col-span-2 p-1 bg-primary-gray-light text-primary-black"
                >
                  <option v-for="operator in LinkedOperators" :value="operator">
                    {{
                      t(
                        `characters-effects-form.operators.${operator.toLowerCase()}`
                      )
                    }}
                  </option>
                </select>
                <input
                  type="number"
                  v-model="effect.value"
                  class="col-span-2 px-2 py-1 bg-transparent border border-primary-gray-light rounded-r outline-none"
                />
              </div>
              <button @click.prevent="editableLinkedEffects.splice(index, 1)">
                <icon-carbon:trash-can class="shrink-0 text-primary-red" />
              </button>
            </div>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center gap-2">
            <div class="flex gap-1 text-primary-gray-light text-sm">
              <p>{{ t('characters-effects-form.percentageEffects') }}</p>
              <p>{{ `(${editablePercentageEffects.length})` }}</p>
            </div>
            <button
              @click.prevent="addPercentageEffect"
              class="text-primary-blue"
            >
              <icon-carbon:add-alt />
            </button>
          </div>
          <div
            v-for="(effect, index) in editablePercentageEffects"
            :key="effect.target"
            class="flex flex-col gap-2"
          >
            <div class="flex items-center gap-2">
              <div class="grid grid-cols-4 gap-[1px] w-full">
                <select
                  v-model="effect.target"
                  class="col-span-2 p-1 rounded-l text-primary-black bg-primary-gray-light"
                >
                  <option v-for="field in EffectFieldsList" :value="field">
                    {{ t(`characters-effects-form.fields-list.${field}`) }}
                  </option>
                </select>
                <select
                  v-model="effect.operator"
                  class="p-1 text-primary-black bg-primary-gray-light"
                >
                  <option v-for="operator in FixedOperators" :value="operator">
                    {{
                      t(
                        `characters-effects-form.operators.${operator.toLowerCase()}`
                      )
                    }}
                  </option>
                </select>
                <input
                  type="number"
                  v-model="effect.value"
                  class="px-2 py-1 bg-transparent border border-primary-gray-light rounded-r outline-none"
                />
              </div>
              <button
                @click.prevent="editablePercentageEffects.splice(index, 1)"
              >
                <icon-carbon:trash-can class="shrink-0 text-primary-red" />
              </button>
            </div>
          </div>
        </div>
        <hr class="border-primary-gray" />
      </div>
      <div v-else class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <h1 class="text-primary-gray-light text-sm">
            {{ t('characters-effects-form.fixedEffects') }}
          </h1>
          <div
            v-for="(effect, index) in editableFixedEffects"
            :key="index"
            class="flex items-center gap-2"
          >
            <p class="font-semibold">
              {{ t(`characters-effects-form.fields-list.${effect.target}`) }}
            </p>
            <p>
              {{
                t(
                  `characters-effects-form.operators.${effect.operator.toLowerCase()}`
                )
              }}
            </p>
            <p>{{ effect.value }}</p>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <div class="flex flex-col gap-2">
          <h1 class="text-primary-gray-light text-sm">
            {{ t('characters-effects-form.linkedEffects') }}
          </h1>
          <div
            v-for="(effect, index) in editableLinkedEffects"
            :key="index"
            class="flex items-center gap-2"
          >
            <p class="font-semibold">
              {{ t(`characters-effects-form.fields-list.${effect.target}`) }}
            </p>
            <p>
              {{
                t(
                  `characters-effects-form.operators.${effect.targetOperator.toLowerCase()}`
                )
              }}
            </p>
            <p>
              ({{ t(`characters-effects-form.fields-list.${effect.field}`) }}
            </p>
            <p>
              {{
                t(
                  `characters-effects-form.operators.${effect.fieldOperator.toLowerCase()}`
                )
              }}
            </p>
            <p>{{ effect.value }})</p>
          </div>
        </div>
        <hr class="border-primary-gray" />
        <div class="flex flex-col gap-2">
          <h1 class="text-primary-gray-light text-sm">
            {{ t('characters-effects-form.percentageEffects') }}
          </h1>
          <div
            v-for="(effect, index) in editablePercentageEffects"
            :key="index"
            class="flex items-center gap-2"
          >
            <p class="font-semibold">
              {{ t(`characters-effects-form.fields-list.${effect.target}`) }}
            </p>
            <p>
              {{
                t(
                  `characters-effects-form.operators.${effect.operator.toLowerCase()}`
                )
              }}
            </p>
            <p>{{ effect.value }}%</p>
          </div>
        </div>
        <hr class="border-primary-gray" />
      </div>
      <div v-if="editingEffects" class="flex justify-end items-center gap-2">
        <button class="btn-green" @click.prevent="saveEffects">
          <icon-carbon:save />
        </button>
      </div>
      <div v-else class="flex justify-end items-center gap-2">
        <button class="btn-blue" @click.prevent="editingEffects = true">
          <icon-carbon:edit />
        </button>
      </div>
    </div>
  </div>
</template>
