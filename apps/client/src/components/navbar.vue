<script setup lang="ts">
import { router } from '@plugins/router';
import { useAuthStore } from '@stores/auth';

const { t } = useI18n();
const authStore = useAuthStore();

const isLargeScreen = useMediaQuery('(min-width: 1024px)');

const mobileMenuRef = ref(null);
const showMobileMenu = ref(false);
onClickOutside(mobileMenuRef, () => closeMobileMenu());

const openMobileMenu = () => {
  showMobileMenu.value = true;
};

const closeMobileMenu = async (page?: string, hash?: string) => {
  await router.push({ name: page, hash });
  showMobileMenu.value = false;
};

const goToPage = (page?: string, hash?: string) => {
  router.push({ name: page, hash });
};

const navbarLinks = [
  {
    id: 'characters',
    page: 'characters',
    hash: '',
  },
  {
    id: 'npcs',
    page: 'npcs',
    hash: '',
  },
  {
    id: 'classes',
    page: 'classes',
    hash: '',
  },
  {
    id: 'locations',
    page: 'locations',
    hash: '',
  },
];
</script>

<template>
  <nav
    class="z-10 fixed flex justify-center w-full bg-primary-gray-dark shadow"
  >
    <div
      class="flex justify-between items-center gap-4 w-full lg:max-w-page p-4 lg:px-8"
    >
      <button
        class="shrink-0 flex items-center gap-4"
        @click.prevent="router.push({ name: 'index' })"
      >
        <icon-pandora-gate-rpg-helper:pandora-gate
          class="text-primary-green text-xl"
        />
        <span v-if="isLargeScreen" class="font-semibold">
          {{ t('general.pandora-gate') }}
        </span>
      </button>
      <div v-if="isLargeScreen" class="desktop-menu">
        <button
          v-for="link in navbarLinks"
          :key="link.id"
          class="link"
          @click.prevent="goToPage(link.page, link.hash)"
        >
          {{ t(`navbar.${link.id}`) }}
        </button>
        <div v-if="authStore.currentUser" class="flex gap-2 overflow-hidden">
          <button class="link" @click.prevent="goToPage('notifications')">
            <span>{{ t('navbar.notifications') }}</span>
            <span class="text-primary-green font-semibold">6</span>
          </button>
          <button
            class="login font-semibold overflow-hidden"
            @click.prevent="goToPage('profile')"
          >
            <span class="truncate">
              {{ authStore.currentUser.name ?? t('navbar.name') }}
            </span>
          </button>
          <button class="logout" @click.prevent="authStore.logout()">
            <span>{{ t('navbar.logout') }}</span>
            <icon-ri:logout-box-line />
          </button>
        </div>
        <button v-else class="login" @click.prevent="goToPage('login')">
          <span>{{ t('navbar.login') }}</span>
          <icon-ri:login-box-line />
        </button>
      </div>
      <button
        v-if="!isLargeScreen"
        @click.prevent="openMobileMenu"
        class="flex transition-all duration-100 ease-out"
        :class="{ 'rotate-90': showMobileMenu }"
      >
        <icon-dashicons:menu-alt3 class="text-xl text-primary-white" />
      </button>
    </div>
    <div
      ref="mobileMenuRef"
      v-if="!isLargeScreen && showMobileMenu"
      class="mobile-menu"
    >
      <button
        v-for="link in navbarLinks"
        :key="link.id"
        class="link"
        @click.prevent="closeMobileMenu(link.page, link.hash)"
      >
        {{ t(`navbar.${link.id}`) }}
      </button>
      <div v-if="authStore.currentUser" class="flex flex-col">
        <button class="link" @click.prevent="closeMobileMenu('notifications')">
          <span>{{ t('navbar.notifications') }}</span>
          <span class="text-primary-green font-semibold">6</span>
        </button>
        <button
          class="login font-semibold overflow-hidden"
          @click.prevent="closeMobileMenu('profile')"
        >
          <span class="truncate">
            {{ authStore.currentUser.name ?? t('navbar.name') }}
          </span>
        </button>
        <button class="logout" @click.prevent="authStore.logout">
          <span>{{ t('navbar.logout') }}</span>
          <icon-ri:logout-box-line />
        </button>
      </div>
      <button v-else class="login" @click.prevent="closeMobileMenu('login')">
        <span>{{ t('navbar.login') }}</span>
        <icon-ri:logout-box-line />
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.desktop-menu {
  @apply flex gap-1 max-w-full text-sm overflow-hidden;
  .link {
    @apply flex items-center gap-2 p-3 rounded whitespace-nowrap;
    &:hover {
      @apply bg-primary-gray;
    }
    &:active {
      @apply bg-primary-green-dark text-primary-white;
    }
  }
  .login {
    @apply flex items-center gap-2 p-3 rounded text-primary-green whitespace-nowrap;
    &:hover {
      @apply bg-primary-gray;
    }
    &:active {
      @apply bg-primary-green text-primary-white;
    }
  }
  .logout {
    @apply flex items-center gap-2 p-3 rounded text-primary-red whitespace-nowrap;
    &:hover {
      @apply bg-primary-gray;
    }
    &:active {
      @apply bg-primary-red text-primary-white;
    }
  }
}
.mobile-menu {
  @apply z-50 inset-x-4 top-4 fixed flex flex-col px-0 py-2 bg-primary-white shadow rounded text-primary-black text-sm;
  .link {
    @apply flex items-center gap-2 px-4 py-3 text-left truncate;
    &:hover {
      @apply bg-primary-gray text-primary-white;
    }
    &:active {
      @apply bg-primary-green-dark text-primary-white;
    }
  }
  .login {
    @apply flex items-center gap-2 px-4 py-3 text-left text-primary-green truncate;
    &:hover {
      @apply bg-primary-gray text-primary-white;
    }
    &:active {
      @apply bg-primary-green text-primary-white;
    }
  }
  .logout {
    @apply flex items-center gap-2 px-4 py-3 text-left text-primary-red truncate;
    &:hover {
      @apply bg-primary-gray text-primary-white;
    }
    &:active {
      @apply bg-primary-red text-primary-white;
    }
  }
}
</style>
