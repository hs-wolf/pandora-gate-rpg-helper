import path from 'path';
import { AliasOptions, defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import VueI18n from '@intlify/vite-plugin-vue-i18n';

const projectName = 'pandora-gate-rpg-helper';
const appName = 'client';
const serverPort = 3002;
const libraries: AliasOptions = {
  '@pandora-gate-rpg-helper/models': path.resolve(
    __dirname,
    '../../libs/models/src/index.ts'
  ),
  '@pandora-gate-rpg-helper/utils': path.resolve(
    __dirname,
    '../../libs/utils/src/index.ts'
  ),
};

export default defineConfig({
  server: {
    host: true,
    port: serverPort,
  },
  cacheDir: `../../node_modules/.vite/${appName}`,
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@environments': path.resolve(__dirname, './src/environments'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@stores': path.resolve(__dirname, './src/stores'),
      ...libraries,
    },
  },
  plugins: [
    Vue(),
    Pages(),
    Layouts(),
    Components({
      resolvers: [
        IconsResolver({ prefix: 'icon', customCollections: [projectName] }),
      ],
      dts: './src/components.d.ts',
      directoryAsNamespace: true,
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        [projectName]: FileSystemIconLoader(
          path.resolve(__dirname, './src/assets/icons')
        ),
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/core',
        '@vueuse/head',
        'vee-validate',
        'pinia',
      ],
      dts: './src/auto-imports.d.ts',
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, './locales/**')],
    }),
  ],
});
