import { IElementsRepo } from './repos/IElementsRepo';
import { ElementsRepoFirestore } from './repos/elementsRepoFirestore';
import { DEFAULT_ELEMENT_IMAGE } from '../../constants';
import {
  ApiError,
  ResponseCodes,
  Element,
  ElementUpdateBody,
  ElementCreateBody,
} from '@pandora-gate-rpg-helper/models';
import { handleError } from '@pandora-gate-rpg-helper/utilities';

export class ElementsService {
  private _elementsRepo: IElementsRepo;

  constructor(elementsRepo?: IElementsRepo) {
    this._elementsRepo = elementsRepo ?? new ElementsRepoFirestore();
  }

  async getAllElements(): Promise<Element[]> {
    try {
      const elements = await this._elementsRepo.getAllElements();
      if (!elements.length) {
        throw new ApiError(ResponseCodes.NOT_FOUND, `Could not find elements.`);
      }
      return elements;
    } catch (error) {
      handleError(error);
    }
  }

  async getElementById(elementId: string): Promise<Element> {
    try {
      const element = await this._elementsRepo.getElementById(elementId);
      if (!element) {
        throw new ApiError(
          ResponseCodes.NOT_FOUND,
          `Could not find element with elementId: ${elementId}.`
        );
      }
      return element;
    } catch (error) {
      handleError(error);
    }
  }

  async createElement(body: ElementCreateBody): Promise<Element> {
    try {
      const element = Element.fromMap(body);
      element.image = element.image ?? DEFAULT_ELEMENT_IMAGE;
      return await this._elementsRepo.createElement(element);
    } catch (error) {
      handleError(error);
    }
  }

  async updateElement(
    elementId: string,
    body: ElementUpdateBody
  ): Promise<Element> {
    try {
      return await this._elementsRepo.updateElement(elementId, body);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteElement(elementId: string): Promise<void> {
    try {
      await this._elementsRepo.deleteElement(elementId);
    } catch (error) {
      handleError(error);
    }
  }
}
