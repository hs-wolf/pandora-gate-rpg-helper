<script setup lang="ts">
import { useCharactersStore } from '@src/stores/characters';

const props = defineProps<{ id: string }>();

const { t } = useI18n();
const charactersStore = useCharactersStore();
const { currentCharacters } = storeToRefs(charactersStore);

const character = computed(() => currentCharacters.value.get(props.id));
const characterAttributes = computed(() =>
  character.value ? character.value.getFinalAttributes() : {}
);
const showBasicData = ref(false);
const showAttributes = ref(false);
</script>

<template>
  <div class="flex flex-col gap-4 lg:gap-8 w-full">
    <p class="text-2xl font-bold">{{ character?.name }}</p>
    <div class="sheet-section">
      <button
        class="flex items-center justify-between gap-2 px-4 py-2 bg-primary-gray-dark"
        @click.prevent="showBasicData = !showBasicData"
      >
        <p class="text-sm font-semibold">{{ t('characters.basic-data') }}</p>
        <icon-carbon:chevron-up v-if="showBasicData" class="text-xl" />
        <icon-carbon:chevron-down v-else class="text-xl" />
      </button>
      <div v-if="showBasicData" class="sheet-content">
        <div class="sheet-item-simple">
          <h1>{{ t('characters.guild') }}</h1>
          <p>{{ character?.guild ?? '-' }}</p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.elements') }}</h1>
          <p>
            {{
              character?.elements
                ? character?.elements.map((element) => element.name).join(', ')
                : '-'
            }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.jobs') }}</h1>
          <p>
            {{
              character?.jobs
                ? character?.jobs.map((job) => job.name).join(', ')
                : '-'
            }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.level') }}</h1>
          <p>
            {{ character?.level ?? 0 }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.exp') }}</h1>
          <p>
            {{
              character?.exp
                ? `${character?.exp.current}/${character?.exp.next}`
                : '0/0'
            }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.jp') }}</h1>
          <p>
            {{ character?.jp ?? 0 }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.enhancements') }}</h1>
          <p>
            {{ character?.enhancements ?? 0 }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.skillRegen') }}</h1>
          <p>
            {{ character?.skillRegen ?? 0 }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.hunger') }}</h1>
          <p>
            {{
              character?.hunger
                ? `${character?.hunger.current}/${character?.hunger.max}`
                : '0/0'
            }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.gold') }}</h1>
          <p>
            {{ character?.gold ?? 0 }}
          </p>
        </div>
      </div>
    </div>
    <div class="sheet-section">
      <button
        class="flex items-center justify-between gap-2 px-4 py-2 bg-primary-gray-dark"
        @click.prevent="showAttributes = !showAttributes"
      >
        <p class="text-sm font-semibold">{{ t('characters.attributes') }}</p>
        <icon-carbon:chevron-up v-if="showAttributes" class="text-xl" />
        <icon-carbon:chevron-down v-else class="text-xl" />
      </button>
      <div v-if="showAttributes" class="grid grid-cols-2 gap-4 p-4">
        <div class="sheet-item-simple">
          <icon-iconoir:gym class="text-primary-green" />
          <h1>{{ t('characters.strength.acronym') }}</h1>
          <p>{{ characterAttributes?.strength }}</p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.modificator.acronym') }}</h1>
        </div>
        <div class="sheet-item-simple">
          <icon-mdi:run-fast class="text-primary-green" />
          <h1>{{ t('characters.agility.acronym') }}</h1>
          <p>
            {{ characterAttributes?.agility }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.modificator.acronym') }}</h1>
        </div>
        <div class="sheet-item-simple">
          <icon-fa-solid:hand-sparkles class="text-primary-green" />
          <h1>{{ t('characters.dexterity.acronym') }}</h1>
          <p>
            {{ characterAttributes?.dexterity }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.modificator.acronym') }}</h1>
        </div>
        <div class="sheet-item-simple">
          <icon-ic:baseline-health-and-safety class="text-primary-green" />
          <h1>{{ t('characters.vitality.acronym') }}</h1>
          <p>
            {{ characterAttributes?.vitality }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.modificator.acronym') }}</h1>
        </div>
        <div class="sheet-item-simple">
          <icon-ri:mental-health-line class="text-primary-green" />
          <h1>{{ t('characters.spirit.acronym') }}</h1>
          <p>
            {{ characterAttributes?.spirit }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.modificator.acronym') }}</h1>
        </div>
        <div class="sheet-item-simple">
          <icon-tabler:clover class="text-primary-green" />
          <h1>{{ t('characters.luck.acronym') }}</h1>
          <p>
            {{ characterAttributes?.luck }}
          </p>
        </div>
        <div class="sheet-item-simple">
          <h1>{{ t('characters.modificator.acronym') }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sheet-section {
  @apply flex flex-col border border-primary-gray-dark rounded-md overflow-hidden;
}

.sheet-content {
  @apply flex flex-col gap-4 p-4;
}
.sheet-item-simple {
  @apply flex items-center gap-2;
  h1 {
    @apply text-sm text-primary-gray-light font-semibold;
  }
  p {
    @apply break-all;
  }
}
</style>
