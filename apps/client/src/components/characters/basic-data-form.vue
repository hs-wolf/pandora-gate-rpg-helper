<script setup lang="ts">
import { useCharactersStore } from '@src/stores/characters';
import { EffectFieldsList } from '@pandora-gate-rpg-helper/models';

const { t } = useI18n();
const charactersStore = useCharactersStore();
const { currentCharacter } = storeToRefs(charactersStore);

const showForm = ref(false);
const editing = ref(false);
const saveEdits = () => {
  charactersStore.updateCharacter(currentCharacter.value?.id ?? '', {
    basicData: currentCharacter.value?.basicData,
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
      <p>{{ t('characters-basic-data-form.title') }}</p>
      <icon-carbon:chevron-up v-if="showForm" />
      <icon-carbon:chevron-down v-else />
    </button>
    <div v-if="showForm" class="flex flex-col gap-4">
      <div v-if="editing" class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <div class="flex items-center w-full">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.currentHP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.currentHP"
              class="form-input"
            />
            <h1
              class="p-2 bg-primary-gray border border-primary-gray whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.maxHP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.maxHP"
              class="form-input rounded-r"
            />
          </div>
          <p class="font-semibold">
            {{ currentCharacter.getFieldFinalValue(EffectFieldsList.MAX_HP) }}
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center w-full">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.currentMP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.currentMP"
              class="form-input"
            />
            <h1
              class="p-2 bg-primary-gray border border-primary-gray whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.maxMP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.maxMP"
              class="form-input rounded-r"
            />
          </div>
          <p class="font-semibold">
            {{ currentCharacter.getFieldFinalValue(EffectFieldsList.MAX_MP) }}
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center w-full">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.currentSP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.currentSP"
              class="form-input"
            />
            <h1
              class="p-2 bg-primary-gray border border-primary-gray whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.maxSP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.maxSP"
              class="form-input rounded-r"
            />
          </div>
          <p class="font-semibold">
            {{ currentCharacter.getFieldFinalValue(EffectFieldsList.MAX_SP) }}
          </p>
        </div>
        <div class="flex items-center">
          <h1
            class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
          >
            {{ t('characters-basic-data-form.level') }}
          </h1>
          <input
            type="number"
            v-model="currentCharacter.basicData.level"
            class="form-input rounded-r"
          />
        </div>
        <div class="grid grid-cols-2">
          <div class="flex items-center">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.exp') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.exp"
              class="form-input"
            />
          </div>
          <div class="flex items-center">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.next') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.next"
              class="form-input rounded-r"
            />
          </div>
        </div>
        <div class="flex items-center">
          <h1
            class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
          >
            {{ t('characters-basic-data-form.jp') }}
          </h1>
          <input
            type="number"
            v-model="currentCharacter.basicData.jp"
            class="form-input rounded-r"
          />
        </div>
        <div class="flex items-center">
          <h1 class="p-2 bg-primary-gray border border-primary-gray rounded-l">
            {{ t('characters-basic-data-form.enhancements') }}
          </h1>
          <input
            type="number"
            v-model="currentCharacter.basicData.enhancements"
            class="form-input rounded-r"
          />
        </div>
        <div class="flex items-center">
          <h1
            class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
          >
            {{ t('characters-basic-data-form.skillRegen') }}
          </h1>
          <input
            type="number"
            v-model="currentCharacter.basicData.skillRegen"
            class="form-input rounded-r"
          />
        </div>
        <div class="grid grid-cols-2">
          <div class="flex items-center">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.currentHunger') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.currentHunger"
              class="form-input"
            />
          </div>
          <div class="flex items-center">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.maxHunger') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.maxHunger"
              class="form-input rounded-r"
            />
          </div>
        </div>
        <div class="flex items-center">
          <h1
            class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
          >
            {{ t('characters-basic-data-form.gold') }}
          </h1>
          <input
            type="number"
            v-model="currentCharacter.basicData.gold"
            class="form-input rounded-r"
          />
        </div>
        <button class="self-end btn-green rounded" @click.prevent="saveEdits">
          <icon-carbon:save class="text-xl" />
        </button>
      </div>
      <div v-else class="flex flex-col gap-4">
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.currentHP') }}</h1>
          <p>{{ currentCharacter.basicData.currentHP }}</p>
          <h1>/</h1>
          <span>{{ `(${currentCharacter.basicData.maxHP})` }}</span>
          <p>
            {{ currentCharacter.getFieldFinalValue(EffectFieldsList.MAX_HP) }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.currentMP') }}</h1>
          <p>{{ currentCharacter.basicData.currentMP }}</p>
          <h1>/</h1>
          <span>{{ `(${currentCharacter.basicData.maxMP})` }}</span>
          <p>
            {{ currentCharacter.getFieldFinalValue(EffectFieldsList.MAX_MP) }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.currentSP') }}</h1>
          <p>{{ currentCharacter.basicData.currentSP }}</p>
          <h1>/</h1>
          <span>{{ `(${currentCharacter.basicData.maxSP})` }}</span>
          <p>
            {{ currentCharacter.getFieldFinalValue(EffectFieldsList.MAX_SP) }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.level') }}</h1>
          <p>
            {{ currentCharacter.basicData.level }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.exp') }}</h1>
          <p>{{ currentCharacter.basicData.exp }}</p>
          <h1>/</h1>
          <p>{{ currentCharacter.basicData.next }}</p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.jp') }}</h1>
          <p>
            {{ currentCharacter.basicData.jp }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.enhancements') }}</h1>
          <p>
            {{ currentCharacter.basicData.enhancements }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.skillRegen') }}</h1>
          <p>
            {{ currentCharacter.basicData.skillRegen }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.currentHunger') }}</h1>
          <p>{{ currentCharacter.basicData.currentHunger }}</p>
          <h1>/</h1>
          <p>{{ currentCharacter.basicData.maxHunger }}</p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.gold') }}</h1>
          <p>
            {{ currentCharacter.basicData.gold }}
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
