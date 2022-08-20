<script setup lang="ts">
import { object, string } from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import { Location, LocationTypes } from '@pandora-gate-rpg-helper/models';

const props = defineProps<{ location: Location }>();

const { t } = useI18n();

const formInfo = {
  name: {
    name: 'name',
    label: 'location-form.name.label',
    placeholder: 'location-form.name.placeholder',
  },
  description: {
    name: 'description',
    label: 'location-form.description.label',
    placeholder: 'location-form.description.placeholder',
  },
  ['location-type']: {
    name: 'location-type',
    label: 'location-form.location-type.label',
    placeholder: 'location-form.location-type.placeholder',
  },
};
const validationSchema = toFormValidator(
  object({
    email: string().email(),
    password: string().min(1),
  })
);
const { errors, setValues, handleSubmit } = useForm({ validationSchema });
const { value: nameValue } = useField(formInfo.name.name);
const { value: descriptionValue } = useField(formInfo.description.name);
const { value: locationTypeValue } = useField(formInfo['location-type'].name);

setValues({
  name: props.location.name,
  description: props.location.description,
  ['location-type']: props.location.type,
});

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
        <img :src="location.img" class="w-10 h-10 object-cover rounded" />
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
    <select
      :name="formInfo['location-type'].name"
      v-model="locationTypeValue"
      class="flex w-full lg:w-auto pl-2 pr-7 py-2 text-primary-black rounded bg-primary-white/80"
    >
      <option value="" selected disabled>
        {{ t(formInfo['location-type'].placeholder) }}
      </option>
      <option
        v-for="locationType in LocationTypes"
        :key="locationType"
        :value="locationType"
      >
        {{ t(`general.location-types.${locationType.toLowerCase()}`) }}
      </option>
    </select>
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
