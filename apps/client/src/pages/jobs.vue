<script setup lang="ts">
const { t } = useI18n();

useHead({ title: computed(() => t('jobs.head-title')) });

const nameFilter = ref('');
const tierFilter = ref('');

const mockJobs = [
  {
    id: '1',
    name: 'Lich',
    tier: 2,
    img: 'https://wowgirl.com.br/wp-content/uploads/2008/11/wrath_of_the_lich_king.jpg',
    description:
      'Um guerreiro que perdeu sua alma o tornando vazio, vazio esse que o faz ter uma afinidade com as trevas e com o gelo. Usa ataques de ambos esses elementos para debufar e causar danos em seus inimigos. A perda de sua alma o deu o poder de invocar as trevas com suas próprias mãos.',
  },
  {
    id: '2',
    name: 'Vampiro',
    tier: 1,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV6Ab8Ix-hs4HeVCWYovXkmiBMHdzgXgX5Ng&usqp=CAU',
    description:
      'Criatura nefasta, com poderes telesineticos e sede de sangue. Capaz de se tranformar em morcego e névoa. Necessita tomar sangue todos os dias.',
  },
  {
    id: '3',
    name: 'Geomancer',
    tier: 2,
    img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/80f49903-65c0-4273-a660-954673507a9c/dexw86r-09ed399e-752d-4210-9236-6cb739b6bb37.png/v1/fill/w_1280,h_748,q_80,strp/geomancer_by_indigojrps_dexw86r-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzQ4IiwicGF0aCI6IlwvZlwvODBmNDk5MDMtNjVjMC00MjczLWE2NjAtOTU0NjczNTA3YTljXC9kZXh3ODZyLTA5ZWQzOTllLTc1MmQtNDIxMC05MjM2LTZjYjczOWI2YmIzNy5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Dp_8uOWlhOBLvb2YWLh2PgwSACgH7jOipknECUKr0Sg',
    description:
      'Guerreiro e mago ao mesmo tempo. Capaz de alterar a natureza a seu favor manipulando os elementos.',
  },
  {
    id: '4',
    name: 'Corsário',
    tier: 3,
    img: 'https://legendary-digital-network-assets.s3.amazonaws.com/geekandsundry/wp-content/uploads/2016/06/7thSeaFeatured.jpg',
    description:
      'Um pirata capitão dos mares. Tem a capacidade de dropar itens e descobrir tesouros. Pode utilizar espadas em uma mao e armas de fogo na outra e tem como principal habilidade poder usar bandeiras para ampliar  força de suas tropas em combate.',
  },
  {
    id: '5',
    name: 'Hero',
    tier: 4,
    img: 'https://revolutionarysilver.files.wordpress.com/2014/05/r9-rance-and-siera.png',
    description:
      'Herói com habilidades variadas desde ataques a curas simples, seu poder esta em realizar atos justos e heroicos e seu potencial perto da morte.',
  },
];

const filteredJobs = computed(() => {
  let filterByName = mockJobs;
  if (nameFilter.value) {
    filterByName = filterByName.filter((characterClass) =>
      characterClass.name.toLowerCase().includes(nameFilter.value.toLowerCase())
    );
  }
  if (tierFilter.value) {
    filterByName = filterByName.filter(
      (characterClass) => characterClass.tier === parseInt(tierFilter.value)
    );
  }
  return filterByName;
});
</script>

<template>
  <div class="flex flex-col gap-4 lg:gap-8 w-full">
    <h1 class="text-2xl font-semibold">{{ t('jobs.page-title') }}</h1>
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
          <icon-akar-icons:circle-x class="text-lg" />
        </button>
      </div>
      <select
        v-model="tierFilter"
        class="px-2 py-3 text-primary-black rounded bg-primary-white col-start-1"
      >
        <option value="" selected disabled>Filter by Tier</option>
        <option value="">All</option>
        <option value="1">Tier 1</option>
        <option value="2">Tier 2</option>
        <option value="3">Tier 3</option>
        <option value="4">Tier 4 (Suprema)</option>
      </select>
    </div>
    <div class="grid lg:grid-cols-3 gap-4">
      <div
        v-for="characterClasss in filteredJobs"
        :key="characterClasss.id"
        class="relative flex p-4 border border-primary-gray-dark rounded shadow"
      >
        <div
          class="-z-10 absolute inset-0 flex flex-col opacity-[40%] brightness-[40%]"
        >
          <img :src="characterClasss.img" class="object-cover h-full" />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <div class="flex justify-between items-center">
            <h1 class="text-xl font-bold">{{ characterClasss.name }}</h1>
            <p class="text-sm">
              {{
                characterClasss.tier === 4
                  ? '🔥'
                  : '⭐'.repeat(characterClasss.tier)
              }}
            </p>
          </div>
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
