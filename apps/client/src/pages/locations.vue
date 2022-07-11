<script setup lang="ts">
const { t } = useI18n();

useHead({ title: computed(() => t('locations.head-title')) });

const nameFilter = ref('');
const typeFilter = ref('');

enum locationType {
  CONTINENT = 'CONTINENT',
  REALM = 'REALM',
  CITY = 'CITY',
}
const mockLocations = [
  {
    id: 1,
    type: locationType.CONTINENT,
    img: 'https://2minutetabletop.com/wp-content/uploads/2018/11/Wei-Continent-RPG-World-Map-spring.jpg',
    name: 'Chronus',
    description: 'Continente de Chronus.',
  },
  {
    id: 2,
    type: locationType.CONTINENT,
    img: 'https://2minutetabletop.com/wp-content/uploads/2018/11/Wei-Continent-RPG-World-Map-spring.jpg',
    name: 'Almekia',
    description: 'Continente de Chronus.',
  },
  {
    id: 3,
    type: locationType.CONTINENT,
    img: 'https://2minutetabletop.com/wp-content/uploads/2018/11/Wei-Continent-RPG-World-Map-spring.jpg',
    name: 'Ahstar',
    description: 'Continente de Chronus.',
  },
  {
    id: 4,
    type: locationType.REALM,
    img: 'https://cdna.artstation.com/p/assets/images/images/038/560/830/large/drishti-sharaf-matt-painting.jpg?1623419161',
    name: 'Sky Eden',
    description: 'Domínio de Sky Eden.',
  },
  {
    id: 5,
    type: locationType.REALM,
    img: 'https://pm1.narvii.com/7181/ae05e2c4cb399226522cf15303e649dacffc638dr4-550-275_00.jpg',
    name: 'Heaven Cathedral',
    description: 'Domínio de Heaven Cathedral.',
  },
  {
    id: 6,
    type: locationType.REALM,
    img: 'https://i.pinimg.com/736x/e6/e3/67/e6e3670e35237ae28a3849a688f5dfd7.jpg',
    name: 'Dark World',
    description: 'Domínio de Dark World.',
  },
  {
    id: 7,
    type: locationType.REALM,
    img: 'https://external-preview.redd.it/KABE4EqwtL1vNls8rclmv4sUz8YbLjnBKuha3mYB4Vk.jpg?width=960&crop=smart&auto=webp&s=909a0d355eef9d5b2a0407d7e6337fcf144bc6fc',
    name: 'Chaos Nest',
    description: 'Domínio de Chaos Nest.',
  },
  {
    id: 8,
    type: locationType.CITY,
    img: 'https://www.dndspeak.com/wp-content/uploads/2021/04/City-1.jpg',
    name: 'Primus',
    description: 'Cidade de Primus.',
  },
  {
    id: 9,
    type: locationType.CITY,
    img: 'https://www.dndspeak.com/wp-content/uploads/2021/04/City-1.jpg',
    name: 'Secandas',
    description: 'Cidade de Secandas.',
  },
  {
    id: 10,
    type: locationType.CITY,
    img: 'https://www.dndspeak.com/wp-content/uploads/2021/04/City-1.jpg',
    name: 'Tiridas',
    description: 'Cidade de Tiridas.',
  },
  {
    id: 11,
    type: locationType.CITY,
    img: 'https://www.dndspeak.com/wp-content/uploads/2021/04/City-1.jpg',
    name: 'Vila do Outono',
    description: 'Vila do Outono.',
  },
  {
    id: 12,
    type: locationType.CITY,
    img: 'https://www.dndspeak.com/wp-content/uploads/2021/04/City-1.jpg',
    name: 'Cidade dos Anões',
    description: 'Cidade dos Anões',
  },
];

const filteredLocations = computed(() => {
  let filterByName = mockLocations;
  if (nameFilter.value) {
    filterByName = filterByName.filter((location) =>
      location.name.toLowerCase().includes(nameFilter.value.toLowerCase())
    );
  }
  if (typeFilter.value) {
    filterByName = filterByName.filter(
      (location) => location.type === typeFilter.value
    );
  }
  return filterByName;
});
</script>

<template>
  <div class="flex flex-col gap-4 lg:gap-8 w-full">
    <h1 class="text-2xl font-semibold">{{ t('locations.page-title') }}</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="input-with-icon">
        <input
          type="text"
          placeholder="Search location..."
          v-model="nameFilter"
          class="form-input pl-3 pr-8"
        />
        <button
          type="button"
          class="absolute right-2 text-primary-gray"
          @click.prevent="nameFilter = ''"
        >
          <icon-akar-icons:circle-x class="text-xl" />
        </button>
      </div>
      <select
        name=""
        id=""
        v-model="typeFilter"
        class="px-2 py-3 text-primary-black rounded bg-primary-white col-start-1"
      >
        <option value="" selected disabled>Filter by Type</option>
        <option value="">All</option>
        <option :value="locationType.CONTINENT">Continents</option>
        <option :value="locationType.REALM">Domínios</option>
        <option :value="locationType.CITY">Cities</option>
      </select>
    </div>
    <div class="grid lg:grid-cols-3 gap-4">
      <div
        v-for="location in filteredLocations"
        :key="location.id"
        class="relative flex p-4 border border-primary-gray-dark shadow rounded"
      >
        <div
          class="-z-10 absolute inset-0 flex flex-col opacity-[40%] brightness-[40%]"
        >
          <img :src="location.img" class="object-cover h-full" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <div class="flex justify-between items-center">
            <h1 class="text-xl font-bold">{{ location.name }}</h1>
            <p class="text-sm">
              {{ location.type }}
            </p>
          </div>
          <p>{{ location.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-with-icon {
  @apply relative flex items-center rounded;
  .form-input {
    @apply w-full py-2 bg-transparent border border-primary-gray rounded text-primary-white placeholder:text-primary-gray outline-none;
  }
}
</style>
