import { acceptHMRUpdate, defineStore } from 'pinia';
import { CHARACTERS_STORE } from '@src/constants';
import { http } from '@src/plugins/axios';
import { useAlertsStore } from '@stores/alerts';
import { useAuthStore } from '@stores/auth';
import {
  Character,
  CharacterCreateBody,
  CharacterUpdateBody,
} from '@pandora-gate-rpg-helper/models';
import {
  API_GET_CHARACTERS_BY_USER_ID,
  API_POST_CREATE_CHARACTER,
  API_PUT_UPDATE_CHARACTER,
  API_DELETE_DELETE_CHARACTER,
} from '@pandora-gate-rpg-helper/utilities';

interface IState {
  currentCharacter: Character | undefined;
  charactersList: Map<string, Character>;
  updatingCharactersList: boolean;
  creatingCharacter: boolean;
  showConfirmRemoveDialog: boolean;
  removingCharacter: boolean;
  characterBeingRemoved: string;
}

export const useCharactersStore = defineStore(CHARACTERS_STORE, {
  state: (): IState => ({
    currentCharacter: undefined,
    charactersList: new Map(),
    updatingCharactersList: false,
    creatingCharacter: false,
    showConfirmRemoveDialog: false,
    removingCharacter: false,
    characterBeingRemoved: '',
  }),
  getters: {},
  actions: {
    async getCharactersList() {
      if (this.updatingCharactersList) {
        return;
      }
      this.updatingCharactersList = true;
      try {
        const authStore = useAuthStore();
        const { data } = await http.get(
          API_GET_CHARACTERS_BY_USER_ID(authStore.currentUser?.id ?? '')
        );
        data.forEach((character: Character) => {
          const complete = Character.fromMap(character);
          if (complete) {
            this.charactersList.set(character.id, complete);
          }
        });
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.updatingCharactersList = false;
      }
    },
    async createCharacter(body: CharacterCreateBody) {
      if (this.creatingCharacter) {
        return;
      }
      this.creatingCharacter = true;
      try {
        const authStore = useAuthStore();
        const finalBody: CharacterCreateBody = {
          ...body,
          ownerId: authStore.currentUser?.id ?? '',
        };
        const { data } = await http.post(API_POST_CREATE_CHARACTER, finalBody);
        const complete = Character.fromMap(data);
        if (complete) {
          this.charactersList.set(data.id, complete);
        }
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.creatingCharacter = false;
      }
    },
    async updateCharacter(characterId: string, body: CharacterUpdateBody) {
      if (this.creatingCharacter) {
        return;
      }
      this.creatingCharacter = true;
      try {
        const { data } = await http.put(
          API_PUT_UPDATE_CHARACTER(characterId),
          body
        );
        const complete = Character.fromMap(data);
        if (complete) {
          this.charactersList.set(data.id, complete);
        }
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.creatingCharacter = false;
      }
    },
    async removeCharacter(characterId: string) {
      if (this.removingCharacter) {
        return;
      }
      this.removingCharacter = true;
      try {
        await http.delete(API_DELETE_DELETE_CHARACTER(characterId));
        this.charactersList.delete(characterId);
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.showConfirmRemoveDialog = false;
        this.removingCharacter = false;
      }
    },
    toggleConfirmRemoveDialog(value?: boolean, characterId?: string) {
      this.showConfirmRemoveDialog = value ?? !this.showConfirmRemoveDialog;
      this.characterBeingRemoved = characterId ?? '';
    },
    selectCharacter(id: string) {
      this.currentCharacter = this.charactersList.get(id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharactersStore, import.meta.hot));
}
