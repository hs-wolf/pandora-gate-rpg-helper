<route lang="yaml">
meta:
  requiresOffline: true
</route>

<script setup lang="ts">
import { object, string } from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import { router } from '@plugins/router';
import { useAuthStore } from '@src/stores/auth';

const { t } = useI18n();
const authStore = useAuthStore();

useHead({ title: computed(() => t('login.head-title')) });

const formInfo = {
  email: {
    name: 'email',
    label: 'login.email.label',
    placeholder: 'login.email.placeholder',
  },
  password: {
    name: 'password',
    label: 'login.password.label',
    placeholder: 'login.password.placeholder',
  },
};
const validationSchema = toFormValidator(
  object({
    email: string().email(),
    password: string().min(1),
  })
);
const { errors, handleSubmit } = useForm({ validationSchema });
const { value: emailValue } = useField(formInfo.email.name);
const { value: passwordValue } = useField(formInfo.password.name);

const onSubmit = handleSubmit((values) => {
  authStore.login(values.email as string, values.password as string);
});

const showPassword = ref(false);
</script>

<template>
  <div class="login-container">
    <h1 class="text-2xl font-semibold">{{ t('login.page-title') }}</h1>
    <form class="flex flex-col gap-4">
      <div class="input-with-icon">
        <icon-ic:round-alternate-email
          class="absolute left-2 text-primary-gray"
        />
        <input
          type="text"
          :name="formInfo.email.name"
          :placeholder="t(formInfo.email.placeholder)"
          v-model="emailValue"
          class="pl-8 pr-3"
          :class="errors.email ? 'form-input-error' : 'form-input'"
        />
      </div>
      <span v-if="errors.email" class="message-error">
        {{ t(errors.email, { label: t(formInfo.email.label) }) }}
      </span>
      <div class="input-with-icon">
        <icon-carbon:password class="absolute left-2 text-primary-gray" />
        <input
          :type="showPassword ? 'text' : 'password'"
          :name="formInfo.password.name"
          :placeholder="t(formInfo.password.placeholder)"
          v-model="passwordValue"
          class="form-input px-8"
          :class="errors.password ? 'form-input-error' : 'form-input'"
        />
        <button
          type="button"
          class="absolute right-2 text-primary-black"
          @click.prevent="showPassword = !showPassword"
        >
          <icon-ant-design:eye-filled
            v-if="showPassword"
            class="text-xl text-primary-black"
          />
          <icon-ant-design:eye-invisible-filled
            v-else
            class="text-xl text-primary-black"
          />
        </button>
      </div>
      <span v-if="errors.password" class="message-error">
        {{ t(errors.password, { label: t(formInfo.password.label) }) }}
      </span>
      <button
        type="button"
        class="btn-green mt-2"
        :disabled="authStore.logging"
        @click.prevent="onSubmit"
      >
        <div v-if="authStore.logging" class="flex items-center gap-2">
          <p>{{ t('general.logging') }}</p>
          <icon-eos-icons:loading />
        </div>
        <span v-else>{{ t('general.login') }}</span>
      </button>
    </form>
    <i18n-t keypath="login.no-account" tag="p" class="text-sm" scope="global">
      <template #field>
        <button
          class="text-primary-green font-semibold"
          @click.prevent="router.push({ name: 'register' })"
        >
          {{ t('login.register-here') }}
        </button>
      </template>
    </i18n-t>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  @apply flex flex-col gap-4 w-full;
  @apply desktop:flex-1 desktop:justify-center desktop:items-center;
}
.input-with-icon {
  @apply relative flex items-center rounded;
  .form-input {
    @apply w-full py-2 bg-primary-white rounded text-primary-black placeholder:text-primary-gray-light outline-none;
  }
  .form-input-error {
    @apply w-full py-2 bg-primary-white rounded text-primary-red placeholder:text-primary-gray-light outline-none  border-2 border-primary-red;
  }
}
.message-error {
  @apply text-end text-primary-red text-sm mb-2;
}
</style>
