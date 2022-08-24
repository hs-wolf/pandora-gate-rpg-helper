<script setup lang="ts">
import { object, string } from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import { Element } from '@pandora-gate-rpg-helper/models';

defineProps<{ element: Element }>();

const { t } = useI18n();

const formInfo = {
  name: {
    name: 'name',
    label: 'elements-form.name.label',
    placeholder: 'elements-form.name.placeholder',
  },
  double: {
    name: 'double',
    label: 'elements-form.double.label',
    placeholder: 'elements-form.double.placeholder',
  },
  triple: {
    name: 'triple',
    label: 'elements-form.triple.label',
    placeholder: 'elements-form.triple.placeholder',
  },
  description: {
    name: 'description',
    label: 'elements-form.description.label',
    placeholder: 'elements-form.description.placeholder',
  },
  image: {
    name: 'image',
    label: 'elements-form.image.label',
    placeholder: 'elements-form.image.placeholder',
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
const { errors, setValues, handleSubmit } = useForm({ validationSchema });
const { value: nameValue } = useField(formInfo.name.name);
const { value: doubleValue } = useField(formInfo.double.name);
const { value: tripleValue } = useField(formInfo.triple.name);
const { value: descriptionValue } = useField(formInfo.description.name);
const { value: imageValue } = useField(formInfo.image.name);

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <div
    class="flex flex-col lg:flex-row items-center gap-2 p-2 bg-primary-gray-dark shadow-md rounded"
  >
    <div class="flex flex-col lg:flex-row items-center gap-2 w-full">
      <div class="input-with-icon w-full lg:max-w-[20rem] lg:min-w-[20rem]">
        <img :src="element.image" class="w-10 h-10 object-cover rounded" />
        <input
          type="text"
          :name="formInfo.name.name"
          :placeholder="t(formInfo.name.placeholder)"
          v-model="nameValue"
          class="form-input pl-3 pr-8 font-semibold"
        />
        <button
          type="button"
          class="absolute right-2 text-primary-gray"
          @click.prevent="nameValue = ''"
        >
          <icon-akar-icons:circle-x class="text-lg" />
        </button>
      </div>
      <div class="input-with-icon w-full">
        <input
          type="text"
          :name="formInfo.description.name"
          :placeholder="t(formInfo.description.placeholder)"
          v-model="descriptionValue"
          class="form-input pl-3 pr-8"
        />
        <button
          type="button"
          class="absolute right-2 text-primary-gray"
          @click.prevent="descriptionValue = ''"
        >
          <icon-akar-icons:circle-x class="text-lg" />
        </button>
      </div>
    </div>
    <div class="flex justify-end items-center gap-2 w-full lg:w-auto">
      <button class="btn-blue"><icon-carbon:image /></button>
      <button class="btn-green"><icon-carbon:save /></button>
      <button class="btn-red"><icon-carbon:trash-can /></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-with-icon {
  @apply relative flex items-center gap-2 rounded;
  .form-input {
    @apply w-full py-2 bg-transparent border border-primary-gray rounded text-primary-white placeholder:text-primary-gray outline-none;
    &:focus {
      @apply border-primary-gray-light;
    }
  }
}
</style>
