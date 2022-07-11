<script setup lang="ts">
const { t } = useI18n();

useHead({ title: computed(() => t('npcs.head-title')) });

const nameFilter = ref('');

const mockNPCs = [
  {
    id: 1,
    name: 'Capitã Sierra',
    img: 'https://legendary-digital-network-assets.s3.amazonaws.com/geekandsundry/wp-content/uploads/2016/06/7thSeaFeatured.jpg',
    description:
      'A capitã de um navio colossal que achamos que mete a porrada em geral.',
  },
  {
    id: 2,
    name: 'Pandemônio Toutako',
    img: 'https://i.pinimg.com/originals/a7/7a/16/a77a16e20c7ff6a74a41ef14dd390cff.jpg',
    description: 'O pandemônio que provavelmente iria meter porrada em geral.',
  },
  {
    id: 3,
    name: 'Rainha Squalida',
    img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8383414b-c20e-47cd-a9d8-6f50a09f316c/ddfwuog-3e6fcb73-a1ab-458d-a247-917473838a48.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgzODM0MTRiLWMyMGUtNDdjZC1hOWQ4LTZmNTBhMDlmMzE2Y1wvZGRmd3VvZy0zZTZmY2I3My1hMWFiLTQ1OGQtYTI0Ny05MTc0NzM4MzhhNDguanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VzPAMY7fGjWZO4v0w5LABqhd9T_nptHxfAZpX_MrciA',
    description: 'A rainha que meteu porrada em geral.',
  },
  {
    id: 4,
    name: 'Pandemônio Jasper',
    img: 'https://i0.wp.com/k46.kn3.net/taringa/9/4/4/F/5/1/boshco/1C1.jpg',
    description: 'O pandemônio que quase meteu porrada em geral.',
  },
  {
    id: 5,
    name: 'Akai',
    img: 'https://i.pinimg.com/originals/57/83/22/57832294a677355ee3004bdba43e7143.jpg',
    description: 'O samurai que bebe a barrigudinha de geral.',
  },
  {
    id: 6,
    name: 'Ryuuji',
    img: 'https://i.redd.it/qs49xxjf72s71.jpg',
    description: 'O samurai que fuma a verdinha de geral.',
  },
  {
    id: 7,
    name: 'Hajime Snowolf',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/771741974853888374/D11A4EAB2E6112C8A808D117328303A48B27F4FD/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    description: 'O maneta que não conseguiu meter porrada em geral.',
  },
  {
    id: 8,
    name: 'Alex',
    img: 'https://i.pinimg.com/736x/82/98/ff/8298ffc878a9262fa1e54812f19ef20c.jpg',
    description: 'O ferreiro que quase comeu a alquimista de geral.',
  },
  {
    id: 9,
    name: 'Jéssica',
    img: 'https://static.wikia.nocookie.net/villains/images/d/dc/MaltyS.jpg',
    description: 'A geomancer filha da puta que ja acabou de trancar geral.',
  },
];

const filteredClasses = computed(() => {
  let filterByName = mockNPCs;
  if (nameFilter.value) {
    filterByName = filterByName.filter((characterClass) =>
      characterClass.name.toLowerCase().includes(nameFilter.value.toLowerCase())
    );
  }
  return filterByName;
});
</script>

<template>
  <div class="flex flex-col gap-4 lg:gap-8 w-full">
    <h1 class="text-2xl font-semibold">{{ t('npcs.page-title') }}</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="input-with-icon">
        <input
          type="text"
          placeholder="Search class..."
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
    </div>
    <div class="masonry gap-4">
      <div
        v-for="characterClasss in filteredClasses"
        :key="characterClasss.id"
        class="flex flex-col mb-4 border border-primary-gray-dark rounded shadow overflow-hidden break-inside-avoid"
      >
        <img :src="characterClasss.img" class="object-cover w-full" />
        <div class="flex-1 flex flex-col gap-2 p-4 bg-primary-gray-dark">
          <h1 class="text-xl font-bold">{{ characterClasss.name }}</h1>
          <p>{{ characterClasss.description }}</p>
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
