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
  currentCharacters: Map<string, Character | null>;
  updatingUserCharacters: boolean;
  creatingCharacter: boolean;
  showConfirmRemoveDialog: boolean;
  removingCharacter: boolean;
  characterBeingRemoved: string;
}

export const useCharactersStore = defineStore(CHARACTERS_STORE, {
  state: (): IState => ({
    currentCharacters: new Map(),
    updatingUserCharacters: false,
    creatingCharacter: false,
    showConfirmRemoveDialog: false,
    removingCharacter: false,
    characterBeingRemoved: '',
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
        (data as Character[]).forEach((character) =>
          this.currentCharacters.set(character.id, Character.fromMap(character))
        );
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
        this.currentCharacters.set(data.id, data);
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
        this.currentCharacters.set(characterId, Character.fromMap(data));
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.creatingCharacter = false;
      }
    },
    toggleConfirmRemoveDialog(value?: boolean, characterId?: string) {
      this.showConfirmRemoveDialog = value ?? !this.showConfirmRemoveDialog;
      this.characterBeingRemoved = characterId ?? '';
    },
    async removeCharacter(characterId: string) {
      if (this.removingCharacter) {
        return;
      }
      this.removingCharacter = true;
      try {
        await http.delete(API_DELETE_DELETE_CHARACTER(characterId));
        this.currentCharacters.delete(characterId);
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.showConfirmRemoveDialog = false;
        this.removingCharacter = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharactersStore, import.meta.hot));
}
