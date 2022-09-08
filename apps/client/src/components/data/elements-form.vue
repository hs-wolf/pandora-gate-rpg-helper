<script setup lang="ts">
import { object, string } from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import { Element } from '@pandora-gate-rpg-helper/models';

const props = defineProps<{ element: Element }>();

const { t } = useI18n();

const formInfo = {
  name: {
    name: 'name',
    label: 'data-elements-form.name.label',
    placeholder: 'data-elements-form.name.placeholder',
  },
  double: {
    name: 'double',
    label: 'data-elements-form.double.label',
    placeholder: 'data-elements-form.double.placeholder',
  },
  triple: {
    name: 'triple',
    label: 'data-elements-form.triple.label',
    placeholder: 'data-elements-form.triple.placeholder',
  },
  description: {
    name: 'description',
    label: 'data-elements-form.description.label',
    placeholder: 'data-elements-form.description.placeholder',
  },
  image: {
    name: 'image',
    label: 'data-elements-form.image.label',
    placeholder: 'data-elements-form.image.placeholder',
  },
};
const validationSchema = toFormValidator(
  object({
    name: string().min(1),
    double: string().optional(),
    triple: string().optional(),
    description: string().optional(),
    image: string().optional(),
  })
);
const { setValues, handleSubmit } = useForm({ validationSchema });
setValues({
  ...props.element,
});
const onSubmit = handleSubmit((values) => {
  console.log(values);
});
const { value: nameValue } = useField(formInfo.name.name);
const { value: doubleValue } = useField(formInfo.double.name);
const { value: tripleValue } = useField(formInfo.triple.name);
const { value: descriptionValue } = useField(formInfo.description.name);
const { value: imageValue } = useField(formInfo.image.name);

const showForm = ref(false);
</script>

<template>
  <div
    class="relative flex flex-col gap-4 p-4 bg-primary-gray-dark rounded-md overflow-hidden"
  >
    <img
      :src="element.image"
      class="absolute left-0 top-0 w-full h-full object-cover rounded opacity-10"
    />
    <button
      class="z-10 flex justify-between items-center gap-2 font-semibold"
      @click.prevent="showForm = !showForm"
    >
      <p>{{ nameValue }}</p>
      <icon-carbon:chevron-up v-if="showForm" />
      <icon-carbon:chevron-down v-else />
    </button>
    <div v-if="showForm" class="z-10 flex flex-col gap-4">
      <div class="grid lg:grid-cols-5 gap-2">
        <input
          type="text"
          :placeholder="t('data-elements-form.name.placeholder')"
          v-model="nameValue"
          class="form-input rounded"
        />
        <input
          type="text"
          :placeholder="t('data-elements-form.double.placeholder')"
          v-model="doubleValue"
          class="form-input rounded"
        />
        <input
          type="text"
          :placeholder="t('data-elements-form.triple.placeholder')"
          v-model="tripleValue"
          class="form-input rounded"
        />
        <input
          type="text"
          :placeholder="t('data-elements-form.description.placeholder')"
          v-model="descriptionValue"
          class="form-input lg:col-span-2 rounded"
        />
      </div>
      <div class="flex justify-end items-center gap-[1px] w-full lg:w-auto">
        <button class="btn-blue rounded-l">
          <icon-carbon:image class="text-xl" />
        </button>
        <button class="btn-green"><icon-carbon:save class="text-xl" /></button>
        <button class="btn-red rounded-r">
          <icon-carbon:trash-can class="text-xl" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-input {
  @apply w-full p-2 bg-transparent border border-primary-gray outline-none;
}
</style>
