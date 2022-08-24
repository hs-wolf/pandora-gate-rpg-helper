import { acceptHMRUpdate, defineStore } from 'pinia';
import { DATA_STORE } from '@src/constants';
import { http } from '@src/plugins/axios';
import { useAlertsStore } from '@stores/alerts';
import {
  Element,
  ElementCreateBody,
  ElementUpdateBody,
} from '@pandora-gate-rpg-helper/models';
import {
  API_GET_ALL_ELEMENTS,
  API_POST_CREATE_ELEMENT,
  API_PUT_UPDATE_ELEMENT,
  API_DELETE_DELETE_ELEMENT,
  csvToArray,
} from '@pandora-gate-rpg-helper/utilities';

interface IState {
  currentElements: Element[];
  updatingcurrentElements: boolean;
  creatingElement: boolean;
  updatingElement: boolean;
  removingElement: boolean;
  importingElements: boolean;
  exportingElements: boolean;
}

export const useDataStore = defineStore(DATA_STORE, {
  state: (): IState => ({
    currentElements: [],
    updatingcurrentElements: false,
    creatingElement: false,
    updatingElement: false,
    removingElement: false,
    importingElements: false,
    exportingElements: false,
  }),
  getters: {},
  actions: {
    async getCurrentElements() {
      if (this.updatingcurrentElements) {
        return;
      }
      this.updatingcurrentElements = true;
      try {
        const { data } = await http.get(API_GET_ALL_ELEMENTS);
        this.currentElements = data ?? [];
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.updatingcurrentElements = false;
      }
    },
    async createElement(body: ElementCreateBody) {
      if (this.creatingElement) {
        return;
      }
      this.creatingElement = true;
      try {
        const { data } = await http.post(API_POST_CREATE_ELEMENT, body);
        this.currentElements.push(data);
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.creatingElement = false;
      }
    },
    async updateElement(elementId: string, body: ElementUpdateBody) {
      if (this.creatingElement) {
        return;
      }
      this.creatingElement = true;
      try {
        const { data } = await http.put(
          API_PUT_UPDATE_ELEMENT(elementId),
          body
        );
        const elementIndex = this.currentElements.findIndex(
          (element) => element.id === elementId
        );
        this.currentElements[elementIndex] = data;
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.creatingElement = false;
      }
    },
    async removeElement(elementId: string) {
      if (this.removingElement) {
        return;
      }
      this.removingElement = true;
      try {
        await http.delete(API_DELETE_DELETE_ELEMENT(elementId));
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.removingElement = false;
      }
    },
    async importElements(file: File) {
      if (this.importingElements) {
        return;
      }
      this.importingElements = true;
      try {
        const reader = new FileReader();
        reader.onload = async (event: any) => {
          const text = event.target.result;
          const data = csvToArray(text);
          const uploaded = await Promise.all(
            data.map(async (element) => {
              console.log(element);
              const { data } = await http.post(
                API_POST_CREATE_ELEMENT,
                element
              );
              return data;
            })
          );
          this.currentElements.push(...uploaded);
        };
        reader.readAsText(file);
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.importingElements = false;
      }
    },
    async exportElements() {
      if (this.exportingElements) {
        return;
      }
      this.exportingElements = true;
      try {
        //
      } catch (error) {
        useAlertsStore().handleError(error);
      } finally {
        this.exportingElements = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot));
}
