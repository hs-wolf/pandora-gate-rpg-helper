import { acceptHMRUpdate, defineStore } from 'pinia';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  AUTH_STORE,
  API_GET_USER_BY_ID,
  API_USER_REGISTER,
} from '@src/constants';
import { http } from '@plugins/axios';
import { auth } from '@plugins/firebase';
import { User, UserRegisterBody } from '@pandora-gate-rpg-helper/models';
import { useAlertsStore } from '@stores/alerts';

export interface IState {
  currentUser: User | null;
  userToken: string | null;
  showNotAuthenticatedModal: boolean;
  logging: boolean;
  registering: boolean;
}

export const useAuthStore = defineStore(AUTH_STORE, {
  state: (): IState => ({
    currentUser: null,
    userToken: null,
    showNotAuthenticatedModal: false,
    logging: false,
    registering: false,
  }),
  getters: {},
  actions: {
    openNotAuthenticatedModal() {
      this.showNotAuthenticatedModal = true;
    },
    closeNotAuthenticatedModal() {
      this.showNotAuthenticatedModal = false;
    },
    async updateCurrentUser(): Promise<void> {
      if (!auth.currentUser) {
        this.currentUser = null;
        this.userToken = null;
        return;
      }
      try {
        const token = await auth.currentUser?.getIdToken(true);
        this.userToken = token;
        const { data } = await http.get(
          API_GET_USER_BY_ID(auth.currentUser.uid)
        );
        this.currentUser = User.fromMap(data);
      } catch (error) {
        useAlertsStore().handleError(error);
      }
    },
    async login(email: string, password: string) {
      if (this.logging) {
        return;
      }
      this.logging = true;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.logging = false;
      }
    },
    async register(name: string, email: string, password: string) {
      if (this.registering) {
        return;
      }
      this.registering = true;
      try {
        const registerBody: UserRegisterBody = { name, email, password };
        await http.post(API_USER_REGISTER, registerBody);
        await this.login(email, password);
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.registering = false;
      }
    },
    async logout() {
      try {
        await auth.signOut();
      } catch (error) {
        useAlertsStore().handleError(error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
