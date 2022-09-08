<script setup lang="ts">
import { router } from '@plugins/router';
import { useDataStore } from '@stores/data';

const { t } = useI18n();
const dataStore = useDataStore();
const {
  currentElements,
  creatingElement,
  importingElements,
  exportingElements,
} = storeToRefs(dataStore);

useHead({ title: computed(() => t('data.head-title')) });

const elementName = ref('');

const createElement = () => {
  if (!elementName.value) {
    return;
  }
  dataStore.createElement({ name: elementName.value });
};

const importingFile = ref();
const onImportingFileUploaded = async (e: any) => {
  const files = e.target.files;
  if (!files?.length) {
    return;
  }
  importingFile.value = files[0];
  dataStore.importElements(importingFile.value);
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col lg:flex-row lg:justify-between gap-8">
      <h1 class="text-2xl font-semibold">
        {{ t('data.elements', [currentElements.length]) }}
      </h1>
      <div v-if="creatingElement" class="flex items-center gap-2">
        <icon-eos-icons:loading />
        <p>{{ t('data.creating-element') }}</p>
      </div>
      <div v-else-if="importingElements" class="flex items-center gap-2">
        <icon-eos-icons:loading />
        <p>{{ t('data.importing-element') }}</p>
      </div>
      <div v-else-if="exportingElements" class="flex items-center gap-2">
        <icon-eos-icons:loading />
        <p>{{ t('data.exporting-element') }}</p>
      </div>
      <div v-else class="flex flex-col lg:flex-row gap-4 lg:w-1/2">
        <div class="flex w-full">
          <input
            type="text"
            placeholder="Element name..."
            v-model="elementName"
            class="form-input rounded-l"
          />
          <button class="btn-green rounded-r" @click.prevent="createElement">
            <icon-carbon:add class="text-xl" />
          </button>
        </div>
        <div class="flex gap-[1px] w-full lg:w-auto">
          <button
            class="w-full lg:w-auto btn-blue rounded-l"
            @click.prevent="router.push('/data/edit')"
          >
            <icon-carbon:edit class="text-xl" />
          </button>
          <input
            id="importingFile"
            type="file"
            accept=".csv"
            class="hidden"
            @change="onImportingFileUploaded"
          />
          <label
            for="importingFile"
            class="w-full lg:w-auto btn-blue cursor-pointer"
          >
            <icon-carbon:document-import class="text-xl" />
          </label>
          <button class="w-full lg:w-auto btn-blue rounded-r" @click.prevent="">
            <icon-carbon:export class="text-xl" />
          </button>
        </div>
      </div>
    </div>
    <p v-if="!currentElements.length">There are no elements available yet.</p>
    <div v-else class="grid lg:grid-cols-3 gap-4">
      <div
        v-for="element in currentElements"
        :key="element.id"
        class="relative flex p-4 border border-primary-gray-dark rounded shadow"
      >
        <div
          class="-z-10 absolute inset-0 flex flex-col opacity-[40%] brightness-[40%]"
        >
          <img :src="element.image" class="object-cover h-full" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <div class="flex flex-col gap-2">
            <h1 class="text-xl font-bold">{{ element.name }}</h1>
            <p class="font-bold">Nv2 {{ element.double }}</p>
            <p class="font-bold">Nv3 {{ element.triple }}</p>
          </div>
          <p>{{ element.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-input {
  @apply w-full p-2 bg-transparent border border-primary-gray outline-none;
}
</style>
