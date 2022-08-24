import { acceptHMRUpdate, defineStore } from 'pinia';
import { CHARACTERS_STORE } from '@src/constants';
import { http } from '@src/plugins/axios';
import { useAlertsStore } from '@stores/alerts';
import { useAuthStore } from '@stores/auth';
import {
  Character,
  CharacterCreateBody,
} from '@pandora-gate-rpg-helper/models';
import {
  API_GET_CHARACTERS_BY_USER_ID,
  API_POST_CREATE_CHARACTER,
} from '@pandora-gate-rpg-helper/utilities';

interface IState {
  currentCharacters: Character[];
  updatingUserCharacters: boolean;
  creatingCharacter: boolean;
}

export const useCharactersStore = defineStore(CHARACTERS_STORE, {
  state: (): IState => ({
    currentCharacters: [],
    updatingUserCharacters: false,
    creatingCharacter: false,
  }),
  getters: {},
  actions: {
    async getUserCharacters() {
      if (this.updatingUserCharacters) {
        return;
      }
      this.updatingUserCharacters = true;
      try {
        const authStore = useAuthStore();
        const { data } = await http.get(
          API_GET_CHARACTERS_BY_USER_ID(authStore.currentUser?.id ?? '')
        );
        this.currentCharacters = data ?? [];
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.updatingUserCharacters = false;
      }
    },
    async createCharacter(body: CharacterCreateBody) {
      if (this.creatingCharacter) {
        return;
      }
      this.creatingCharacter = true;
      try {
        const authStore = useAuthStore();
        if (!authStore.currentUser?.id) {
          return;
        }
        const finalBody: CharacterCreateBody = {
          ...body,
          ownerId: authStore.currentUser.id,
        };
        const { data } = await http.post(API_POST_CREATE_CHARACTER, finalBody);
        this.currentCharacters.push(data);
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.creatingCharacter = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharactersStore, import.meta.hot));
}
