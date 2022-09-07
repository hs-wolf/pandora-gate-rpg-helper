<script setup lang="ts">
import { Character, EffectFieldsList } from '@pandora-gate-rpg-helper/models';

const props = defineProps<{ character: Character }>();

const { t } = useI18n();

const showData = ref(true);
const editing = ref(false);

const editableBasicData = computed(() => props.character.basicData);

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
        {{ t('characters-basic-data.title') }}
      </p>
      <icon-carbon:chevron-up v-if="showData" class="text-xl" />
      <icon-carbon:chevron-down v-else class="text-xl" />
    </button>
    <div v-if="showData" class="flex flex-col p-4 gap-4">
      <div v-if="editing" class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-2">
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.currentHP') }}</h1>
            <input
              type="number"
              v-model="editableBasicData.currentHP"
              class="editing-input w-full"
            />
          </div>
          <div class="item-simple">
            <h1>
              {{ t('characters-basic-data.maxHP') }}
            </h1>
            <input
              type="number"
              v-model="editableBasicData.maxHP"
              class="editing-input w-full"
            />
            <p>
              {{ character.getFieldFinalValue(EffectFieldsList.MAX_HP) }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="item-simple">
            <h1>
              {{ t('characters-basic-data.currentMP') }}
            </h1>
            <input
              type="number"
              v-model="editableBasicData.currentMP"
              class="editing-input w-full"
            />
          </div>
          <div class="item-simple">
            <h1>
              {{ t('characters-basic-data.maxMP') }}
            </h1>
            <input
              type="number"
              v-model="editableBasicData.maxMP"
              class="editing-input w-full"
            />
            <p>
              {{ character.getFieldFinalValue(EffectFieldsList.MAX_MP) }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="item-simple">
            <h1>
              {{ t('characters-basic-data.currentSP') }}
            </h1>
            <input
              type="number"
              v-model="editableBasicData.currentSP"
              class="editing-input w-full"
            />
          </div>
          <div class="item-simple">
            <h1>
              {{ t('characters-basic-data.maxSP') }}
            </h1>
            <input
              type="number"
              v-model="editableBasicData.maxSP"
              class="editing-input w-full"
            />
            <p>
              {{ character.getFieldFinalValue(EffectFieldsList.MAX_SP) }}
            </p>
          </div>
        </div>
        <div class="item-simple">
          <h1>
            {{ t('characters-basic-data.level') }}
          </h1>
          <input
            type="number"
            v-model="editableBasicData.level"
            class="editing-input w-full"
          />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="item-simple">
            <h1>
              {{ t('characters-basic-data.exp') }}
            </h1>
            <input
              type="number"
              v-model="editableBasicData.exp"
              class="editing-input w-full"
            />
          </div>
          <div class="item-simple">
            <h1>
              {{ t('characters-basic-data.next') }}
            </h1>
            <input
              type="number"
              v-model="editableBasicData.next"
              class="editing-input w-full"
            />
          </div>
        </div>
        <div class="item-simple">
          <h1>
            {{ t('characters-basic-data.jp') }}
          </h1>
          <input
            type="number"
            v-model="editableBasicData.jp"
            class="editing-input w-full"
          />
        </div>
        <div class="item-simple">
          <h1>
            {{ t('characters-basic-data.enhancements') }}
          </h1>
          <input
            type="number"
            v-model="editableBasicData.enhancements"
            class="editing-input w-full"
          />
        </div>
        <div class="item-simple">
          <h1>
            {{ t('characters-basic-data.skillRegen') }}
          </h1>
          <input
            type="number"
            v-model="editableBasicData.skillRegen"
            class="editing-input w-full"
          />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="item-simple">
            <h1>
              {{ t('characters-basic-data.currentHunger') }}
            </h1>
            <input
              type="number"
              v-model="editableBasicData.currentHunger"
              class="editing-input w-full"
            />
          </div>
          <div class="item-simple">
            <h1>
              {{ t('characters-basic-data.maxHunger') }}
            </h1>
            <input
              type="number"
              v-model="editableBasicData.maxHunger"
              class="editing-input w-full"
            />
          </div>
        </div>
        <div class="item-simple">
          <h1>
            {{ t('characters-basic-data.gold') }}
          </h1>
          <input
            type="number"
            v-model="editableBasicData.gold"
            class="editing-input w-full"
          />
        </div>
      </div>
      <div v-else class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-2">
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.currentHP') }}</h1>
            <p>{{ character.basicData.currentHP }}</p>
          </div>
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.maxHP') }}</h1>
            <div class="flex items-center gap-2">
              <span>({{ character.basicData.maxHP }})</span>
              <p>{{ character.getFieldFinalValue(EffectFieldsList.MAX_HP) }}</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.currentMP') }}</h1>
            <p>{{ character.basicData.currentMP }}</p>
          </div>
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.maxMP') }}</h1>
            <div class="flex items-center gap-2">
              <span>({{ character.basicData.maxMP }})</span>
              <p>{{ character.getFieldFinalValue(EffectFieldsList.MAX_MP) }}</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.currentSP') }}</h1>
            <p>{{ character.basicData.currentSP }}</p>
          </div>
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.maxSP') }}</h1>
            <div class="flex items-center gap-2">
              <span>({{ character.basicData.maxSP }})</span>
              <p>{{ character.getFieldFinalValue(EffectFieldsList.MAX_SP) }}</p>
            </div>
          </div>
        </div>
        <div class="item-simple">
          <h1>{{ t('characters-basic-data.level') }}</h1>
          <p>
            {{ character.getFieldFinalValue('level' as EffectFieldsList) }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.exp') }}</h1>
            <p>{{ character.basicData.exp }}</p>
          </div>
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.next') }}</h1>
            <p>{{ character.basicData.next }}</p>
          </div>
        </div>
        <div class="item-simple">
          <h1>{{ t('characters-basic-data.jp') }}</h1>
          <p>
            {{ character.basicData.jp }}
          </p>
        </div>
        <div class="item-simple">
          <h1>{{ t('characters-basic-data.enhancements') }}</h1>
          <p>
            {{ character.basicData.enhancements }}
          </p>
        </div>
        <div class="item-simple">
          <h1>{{ t('characters-basic-data.skillRegen') }}</h1>
          <p>
            {{ character.basicData.skillRegen }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.currentHunger') }}</h1>
            <p>{{ character.basicData.currentHunger }}</p>
          </div>
          <div class="item-simple">
            <h1>{{ t('characters-basic-data.maxHunger') }}</h1>
            <p>{{ character.basicData.maxHunger }}</p>
          </div>
        </div>
        <div class="item-simple">
          <h1>{{ t('characters-basic-data.gold') }}</h1>
          <p>
            {{ character.basicData.gold }}
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
  @apply flex items-center gap-2;
  h1 {
    @apply text-sm text-primary-gray-light whitespace-nowrap;
  }
  p {
    @apply font-semibold whitespace-nowrap;
  }
}
.editing-input {
  @apply px-2 py-1 bg-transparent border border-primary-gray rounded outline-none;
}
</style>
