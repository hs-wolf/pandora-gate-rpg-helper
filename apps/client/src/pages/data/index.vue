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

onBeforeMount(async () => {
  if (!currentElements.value.length) {
    await dataStore.getCurrentElements();
  }
});

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
        <p>Creating element</p>
      </div>
      <div v-else-if="importingElements" class="flex items-center gap-2">
        <icon-eos-icons:loading />
        <p>Importing elements</p>
      </div>
      <div v-else-if="exportingElements" class="flex items-center gap-2">
        <icon-eos-icons:loading />
        <p>Exporting elements</p>
      </div>
      <div v-else class="flex flex-col lg:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Element name..."
          v-model="elementName"
          class="form-input pl-3 pr-8"
        />
        <button class="w-full btn-green" @click.prevent="createElement">
          {{ t('general.create') }}
        </button>
        <button
          class="w-full btn-blue"
          @click.prevent="router.push('/data/edit')"
        >
          {{ t('general.edit') }}
        </button>
        <input
          id="importingFile"
          type="file"
          accept=".csv"
          class="hidden"
          @change="onImportingFileUploaded"
        />
        <label for="importingFile" class="w-full btn-blue cursor-pointer">
          {{ t('general.import') }}
        </label>
        <button class="w-full btn-blue" @click.prevent="">
          {{ t('general.export') }}
        </button>
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
  @apply w-full lg:w-auto py-2 bg-transparent border border-primary-gray rounded text-primary-white placeholder:text-primary-gray outline-none;
}
</style>
