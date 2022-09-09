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
              {{ t('characters-basic-data-form.basicDataCurrentHP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.basicDataCurrentHP"
              class="form-input"
            />
            <h1
              class="p-2 bg-primary-gray border border-primary-gray whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.basicDataMaxHP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.basicDataMaxHP"
              class="form-input rounded-r"
            />
          </div>
          <p class="font-semibold">
            {{
              currentCharacter.getFieldFinalValue(
                EffectFieldsList.BASIC_DATA_MAX_HP
              )
            }}
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center w-full">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.basicDataCurrentMP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.basicDataCurrentMP"
              class="form-input"
            />
            <h1
              class="p-2 bg-primary-gray border border-primary-gray whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.basicDataMaxMP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.basicDataMaxMP"
              class="form-input rounded-r"
            />
          </div>
          <p class="font-semibold">
            {{
              currentCharacter.getFieldFinalValue(
                EffectFieldsList.BASIC_DATA_MAX_MP
              )
            }}
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center w-full">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.basicDataCurrentSP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.basicDataCurrentSP"
              class="form-input"
            />
            <h1
              class="p-2 bg-primary-gray border border-primary-gray whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.basicDataMaxSP') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.basicDataMaxSP"
              class="form-input rounded-r"
            />
          </div>
          <p class="font-semibold">
            {{
              currentCharacter.getFieldFinalValue(
                EffectFieldsList.BASIC_DATA_MAX_SP
              )
            }}
          </p>
        </div>
        <div class="flex items-center">
          <h1
            class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
          >
            {{ t('characters-basic-data-form.basicDataLevel') }}
          </h1>
          <input
            type="number"
            v-model="currentCharacter.basicData.basicDataLevel"
            class="form-input rounded-r"
          />
        </div>
        <div class="grid grid-cols-2">
          <div class="flex items-center">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.basicDataExp') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.basicDataExp"
              class="form-input"
            />
          </div>
          <div class="flex items-center">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.basicDataNext') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.basicDataNext"
              class="form-input rounded-r"
            />
          </div>
        </div>
        <div class="flex items-center">
          <h1
            class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
          >
            {{ t('characters-basic-data-form.basicDataJP') }}
          </h1>
          <input
            type="number"
            v-model="currentCharacter.basicData.basicDataJP"
            class="form-input rounded-r"
          />
        </div>
        <div class="flex items-center">
          <h1 class="p-2 bg-primary-gray border border-primary-gray rounded-l">
            {{ t('characters-basic-data-form.basicDataEnhancements') }}
          </h1>
          <input
            type="number"
            v-model="currentCharacter.basicData.basicDataEnhancements"
            class="form-input rounded-r"
          />
        </div>
        <div class="flex items-center">
          <h1
            class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
          >
            {{ t('characters-basic-data-form.basicDataSkillRegen') }}
          </h1>
          <input
            type="number"
            v-model="currentCharacter.basicData.basicDataSkillRegen"
            class="form-input rounded-r"
          />
        </div>
        <div class="grid grid-cols-2">
          <div class="flex items-center">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.basicDataCurrentHunger') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.basicDataCurrentHunger"
              class="form-input"
            />
          </div>
          <div class="flex items-center">
            <h1
              class="p-2 bg-primary-gray border border-primary-gray whitespace-nowrap"
            >
              {{ t('characters-basic-data-form.basicDataMaxHunger') }}
            </h1>
            <input
              type="number"
              v-model="currentCharacter.basicData.basicDataMaxHunger"
              class="form-input rounded-r"
            />
          </div>
        </div>
        <div class="flex items-center">
          <h1
            class="p-2 bg-primary-gray border border-primary-gray rounded-l whitespace-nowrap"
          >
            {{ t('characters-basic-data-form.basicDataGold') }}
          </h1>
          <input
            type="number"
            v-model="currentCharacter.basicData.basicDataGold"
            class="form-input rounded-r"
          />
        </div>
        <button class="self-end btn-green rounded" @click.prevent="saveEdits">
          <icon-carbon:save class="text-xl" />
        </button>
      </div>
      <div v-else class="flex flex-col gap-4">
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.basicDataCurrentHP') }}</h1>
          <p>{{ currentCharacter.basicData.basicDataCurrentHP }}</p>
          <h1>/</h1>
          <span>{{ `(${currentCharacter.basicData.basicDataMaxHP})` }}</span>
          <p>
            {{
              currentCharacter.getFieldFinalValue(
                EffectFieldsList.BASIC_DATA_MAX_HP
              )
            }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.basicDataCurrentMP') }}</h1>
          <p>{{ currentCharacter.basicData.basicDataCurrentMP }}</p>
          <h1>/</h1>
          <span>{{ `(${currentCharacter.basicData.basicDataMaxMP})` }}</span>
          <p>
            {{
              currentCharacter.getFieldFinalValue(
                EffectFieldsList.BASIC_DATA_MAX_MP
              )
            }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.basicDataCurrentSP') }}</h1>
          <p>{{ currentCharacter.basicData.basicDataCurrentSP }}</p>
          <h1>/</h1>
          <span>{{ `(${currentCharacter.basicData.basicDataMaxSP})` }}</span>
          <p>
            {{
              currentCharacter.getFieldFinalValue(
                EffectFieldsList.BASIC_DATA_MAX_SP
              )
            }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.basicDataLevel') }}</h1>
          <p>
            {{ currentCharacter.basicData.basicDataLevel }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.basicDataExp') }}</h1>
          <p>{{ currentCharacter.basicData.basicDataExp }}</p>
          <h1>/</h1>
          <p>{{ currentCharacter.basicData.basicDataNext }}</p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.basicDataJP') }}</h1>
          <p>
            {{ currentCharacter.basicData.basicDataJP }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.basicDataEnhancements') }}</h1>
          <p>
            {{ currentCharacter.basicData.basicDataEnhancements }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.basicDataSkillRegen') }}</h1>
          <p>
            {{ currentCharacter.basicData.basicDataSkillRegen }}
          </p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.basicDataMaxHunger') }}</h1>
          <p>{{ currentCharacter.basicData.basicDataCurrentHunger }}</p>
          <h1>/</h1>
          <p>{{ currentCharacter.basicData.basicDataMaxHunger }}</p>
        </div>
        <div class="display-section">
          <h1>{{ t('characters-basic-data-form.basicDataGold') }}</h1>
          <p>
            {{ currentCharacter.basicData.basicDataGold }}
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
