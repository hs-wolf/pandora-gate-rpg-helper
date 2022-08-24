import { Element, ElementUpdateBody } from '@pandora-gate-rpg-helper/models';

export interface IElementsRepo {
  getAllElements(): Promise<Element[]>;

  getElementById(elementId: string): Promise<Element>;

  createElement(element: Element): Promise<Element>;

  updateElement(elementId: string, body: ElementUpdateBody): Promise<Element>;

  deleteElement(elementId: string): Promise<void>;
}
