<script setup lang="ts">
import { Character, EffectFieldsList } from '@pandora-gate-rpg-helper/models';

const props = defineProps<{ character: Character }>();

const { t } = useI18n();

const showData = ref(false);
const editing = ref(false);

const editableBasicStats = computed(() => props.character.basicStats);

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
        {{ t('characters-basic-stats-form.title') }}
      </p>
      <icon-carbon:chevron-up v-if="showData" class="text-xl" />
      <icon-carbon:chevron-down v-else class="text-xl" />
    </button>
    <div v-if="showData" class="flex flex-col p-4 gap-4">
      <div class="item-simple">
        <h1>
          {{ t(`characters-basic-stats-form.${EffectFieldsList.INITIATIVE}`) }}
        </h1>
        <p v-if="editing" class="flex items-center gap-2">
          <input
            type="number"
            v-model="editableBasicStats[EffectFieldsList.INITIATIVE]"
            class="editing-input w-full"
          />
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.INITIATIVE) }}
          </span>
        </p>
        <p v-else class="flex items-center gap-1">
          <span class="text-sm font-normal">
            ({{ editableBasicStats[EffectFieldsList.INITIATIVE] }})
          </span>
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.INITIATIVE) }}
          </span>
        </p>
      </div>
      <div class="item-simple">
        <h1>
          {{ t(`characters-basic-stats-form.${EffectFieldsList.DODGE}`) }}
        </h1>
        <p v-if="editing" class="flex items-center gap-2">
          <input
            type="number"
            v-model="editableBasicStats[EffectFieldsList.DODGE]"
            class="editing-input w-full"
          />
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.DODGE) }}
          </span>
        </p>
        <p v-else class="flex items-center gap-1">
          <span class="text-sm font-normal">
            ({{ editableBasicStats[EffectFieldsList.DODGE] }})
          </span>
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.DODGE) }}
          </span>
        </p>
      </div>
      <div class="item-simple">
        <h1>
          {{ t(`characters-basic-stats-form.${EffectFieldsList.MOVE}`) }}
        </h1>
        <p v-if="editing" class="flex items-center gap-2">
          <input
            type="number"
            v-model="editableBasicStats[EffectFieldsList.MOVE]"
            class="editing-input w-full"
          />
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.MOVE) }}
          </span>
        </p>
        <p v-else class="flex items-center gap-1">
          <span class="text-sm font-normal">
            ({{ editableBasicStats[EffectFieldsList.MOVE] }})
          </span>
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.MOVE) }}
          </span>
        </p>
      </div>
      <div class="item-simple">
        <h1>
          {{ t(`characters-basic-stats-form.${EffectFieldsList.CRITICAL}`) }}
        </h1>
        <p v-if="editing" class="flex items-center gap-2">
          <input
            type="number"
            v-model="editableBasicStats[EffectFieldsList.CRITICAL]"
            class="editing-input w-full"
          />
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.CRITICAL) }}
          </span>
        </p>
        <p v-else class="flex items-center gap-1">
          <span class="text-sm font-normal">
            ({{ editableBasicStats[EffectFieldsList.CRITICAL] }})
          </span>
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.CRITICAL) }}
          </span>
        </p>
      </div>
      <div class="item-simple">
        <h1>
          {{
            t(
              `characters-basic-stats-form.${EffectFieldsList.PHYSICAL_DEFENSE}`
            )
          }}
        </h1>
        <p v-if="editing" class="flex items-center gap-2">
          <input
            type="number"
            v-model="editableBasicStats[EffectFieldsList.PHYSICAL_DEFENSE]"
            class="editing-input w-full"
          />
          <span>
            {{
              character.getFieldFinalValue(EffectFieldsList.PHYSICAL_DEFENSE)
            }}
          </span>
        </p>
        <p v-else class="flex items-center gap-1">
          <span class="text-sm font-normal">
            ({{ editableBasicStats[EffectFieldsList.PHYSICAL_DEFENSE] }})
          </span>
          <span>
            {{
              character.getFieldFinalValue(EffectFieldsList.PHYSICAL_DEFENSE)
            }}
          </span>
        </p>
      </div>
      <div class="item-simple">
        <h1>
          {{
            t(`characters-basic-stats-form.${EffectFieldsList.PHYSICAL_DICE}`)
          }}
        </h1>
        <p v-if="editing" class="flex items-center gap-2">
          <input
            type="number"
            v-model="editableBasicStats[EffectFieldsList.PHYSICAL_DICE]"
            class="editing-input w-full"
          />
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.PHYSICAL_DICE) }}
          </span>
        </p>
        <p v-else class="flex items-center gap-1">
          <span class="text-sm font-normal">
            ({{ editableBasicStats[EffectFieldsList.PHYSICAL_DICE] }})
          </span>
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.PHYSICAL_DICE) }}
          </span>
        </p>
      </div>
      <div class="item-simple">
        <h1>
          {{
            t(`characters-basic-stats-form.${EffectFieldsList.MAGICAL_DEFENSE}`)
          }}
        </h1>
        <p v-if="editing" class="flex items-center gap-2">
          <input
            type="number"
            v-model="editableBasicStats[EffectFieldsList.MAGICAL_DEFENSE]"
            class="editing-input w-full"
          />
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.MAGICAL_DEFENSE) }}
          </span>
        </p>
        <p v-else class="flex items-center gap-1">
          <span class="text-sm font-normal">
            ({{ editableBasicStats[EffectFieldsList.MAGICAL_DEFENSE] }})
          </span>
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.MAGICAL_DEFENSE) }}
          </span>
        </p>
      </div>
      <div class="item-simple">
        <h1>
          {{
            t(`characters-basic-stats-form.${EffectFieldsList.MAGICAL_DICE}`)
          }}
        </h1>
        <p v-if="editing" class="flex items-center gap-2">
          <input
            type="number"
            v-model="editableBasicStats[EffectFieldsList.MAGICAL_DICE]"
            class="editing-input w-full"
          />
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.MAGICAL_DICE) }}
          </span>
        </p>
        <p v-else class="flex items-center gap-1">
          <span class="text-sm font-normal">
            ({{ editableBasicStats[EffectFieldsList.MAGICAL_DICE] }})
          </span>
          <span>
            {{ character.getFieldFinalValue(EffectFieldsList.MAGICAL_DICE) }}
          </span>
        </p>
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
